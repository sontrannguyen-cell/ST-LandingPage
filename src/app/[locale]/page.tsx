import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections/Hero';
import { WhoWeAre } from '@/components/sections/WhoWeAre';
import { Ecosystem } from '@/components/sections/Ecosystem';
import { Capabilities } from '@/components/sections/Capabilities';
import { Industries } from '@/components/sections/Industries';
import { Impact } from '@/components/sections/Impact';
import { Stories } from '@/components/sections/Stories';
import { GlobalReach } from '@/components/sections/GlobalReach';
import { FinalCta } from '@/components/sections/FinalCta';

/**
 * Homepage.
 *
 * Section order is fixed by brief §11 Section Rhythm:
 *   Hero → short ecosystem statement → brand showcase → capability tabs
 *   → impact areas → proof points → stories → global reach → CTA
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <WhoWeAre />
      <Ecosystem />
      <Capabilities />
      <Industries />
      <Impact />
      <Stories />
      <GlobalReach />
      <FinalCta />
    </>
  );
}
