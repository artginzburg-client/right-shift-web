import { css } from '@linaria/core';

export const globals = css`
  :global() {
    html {
      min-height: 100vh;
    }
    body {
      background: #1e1e1e;
      margin: 0;
      padding: 0;
    }
  }
`;
