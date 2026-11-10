import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { hasError: boolean };

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Portfolio rendering failed.", error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="error-screen" role="alert">
          <span className="eyebrow">Portfolio unavailable</span>
          <h1 className="section-title">Something went wrong.</h1>
          <p>Please reload the page to try again.</p>
          <button className="button button-primary" type="button" onClick={() => window.location.reload()}>
            Reload portfolio
          </button>
        </main>
      );
    }

    return this.props.children;
  }
}
