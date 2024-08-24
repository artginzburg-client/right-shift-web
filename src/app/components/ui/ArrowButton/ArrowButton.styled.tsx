import { styled } from '@linaria/react';

import { experimentalPreciseTypesetting, easings } from '~/app/page.styled';
import { navigationMenuContainerPaddingInCalc } from '~/app/components/NavigationMenu/NavigationMenu.styled';
import { media } from '~/app/utils/media-queries';
import { reset } from '~/app/utils/reset';

export const ArrowButtonElement = styled.button`
  ${reset.button}
  cursor: pointer;

  padding: 9px 12px;
  border-radius: 20px;
  border: 2px solid transparent;

  min-width: 230px;

  color: #000;
  ${experimentalPreciseTypesetting}
  font-size: 24px;
  line-height: 58%;

  > svg > line:nth-of-type(1) {
    transform: scaleX(0.5);
    transform-origin: right;

    transition: transform 0.5s ${easings.easeOutBack};
  }

  transition: border-color 0.5s ease-in-out;

  &:hover {
    border-color: #1e1e1e;

    > svg > line:nth-of-type(1) {
      transform: none;
    }
  }

  ${media.mobileStyle} {
    font-size: 22px;
  }
`;
export const ArrowButtonElementStickyOnSmallHeight = styled(ArrowButtonElement)`
  @media (max-height: 800px) {
    position: sticky;
    bottom: ${-navigationMenuContainerPaddingInCalc + 20}px;
    background-color: #fff;
    box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.3);
  }
`;
