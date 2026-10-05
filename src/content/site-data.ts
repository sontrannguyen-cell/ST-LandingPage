/**
 * Structural + governed site data.
 *
 * Copy lives in `messages/*.json` (translatable). This file holds everything
 * that is NOT copy: hrefs, ordering, image slots, and the governance flags the
 * brief makes mandatory.
 *
 * Three rules from the brief are enforced here rather than by convention:
 *   §06 Publishing Rule — a metric with `verified: false` is NOT rendered.
 *   §07 Section Rule    — a story with `approved: false` is NOT rendered.
 *   §08 Data Rule       — markets carry a relationship label, never a percentage.
 */

export type NavItem = {
  key: string;
  href: string;
  external?: boolean;
  children?: NavItem[];
  /** Mega menu renders 2 columns on desktop (brief §00 Capabilities). */
  columns?: 1 | 2;
};

export const primaryNav: NavItem[] = [
  {
    key: 'ecosystem',
    href: '/#ecosystem',
    columns: 1,
    children: [
      { key: 'stSoftware', href: '/ecosystem/st-software' },
      { key: 'devplus', href: 'https://devplus.edu.vn/', external: true },
      { key: 'aquax', href: 'https://aquax.vn/', external: true },
      { key: 'conextAsia', href: 'https://conext.asia/', external: true },
    ],
  },
  {
    key: 'capabilities',
    href: '/capabilities',
    columns: 2,
    children: [
      { key: 'softwareDevelopment', href: '/capabilities/software' },
      { key: 'aiData', href: '/capabilities/ai-data' },
      { key: 'aiotSmart', href: '/capabilities/aiot' },
      { key: 'educationTalent', href: '/capabilities/education-talent' },
      { key: 'technologyTransfer', href: '/capabilities/technology-transfer' },
      { key: 'communityEcosystem', href: '/capabilities/community' },
    ],
  },
  // ASSUMPTION: the brief lists "Industries" in the nav but defines no dropdown
  // for it. Treated as a direct link until the client confirms.
  { key: 'industries', href: '/industries' },
  {
    key: 'company',
    href: '/company',
    children: [
      { key: 'about', href: '/company' },
      { key: 'journey', href: '/company/journey' },
      { key: 'careers', href: '/careers' },
      { key: 'contact', href: '/contact' },
    ],
  },
  {
    key: 'stories',
    href: '/stories',
    children: [
      { key: 'projects', href: '/stories/projects' },
      { key: 'news', href: '/stories/news' },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* §01 Hero — 5 slides, exactly one CTA each                                   */
/* -------------------------------------------------------------------------- */

export type HeroSlide = {
  key: string;
  /** Poster/background. Video is optional; the poster is required for LCP. */
  image: string;
  video?: string;
  cta: { href: string; external?: boolean };
};

/**
 * The .mp4/.jpg pairs in `public/media/hero/` are generated placeholders, not
 * brand footage — they exist so the video path is real and reviewable. Replace
 * each file in place with the real clip and poster; no code change is needed.
 * Keep clips muted, ~8–12s, loop-friendly and under a few MB.
 */
export const heroSlides: HeroSlide[] = [
  {
    key: 'stUnited',
    image: '/media/hero/st-united.jpg',
    video: '/media/hero/st-united.mp4',
    cta: { href: '/#ecosystem' },
  },
  {
    key: 'stSoftware',
    image: '/media/hero/st-software.jpg',
    video: '/media/hero/st-software.mp4',
    cta: { href: '/ecosystem/st-software' },
  },
  {
    key: 'devplus',
    image: '/media/hero/devplus.jpg',
    video: '/media/hero/devplus.mp4',
    cta: { href: 'https://devplus.edu.vn/', external: true },
  },
  {
    key: 'aquax',
    image: '/media/hero/aquax.jpg',
    video: '/media/hero/aquax.mp4',
    cta: { href: 'https://aquax.vn/', external: true },
  },
  {
    key: 'conextAsia',
    image: '/media/hero/conext-asia.jpg',
    video: '/media/hero/conext-asia.mp4',
    cta: { href: 'https://conext.asia/', external: true },
  },
];

/** Brief §01: auto-advance every 5–7s. */
export const HERO_AUTOPLAY_MS = 6000;

/* -------------------------------------------------------------------------- */
/* §02 Who We Are — three pillars                                              */
/* -------------------------------------------------------------------------- */

export type Pillar = { key: string; image: string };

export const pillars: Pillar[] = [
  { key: 'technology', image: '/media/pillars/technology.jpg' },
  { key: 'people', image: '/media/pillars/people.jpg' },
  { key: 'innovation', image: '/media/pillars/innovation.jpg' },
];

/* -------------------------------------------------------------------------- */
/* §03 Our Ecosystem — 4 core brands                                           */
/* -------------------------------------------------------------------------- */

export type EcosystemBrand = {
  key: string;
  image: string;
  href: string;
  external?: boolean;
};

export const ecosystemBrands: EcosystemBrand[] = [
  { key: 'stSoftware', image: '/media/ecosystem/st-software.jpg', href: '/ecosystem/st-software' },
  { key: 'devplus', image: '/media/ecosystem/devplus.jpg', href: 'https://devplus.edu.vn/', external: true },
  { key: 'aquax', image: '/media/ecosystem/aquax.jpg', href: 'https://aquax.vn/', external: true },
  { key: 'conextAsia', image: '/media/ecosystem/conext-asia.jpg', href: 'https://conext.asia/', external: true },
];

/* -------------------------------------------------------------------------- */
/* §04 What We Do — capabilities                                               */
/* -------------------------------------------------------------------------- */

export type Capability = {
  key: string;
  image: string;
  /** Supporting tags, from the brief UI/Component column — keys into `capabilities.tags`. */
  tags: string[];
};

export const capabilities: Capability[] = [
  {
    key: 'softwareDevelopment',
    image: '/media/capabilities/software.jpg',
    tags: ['web', 'mobile', 'customSoftware', 'dedicatedTeam'],
  },
  {
    key: 'aiData',
    image: '/media/capabilities/ai-data.jpg',
    tags: ['data', 'analytics', 'aiIntegration', 'automation'],
  },
  {
    key: 'aiotSmart',
    image: '/media/capabilities/aiot.jpg',
    tags: ['iot', 'aiot', 'lorawan', 'monitoring', 'automation'],
  },
  {
    key: 'educationTalent',
    image: '/media/capabilities/education.jpg',
    tags: ['training', 'globalInternship', 'careerDevelopment'],
  },
  {
    key: 'technologyTransfer',
    image: '/media/capabilities/innovation.jpg',
    tags: ['poc', 'rnd', 'technologyTransfer', 'productDevelopment'],
  },
  {
    key: 'communityEcosystem',
    image: '/media/capabilities/community.jpg',
    tags: ['community', 'events', 'coworking', 'partnerships'],
  },
];

/* -------------------------------------------------------------------------- */
/* §05 Where We Create Impact — industries                                     */
/* -------------------------------------------------------------------------- */

export type Industry = { key: string; image: string };

export const industries: Industry[] = [
  { key: 'businessEnterprise', image: '/media/industries/business.jpg' },
  { key: 'educationTalent', image: '/media/industries/education.jpg' },
  { key: 'smartAgriculture', image: '/media/industries/aquaculture.jpg' },
  { key: 'greenInfrastructure', image: '/media/industries/infrastructure.jpg' },
  { key: 'technologyCommunity', image: '/media/industries/community.jpg' },
];

/* -------------------------------------------------------------------------- */
/* §06 Our Impact — numbers                                                    */
/* -------------------------------------------------------------------------- */

export type Metric = {
  key: string;
  value: number;
  suffix: string;
  /**
   * §06 Publishing Rule: only publish numbers confirmed by the business /
   * marketing team. If a number is not verified, hide the metric rather than
   * showing a placeholder. `false` means the tile is not rendered at all.
   */
  verified: boolean;
  /** Provenance, so the flag above can be audited. */
  source: string;
};

export const metrics: Metric[] = [
  { key: 'engineers', value: 50, suffix: '+', verified: true, source: 'Existing brief / latest company profile' },
  { key: 'projects', value: 130, suffix: '+', verified: true, source: 'Existing brief / latest company profile' },
  { key: 'readyToWorkTalent', value: 700, suffix: '+', verified: true, source: 'Existing brief / latest company profile' },
  { key: 'internationalTalent', value: 200, suffix: '+', verified: true, source: 'Existing brief / latest company profile' },
  { key: 'aquaxPonds', value: 35, suffix: '+', verified: true, source: 'Existing brief / latest AquaX profile' },
  { key: 'pondMeetings', value: 250, suffix: '+', verified: true, source: 'Existing brief / latest AquaX profile' },
];

export const publishedMetrics = metrics.filter((m) => m.verified);

/* -------------------------------------------------------------------------- */
/* §07 Featured Projects & Stories — 3–4 strongest only                        */
/* -------------------------------------------------------------------------- */

export type Story = {
  key: string;
  categoryKey: string;
  image: string;
  href: string;
  external?: boolean;
  /**
   * §07: the ST Software flagship case is TBD — a client-approved or public
   * case must be chosen before publish. `false` means the card is not rendered.
   */
  approved: boolean;
};

export const stories: Story[] = [
  {
    key: 'aquaxSmartAquaculture',
    categoryKey: 'aiotAquaculture',
    image: '/media/stories/aquax.jpg',
    href: 'https://aquax.vn/',
    external: true,
    approved: true,
  },
  {
    key: 'devplusGlobalInternship',
    categoryKey: 'educationTalent',
    image: '/media/stories/devplus.jpg',
    href: 'https://global-internship.devplus.edu.vn/',
    external: true,
    approved: true,
  },
  {
    key: 'stSoftwareFlagship',
    categoryKey: 'software',
    image: '/media/stories/st-software.jpg',
    href: '/stories/projects',
    // TBD in the brief — awaiting a client-approved public case.
    approved: false,
  },
  {
    key: 'conextSmartLighting',
    categoryKey: 'greenSmartTech',
    image: '/media/stories/conext.jpg',
    href: 'https://conext.asia/',
    external: true,
    approved: true,
  },
];

export const publishedStories = stories.filter((s) => s.approved).slice(0, 4);

/* -------------------------------------------------------------------------- */
/* §08 Global Reach — verified markets only, no percentages                    */
/* -------------------------------------------------------------------------- */

export type Market = {
  key: string;
  /** [longitude, latitude] — projected onto the map at render time. */
  coordinates: [number, number];
  /** Relationship type replaces the unsupported percentage split (§08). */
  relationKey: 'home' | 'client' | 'partner' | 'program';
};

/** Coordinates point at the relevant city, not the country centroid. */
export const markets: Market[] = [
  { key: 'vietnam', coordinates: [108.22, 16.06], relationKey: 'home' }, // Da Nang
  { key: 'japan', coordinates: [139.69, 35.69], relationKey: 'client' },
  { key: 'korea', coordinates: [126.98, 37.57], relationKey: 'client' },
  { key: 'hongKong', coordinates: [114.17, 22.32], relationKey: 'partner' },
  { key: 'australia', coordinates: [151.21, -33.87], relationKey: 'client' },
  { key: 'unitedStates', coordinates: [-95.71, 37.09], relationKey: 'client' },
  { key: 'france', coordinates: [2.35, 48.86], relationKey: 'client' },
];

/* -------------------------------------------------------------------------- */
/* §10 Footer                                                                  */
/* -------------------------------------------------------------------------- */

/** The postal address is copy — it lives in `footer.address`. */
export const company = {
  name: 'ST United',
  email: 'hello@stunited.vn',
  phone: '+84905182013',
  phoneDisplay: '(+84) 905 182 013',
} as const;

export const familySites = [
  { key: 'stSoftware', href: '/ecosystem/st-software', external: false },
  { key: 'devplus', href: 'https://devplus.edu.vn/', external: true },
  { key: 'aquax', href: 'https://aquax.vn/', external: true },
  { key: 'conextAsia', href: 'https://conext.asia/', external: true },
] as const;

export const socialLinks = [
  { key: 'linkedin', href: 'https://www.linkedin.com/company/stunited/' },
  { key: 'facebook', href: 'https://www.facebook.com/stunited.vn/' },
] as const;
