import { Component } from 'react';
import { CONTACT } from '../../data/site';

/**
 * Last-resort fallback so an unexpected render error shows a recovery page instead of a blank screen.
 * React already reports the error to the console; there is no error-tracking service yet.
 * (Error boundaries must be class components in React 18.)
 */
export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="grid min-h-screen place-items-center bg-white px-6 text-center">
        <div className="flex max-w-md flex-col items-center gap-5">
          <h1 className="text-h2">Something went wrong</h1>
          <p className="text-lead text-navy/70">
            Please reload the page. If the problem continues, email us at{' '}
            <a className="underline" href={`mailto:${CONTACT.email}`}>
              {CONTACT.email}
            </a>
            .
          </p>
          <a href="/" className="focus-ring rounded-btn bg-navy px-5 py-3 font-display text-white">
            Back to home
          </a>
        </div>
      </main>
    );
  }
}
