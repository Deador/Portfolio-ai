import type { Preview } from '@storybook/react';
import '../src/shared/styles/index.scss';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#1f1f1f',
        },
      ],
    },
    viewport: {
      defaultViewport: 'desktop',
      viewports: {
        mobileS: {
          name: 'Mobile S (320)',
          styles: { width: '320px', height: '568px' },
        },
        mobile: {
          name: 'Mobile (375)',
          styles: { width: '375px', height: '667px' },
        },
        mobileL: {
          name: 'Mobile L (430)',
          styles: { width: '430px', height: '932px' },
        },
        tablet: {
          name: 'Tablet (768)',
          styles: { width: '768px', height: '1024px' },
        },
        tabletL: {
          name: 'Tablet L (1024)',
          styles: { width: '1024px', height: '1366px' },
        },
        desktop: {
          name: 'Desktop (1280)',
          styles: { width: '1280px', height: '800px' },
        },
      },
    },
  },
};

export default preview;