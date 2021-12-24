import React from "react";

type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

// 错误边界仅有class 组件实现
export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  state = { error: null };

  static getDerivedStateFromError(error: Error): { error: Error } {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;

    if (error) {
      return fallbackRender(error);
    }
    return children;
  }
}
