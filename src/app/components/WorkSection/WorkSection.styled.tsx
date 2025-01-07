import { styled } from '@linaria/react';
import Image from 'next/image';
import Link from 'next/link';

import { easings } from '~/app/page.styled';
import { navigationMenuContainerBorderRadius } from '~/app/components/NavigationMenu/NavigationMenu.styled';
import { media } from '~/app/utils/media-queries';
import { mobileSafeHoverEffect } from '~/app/utils/mobileSafeHoverEffect';

export const WorkSectionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 5px;

  ${media.mobileStyle} {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }
`;
const workSectionNextIconBaseTransform = 'translate(-50%, -50%)';
export const WorkSectionNextIcon = styled(Image)`
  position: absolute;
  z-index: 1;
  display: flex;
  left: 50%;
  top: 50%;
  transform: ${workSectionNextIconBaseTransform} scale(0);

  transition: 0.4s ${easings.easeOutBack};
  transition-property: transform;
`;

export const WorkSectionImageContainer = styled(Link)`
  position: relative;
  ::after {
    content: '';
    position: absolute;
    inset: 0;

    border-radius: inherit;

    transition: background-color 0.4s ease-in-out;
  }

  ${mobileSafeHoverEffect(`
    &::after {
      background-color: rgba(0, 0, 0, 0.7);
    }

    > img:last-child {
      transform: ${workSectionNextIconBaseTransform} scale(1);
    }
  `)}

  &:nth-child(1) {
    border-top-left-radius: ${navigationMenuContainerBorderRadius}px;
    ${media.mobileStyle} {
      border-top-right-radius: ${navigationMenuContainerBorderRadius}px;
    }
  }
  &:nth-child(2) {
    border-top-right-radius: ${navigationMenuContainerBorderRadius}px;
    ${media.mobileStyle} {
      border-top-right-radius: 0;
    }
  }
  &:nth-last-child(1) {
    border-bottom-right-radius: ${navigationMenuContainerBorderRadius}px;
    ${media.mobileStyle} {
      border-bottom-left-radius: ${navigationMenuContainerBorderRadius}px;
    }
  }
  &:nth-last-child(2) {
    border-bottom-left-radius: ${navigationMenuContainerBorderRadius}px;
    ${media.mobileStyle} {
      border-bottom-left-radius: 0;
    }
  }
`;
export const WorkSectionImage = styled(Image)`
  width: 100%;
  height: 100%;
  aspect-ratio: 16 / 9;

  object-fit: cover;
  object-position: top;

  border-radius: inherit;

  background-color: #1e1e1e; /* This color shows while the image is loading. */
`;
