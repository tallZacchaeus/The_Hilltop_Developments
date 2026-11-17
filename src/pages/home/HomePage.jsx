import { ArrowRight } from 'lucide-react';
import { SITE } from '../../data/site';
import usePageMeta from '../../hooks/usePageMeta';
import Button from '../../components/ui/Button';
import Logo from '../../components/ui/Logo';
import CtaPanel from '../../components/sections/CtaPanel';
import ImageHero from '../../components/sections/ImageHero';
import HomeIntro from './HomeIntro';
import HomeDevelopmentTypes from './HomeDevelopmentTypes';
import HomeServices from './HomeServices';
import HomeUpcoming from './HomeUpcoming';

export default function HomePage() {
  usePageMeta({ description: SITE.description });

  return (
    <>
      <ImageHero
        image="/images/glass-facade.jpg"
        imageAlt="Looking up at the blue glass facade of a high-rise"
        eyebrow={SITE.tagline}
        title="Building Sustainable Cities for Generations"
        lead="We are a forward-thinking real estate development company creating innovative, future-ready spaces that shape how cities grow and evolve."
        actions={
          <>
            <Button to="/developments" variant="light" icon={ArrowRight}>
              Explore Our Projects
            </Button>
            <Button to="/contact" variant="glass">
              Get In Touch
            </Button>
          </>
        }
        footnote={
          <>
            <Logo size={14} />
            <span>{SITE.parent}</span>
          </>
        }
      />
      <HomeIntro />
      <HomeDevelopmentTypes />
      <HomeServices />
      <HomeUpcoming />
      <CtaPanel
        id="future"
        eyebrow="Our commitment"
        title="As the Future Unfolds"
        actions={
          <Button to="/contact" variant="dark" icon={ArrowRight}>
            Contact Us
          </Button>
        }
      >
        <p>
          We remain committed to shaping resilient, future-ready cities that foster economic growth, social connection
          and sustainable living.
        </p>
        <p>
          Through strategic enterprise, innovative solutions and impactful partnerships, we continue to redefine urban
          possibilities and contribute meaningfully to the built environment.
        </p>
        <p className="font-display text-h3 text-navy">Be part of it!</p>
      </CtaPanel>
    </>
  );
}
