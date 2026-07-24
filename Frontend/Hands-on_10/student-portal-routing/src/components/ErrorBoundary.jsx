import { Component } from "react";

// -----------------------------------------------------------------------
// Global Error Boundary
// -----------------------------------------------------------------------
// Error Boundaries only work as class components (no hook equivalent
// exists yet). Wrapping <App /> with this catches any render-time error
// thrown anywhere in the component tree and shows a fallback UI instead
// of a blank white screen.
//
// Note: Error Boundaries do NOT catch errors inside event handlers,
// async code (e.g. promise rejections in useEffect), or the boundary's
// own render. Those are handled locally (see CoursesPage / CourseCard
// try/catch + error state) since the API layer's response interceptor
// already standardises those errors.
// -----------------------------------------------------------------------
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // In a real app this would report to a logging service
    console.error("Global error boundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            border: "1px solid red",
            padding: "20px",
            margin: "20px",
            textAlign: "center",
          }}
        >
          <h2>Something went wrong.</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={this.handleReset}>Try Again</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
