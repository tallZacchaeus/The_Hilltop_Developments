import { ArrowRight } from 'lucide-react';
import { TEAM } from '../../data/people';
import Button from '../../components/ui/Button';
import CtaPanel from '../../components/sections/CtaPanel';
import PeopleSection from '../../components/sections/PeopleSection';
import SplitSection from '../../components/sections/SplitSection';
import VisionMission from './VisionMission';
import ProjectCategories from './ProjectCategories';

const TEAM_INTRO = ['Behind every development is a team of people committed to turning ideas into possibilities.'];

export default function AboutPage() {
  return (
    <>
      <SplitSection
        id="overview"
        as="h1"
        eyebrow="About us"
        title="Who We Are"
        image="/images/apartment-block.jpg"
        imageAlt="A contemporary apartment block rising against a clear blue sky"
        imageAspect="aspect-[4/3] lg:aspect-[4/5]"
        priority
        actions={
          <Button to="/contact" variant="dark" icon={ArrowRight}>
            Let&apos;s Get In Touch
          </Button>
        }
      >
        <p>
          Hilltop Developments is a forward-thinking real estate development company dedicated to shaping sustainable
          cities through innovative, adaptive, and future-ready developments.
        </p>
        <p>
          Driven by excellence and a deep understanding of evolving urban needs, we create spaces and communities that
          seamlessly integrate functionality, sustainability, and long-term value.
        </p>
        <p>
          Our approach goes beyond construction; we are committed to redefining the future of living, working, and
          community development by delivering transformative real estate solutions that inspire growth, enhance
          lifestyles, and contribute meaningfully to the built environment.
        </p>
      </SplitSection>

      <VisionMission />

      <PeopleSection
        id="team"
        eyebrow="Our Team"
        title="The People Behind the Vision."
        intro={TEAM_INTRO}
        people={TEAM}
        groupLabel="team"
      />

      <ProjectCategories />

      <SplitSection
        id="tomorrow"
        eyebrow="As the Future Unfolds"
        title="Building with Tomorrow in Mind."
        image="/images/lagos-waterfront.jpg"
        imageAlt="A bridge crossing the water beside a growing Nigerian city"
        imageAspect="aspect-[4/3]"
      >
        <p>
          We remain committed to shaping resilient, future-ready cities that foster economic growth, social connection
          and sustainable living.
        </p>
        <p>
          Through strategic enterprise, innovative solutions and impactful partnerships, we continue to redefine urban
          possibilities and contribute meaningfully to the built environment.
        </p>
      </SplitSection>

      <SplitSection
        id="partnerships"
        eyebrow="Partnerships"
        title="We believe meaningful development is strengthened by collaboration."
        image="/images/partnership-handshake.jpg"
        imageAlt="Two professionals shaking hands outside a modern building"
        imageSide="left"
        imageAspect="aspect-[4/3]"
        actions={
          <Button to="/contact?type=partnership" variant="dark" icon={ArrowRight}>
            Partner with Hilltop
          </Button>
        }
      >
        <p>
          By working with investors, professionals, organisations and other key stakeholders, we create opportunities
          to exchange expertise, explore possibilities and deliver solutions that create lasting value.
        </p>
      </SplitSection>

      <CtaPanel
        id="next"
        eyebrow="Join us"
        title="Be Part of What Comes Next."
        actions={
          <>
            <Button to="/developments" variant="dark" icon={ArrowRight}>
              Explore Our Developments
            </Button>
            <Button to="/contact" variant="light">
              Contact Us
            </Button>
          </>
        }
      >
        <p>The future of cities is shaped by the ideas, decisions and partnerships we make today.</p>
        <p>Join us as we create spaces and opportunities that will serve generations to come.</p>
      </CtaPanel>
    </>
  );
}
