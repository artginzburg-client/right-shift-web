import { styled } from '@linaria/react';
import { media } from '../../utils/media-queries';
import { colors } from '../../config/colors';
import { experimentalPreciseTypesetting, easings } from '../../page.styled';

export const Heading1 = styled.h1`
  margin: 0;

  ${experimentalPreciseTypesetting}
  font-size: 128px;
  font-style: normal;
  font-weight: 700;

  transition: transform 0.2s ${easings.easeOutBack};

  ${media.mobileStyle} {
    font-size: 69px;
  }
`;

export const Subheading = styled.p`
  margin: 0;

  ${experimentalPreciseTypesetting}
  font-size: 36px;
  font-style: normal;
  font-weight: 300;
  letter-spacing: 0.72px;

  ${media.mobileStyle} {
    font-size: 18px;
  }
`;
const rotatingWordsAnimationDuration = 5;
/** @todo de-hardcode */
const rotatingWordsQuantity = 3;
/** @todo make it `-rotatingWordsAnimationDuration / rotatingWordsQuantity` */
const rotatingWordsSharedAnimationDelay = -1.7; // -5 / 3

export const RotatingWordsInSubheadingContainer = styled.span`
  display: inline-grid;
  position: relative;

  > span {
    animation: topToBottom ${rotatingWordsAnimationDuration}s ease-in-out infinite
      ${0 + rotatingWordsSharedAnimationDelay}s;
    transform: scaleY(0);

    &:not(:first-child) {
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  span:nth-child(2) {
    animation-delay: ${`${
      rotatingWordsAnimationDuration / rotatingWordsQuantity + rotatingWordsSharedAnimationDelay
    }s`};
  }
  span:nth-child(3) {
    animation-delay: ${`${
      (rotatingWordsAnimationDuration / rotatingWordsQuantity) * 2 +
      rotatingWordsSharedAnimationDelay
    }s`};
  }

  @keyframes topToBottom {
    0%,
    15% {
      transform: scaleY(0);
      transform-origin: bottom;
    }
    40% {
      transform: scaleY(1);
    }
    50% {
      transform: scaleY(1);
      transform-origin: top;
    }
    70%,
    100% {
      transform: scaleY(0);
    }
  }
`;
const headingsContainerMobilePadding = 10;
/** @todo low-priority, but do not rely on hard-coded static values — fix the mobile layout properly. */
const headingsContainerMobileHeightHardCoded = 101 + headingsContainerMobilePadding * 2;
export const HeadingsContainer = styled.div<{
  'data-is-menu-opened': boolean;
  'data-has-opened-section': boolean;
}>`
  padding: 62px 65px;

  color: #fff;

  transition: 0.45s ease-in-out;
  transition-property: filter, color;

  ${media.mobileStyle} {
    transition: filter 1.5s, opacity 0.1s;

    padding: ${headingsContainerMobilePadding}px;
    padding-top: calc(100svh - ${headingsContainerMobileHeightHardCoded}px);

    &[data-is-menu-opened='true'] {
      filter: blur(2px);
      opacity: 0.2;

      transition: filter 0.5s, opacity 0.25s;
    }
  }

  &[data-has-opened-section='true'] {
    filter: blur(10px);

    color: rgba(255, 255, 255, 0.7);
  }
`;
const subheadingSpanStyleConfig = {
  borderRadius: 10,
  mobile: {
    borderRadius: 6, // fine-tuned by eye. It would be 5 'cause 36/18=2, 10/2=5 (Subheading font-sizes), but 5 looks too edgy (does not feel like the desktop version).
  },
};
export const SubheadingSpan = styled.span`
  position: relative;

  padding: 3px 7px;

  &::before {
    inset: 0;
    width: 100%;
    height: 100%;

    box-sizing: border-box;

    background: rgb(255, 0, 0);
    background: ${colors.rainbow};
  }
  &::after {
    inset: 1.5px;
    width: calc(100%-3px);
    height: calc(100%-3px);
    background-color: #1e1e1e;
  }
  &::before,
  &::after {
    content: '';
    position: absolute;

    border-radius: ${subheadingSpanStyleConfig.borderRadius}px;
    z-index: -1;

    ${media.mobileStyle} {
      border-radius: ${subheadingSpanStyleConfig.mobile.borderRadius}px;
    }
  }
`;
