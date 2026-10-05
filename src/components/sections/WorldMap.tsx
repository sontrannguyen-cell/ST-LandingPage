import { geoEquirectangular, geoPath, geoGraticule10 } from 'd3-geo';
import { feature } from 'topojson-client';
import type { Topology } from 'topojson-specification';
import type { FeatureCollection, Geometry } from 'geojson';
import worldTopo from 'world-atlas/countries-110m.json';
import { markets, type Market } from '@/content/site-data';
import { cn } from '@/lib/cn';

/**
 * Brief §08 — world map with simple pins.
 *
 * Rendered entirely on the server: the Natural Earth 110m outlines (public
 * domain, via world-atlas) are projected once at build time and emitted as
 * static SVG paths, so the map costs no client JavaScript and no tile requests.
 *
 * Pins are projected from real [lon, lat] coordinates rather than hand-placed
 * percentages, so they land where the cities actually are.
 */

const WIDTH = 1000;
const HEIGHT = 500;

// Antarctica is dropped: it adds a heavy band across the bottom and says
// nothing about where ST United operates.
const ANTARCTICA_ID = '010';

const topology = worldTopo as unknown as Topology;
const countries = feature(
  topology,
  topology.objects.countries,
) as FeatureCollection<Geometry, { name: string }>;

const projection = geoEquirectangular().fitSize(
  [WIDTH, HEIGHT],
  {
    type: 'FeatureCollection',
    features: countries.features.filter((f) => f.id !== ANTARCTICA_ID),
  } as FeatureCollection,
);

const toPath = geoPath(projection);

/**
 * d3-geo emits full float precision, which costs ~2.5x the bytes for detail
 * that is invisible at this size — the map is at most ~900px wide, so one
 * decimal place is already sub-pixel. The SVG is inlined into every homepage,
 * so the saving is worth the single pass.
 */
const trimPrecision = (d: string) =>
  d.replace(/-?\d+\.\d+/g, (n) => String(Math.round(Number(n) * 10) / 10));

const landPaths = countries.features
  .filter((f) => f.id !== ANTARCTICA_ID)
  .map((f) => toPath(f))
  .filter((d): d is string => Boolean(d))
  .map(trimPrecision);

const rawGraticule = toPath(geoGraticule10());
const graticulePath = rawGraticule ? trimPrecision(rawGraticule) : null;

type Pin = {
  key: string;
  x: number;
  y: number;
  relationKey: Market['relationKey'];
};

const pins: Pin[] = markets
  .map((market): Pin | null => {
    const point = projection(market.coordinates);
    if (!point) return null;
    return { key: market.key, x: point[0], y: point[1], relationKey: market.relationKey };
  })
  .filter((p) => p !== null);

export function WorldMap({
  label,
  className,
  marketNames,
}: {
  label: string;
  className?: string;
  /** Localised market names, used for the pin titles. */
  marketNames: Record<string, string>;
}) {
  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      role="img"
      aria-label={label}
      className={cn('block h-auto w-full', className)}
    >
      {/* Graticule sits furthest back and stays very low contrast — it reads as
          texture, not data. */}
      {graticulePath && (
        <path
          d={graticulePath}
          fill="none"
          stroke="var(--color-paper)"
          strokeOpacity={0.05}
          strokeWidth={0.5}
        />
      )}

      <g>
        {landPaths.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="var(--color-navy-700)"
            stroke="var(--color-navy-600)"
            strokeWidth={0.4}
          />
        ))}
      </g>

      <g>
        {pins.map((pin) => {
          const isHome = pin.relationKey === 'home';
          return (
            <g key={pin.key}>
              <title>{marketNames[pin.key] ?? pin.key}</title>
              {/* Halo */}
              <circle
                cx={pin.x}
                cy={pin.y}
                r={isHome ? 13 : 9}
                fill="var(--color-accent-500)"
                fillOpacity={0.16}
              />
              <circle
                cx={pin.x}
                cy={pin.y}
                r={isHome ? 5 : 3.5}
                fill={isHome ? 'var(--color-ember-500)' : 'var(--color-accent-500)'}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
