import { css } from '@linaria/core';

import { media } from './utils/media-queries';

export const globals = css`
  :global() {
    body {
      background: #1e1e1e;
      margin: 0;
      padding: 0;
    }
    html,
    body {
      ${media.mobileStyle} {
        overscroll-behavior-y: none;
      }
    }
  }
`;
