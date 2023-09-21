import { styled } from '@linaria/react';

import { media } from './utils/media-queries';

export const easings = {
  /** Overshoots */
  easeOutBack: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
};

export const experimentalPreciseTypesetting = `
  leading-trim: both;
  text-edge: cap;
`;

export const Main = styled.main<{
  'data-has-opened-section': boolean;
}>`
  min-height: 100svh;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;

  overflow: hidden;

  transition: background-color 0.45s ease-in-out;
  &[data-has-opened-section='true'] {
    background-color: rgba(0, 0, 0, 0.3);
  }

  ${media.mobileStyle} {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
`;

export const sharedCircularButtonSubmittingEffect = `
  &:disabled {
    cursor: wait;
    animation: submitting-answers 0.8s ease-in-out 0.3s infinite;

    @keyframes submitting-answers {
      to {
        transform: rotateZ(1turn);
      }
    }
  }
`;
