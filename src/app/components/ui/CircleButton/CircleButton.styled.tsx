import { styled } from '@linaria/react';

import {
  experimentalPreciseTypesetting,
  easings,
  sharedCircularButtonSubmittingEffect,
} from '~/app/page.styled';
import { mobileSafeHoverEffect } from '~/app/utils/mobileSafeHoverEffect';
import { reset } from '~/app/utils/reset';

export const CircleButtonElement = styled.button`
  ${reset.button}
  &:not(:disabled) {
    cursor: pointer;
  }

  text-align: center;
  ${experimentalPreciseTypesetting}
  font-size: 24px;

  border-radius: 50%;
  aspect-ratio: 1;
  width: 70px;
  height: 70px;

  position: relative;
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border: 1px solid #000;
    border-radius: 50%;
    top: 0;
    left: 0;

    transition: transform 0.3s ${easings.easeOutBack};
  }

  ${mobileSafeHoverEffect(`
    &:not(:disabled)::after {
      transform: scale(${120 / 70});
    }
    outline: none;
  `)}

  ${sharedCircularButtonSubmittingEffect}
`;
