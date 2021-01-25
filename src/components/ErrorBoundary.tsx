import React from 'react';

type Props = {
  children: React.ReactNode,
}

type State = {
  hasError: boolean,
}

const initialState = (): State => {
  return {
    hasError: false,
  };
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initialState();
  }

  static getDerivedStateFromError(error: Error): State {
    return {hasError: false};
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    //
  }

  render(): React.ReactNode {
    return <>{this.props.children}</>;
  }
}

export default ErrorBoundary;
