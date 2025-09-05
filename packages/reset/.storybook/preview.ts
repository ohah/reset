import type { Preview } from '@storybook/react';
import React from 'react';

// React 19 호환성을 위한 설정
if (typeof window !== 'undefined') {
  // React 19의 새로운 JSX Transform 지원
  window.React = React;
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // React 19 호환성을 위한 추가 설정
    docs: {
      source: {
        type: 'dynamic',
      },
    },
  },
  decorators: [
    (Story) => {
      // React 19 호환성을 위한 래퍼
      return React.createElement(
        React.Fragment,
        null,
        React.createElement(Story)
      );
    },
  ],
};

export default preview;
