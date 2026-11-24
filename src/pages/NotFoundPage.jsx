import Button from '../components/ui/Button';
import PageHero from '../components/sections/PageHero';

export default function NotFoundPage() {
  return (
    <PageHero
      eyebrow="404"
      title="This page could not be found"
      lead="The page may have moved, or the link may be incorrect."
      actions={
        <>
          <Button to="/" variant="dark">
            Back to home
          </Button>
          <Button to="/developments" variant="light">
            View developments
          </Button>
        </>
      }
    />
  );
}
