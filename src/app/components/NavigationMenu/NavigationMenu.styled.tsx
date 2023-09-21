import { styled } from '@linaria/react';
import { clampify } from 'css-clamper';
import { reset, resetExtra } from '../../utils/reset';
import { media } from '../../utils/media-queries';
import { easings, experimentalPreciseTypesetting } from '../../page.styled';

export const NavigationMenuOuterContainer = styled.div`
  position: absolute;
  left: 100%;

  ${media.mobileStyle} {
    bottom: 100%;
    left: unset;
    right: -50%;
    transform: translateX(calc(50% - 17.5px));
  }
`;
const navigationMenuContainerWidth = 350;
const navigationMenuContainerWidthInWorkSection = 650;
const navigationMenuContainerHeight = 500;
// const navigationMenuContainerHeightInWorkSection = 373;
export const navigationMenuContainerBorderRadius = 20;
/** Not sure this constant is called right. */
const mobileMenuOpenedTopOffset = 65;
// const mobileMenuOpenedBottomShift = 5;
/** Not sure this constant is called right. */
const mobileMenuOpenedPrimaryButtonTopOffset = -53;

export const navigationMenuContainerPaddingInCalc = 50;
const navigationMenuPrimaryButtonTargetOffsetToMenuWhenOpened = 30;
const navigationMenuPrimaryButtonOffsetToMenuWhenOpenedMaxViewport = `414px`; // iPhone 8 Plus

const navigationMenuContainerClampedMaxHeight = clampify(
  `${mobileMenuOpenedTopOffset}px`,
  `${mobileMenuOpenedTopOffset + navigationMenuPrimaryButtonTargetOffsetToMenuWhenOpened - 3}px`,
  undefined,
  navigationMenuPrimaryButtonOffsetToMenuWhenOpenedMaxViewport,
);
export const NavigationMenuContainer = styled.div<{
  workOpened: boolean;
  calcOpened: boolean;
  contactOpened: boolean;
}>`
  background: #fff;
  border-radius: ${navigationMenuContainerBorderRadius}px;

  transition: 0.6s ${easings.easeOutBack};
  transition-property: width, height;

  margin-right: 65px;

  box-sizing: border-box;
  padding: ${(props) =>
    props.calcOpened
      ? `${navigationMenuContainerPaddingInCalc}px`
      : props.workOpened
      ? '5px'
      : '50px 40px'};

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: ${(props) =>
    props.workOpened || props.calcOpened || props.contactOpened
      ? `${navigationMenuContainerWidthInWorkSection}px`
      : `${navigationMenuContainerWidth}px`};
  height: ${(props) =>
    props.workOpened || props.calcOpened || props.contactOpened
      ? 'auto'
      : `${navigationMenuContainerHeight}px`};

  max-width: 100vw;
  max-height: calc(100svh - ${navigationMenuContainerClampedMaxHeight});
  overflow: auto;
`;
/** @todo use this constant in the svg width, height, viewBox (inside NavigationMenuPrimaryButton in page.tsx). Exclude the variable first, obviously. */
const navigationMenuPrimaryButtonSize = 50;
/** It's not precisely the offset from the bottom, but the closest thing to it. */
const navigationMenuComponentContainerClampedOffsetFromScreenBottom = clampify(
  `${-65}px`,
  `${
    -navigationMenuPrimaryButtonSize - navigationMenuPrimaryButtonTargetOffsetToMenuWhenOpened - 9
  }px`,
  undefined,
  navigationMenuPrimaryButtonOffsetToMenuWhenOpenedMaxViewport,
);
export const NavigationMenuComponentContainer = styled.div<{
  workOpened: boolean;
  calcOpened: boolean;
  contactOpened: boolean;
  isMenuOpened: boolean;
}>`
  display: flex;
  column-gap: 56px;
  align-items: center;

  align-self: center;
  margin-left: auto;

  position: relative;

  padding-right: 65px;

  transition: transform 0.6s ${easings.easeOutBack};

  ${media.hoverNonTouch} {
    /* Desktop-only "peek" effect */
    &:hover[data-is-opened='false'][data-was-just-closed='false'] {
      transform: translateX(${-65}px);

      > button {
        transform: rotate(-45deg);
      }
    }
  }

  &[data-is-opened='true'] {
    transform: translateX(
      ${(props) =>
        `${
          -(props.workOpened || props.calcOpened || props.contactOpened
            ? navigationMenuContainerWidthInWorkSection
            : navigationMenuContainerWidth) - 65
        }px`}
    );

    ${media.mobileStyle} {
      transform: translateY(${navigationMenuComponentContainerClampedOffsetFromScreenBottom});
    }
  }

  > button {
    cursor: pointer;

    transition: transform 0.5s ease-in-out;
  }

  ${media.mobileStyle} {
    margin-left: 0;
    margin-top: auto;
    padding-right: 0;
    margin-bottom: ${mobileMenuOpenedPrimaryButtonTopOffset}px;

    transform: rotateZ(90deg) translateY(calc(-50vw + ${navigationMenuPrimaryButtonSize / 2}px))
      translateX(calc(-50svh + ${mobileMenuOpenedPrimaryButtonTopOffset / 2}px));
  }
`;
const navigationMenuPrimaryButtonClampedOffsetToMenuWhenOpened = clampify(
  '6px',
  `${navigationMenuPrimaryButtonTargetOffsetToMenuWhenOpened}px`,
  undefined,
  navigationMenuPrimaryButtonOffsetToMenuWhenOpenedMaxViewport,
);
export const NavigationMenuPrimaryButton = styled.button`
  ${reset.button}
  ${resetExtra.buttonAsIcon}
  font-size: 0;

  &[aria-expanded='true'] {
    transform: rotate(-0.5turn);
    --line-scale: 1.05;
    > svg > g:nth-of-type(1) {
      > line:nth-of-type(1) {
        transform: translateX(-7.5px) translateY(7.5px) rotateZ(45deg)
          scaleX(var(--line-scale, 1.05));
      }
      > line:nth-of-type(2) {
        transform: translateX(-0.5px) translateY(0.5px) rotateZ(45deg)
          scaleX(var(--line-scale, 1.05));
      }
      > line:nth-of-type(3) {
        transform: translateX(-6.5px) translateY(-6.5px) rotateZ(-45deg)
          scaleX(var(--line-scale, 1.05));
      }
    }
    &:hover {
      --line-scale: 1.25;
    }

    transition-delay: 0.25s;
  }

  &[data-has-opened-section='true'] {
    > svg > g:nth-of-type(1) {
      > line:nth-of-type(1) {
        transform: translateX(1.75px) translateY(-9px) rotateZ(-180deg) scaleX(0);
        opacity: 0;
      }
      > line:nth-of-type(2) {
        transform: translateX(8.75px) translateY(1px) rotateZ(45deg) scaleX(0.3);
        opacity: 0;
      }
      > line:nth-of-type(3) {
        transform: translateX(2.75px) translateY(-3px) rotateZ(-45deg) scaleX(0.3);
        opacity: 0;
      }
    }
    > svg > g:nth-of-type(2) {
      > path {
        opacity: 1;
      }
    }
  }

  > svg > g:nth-of-type(1) {
    > line {
      transition: 0.5s ease-in-out;
      transition-property: transform, opacity;
      transform-origin: center;
    }
  }

  > svg > g:nth-of-type(2) {
    > path {
      opacity: 0;
      transition: opacity 0.5s ease-in-out;
    }
  }

  ${media.mobileStyle} {
    transform: translateY(${23 / 2}px) rotateZ(0.75turn);
    &[aria-expanded='true'] {
      transform: translateY(${navigationMenuPrimaryButtonClampedOffsetToMenuWhenOpened})
        rotateZ(0.5turn);
    }
  }
`;

export const NavigationMenuNav = styled.nav`
  display: flex;
  flex-direction: column;

  row-gap: 40px;

  > a {
    ${reset.a}

    text-decoration: underline;
    text-underline-offset: 2px;

    color: #000;
    ${experimentalPreciseTypesetting}
    /* font-family: GT Eesti Pro Display; */
    font-size: 28px;
    font-style: normal;
    font-weight: 400;
    /* line-height: 0px; 0% */
    letter-spacing: 0.56px;
    text-decoration-line: underline;

    position: relative;
    &::before {
      content: '';
      position: absolute;
      left: -22px;
      top: calc(50% + 2px);
      transform: translateY(-50%) scale(0);
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 5px solid black;
      box-sizing: border-box;

      transition: 0.3s ease-in-out;
      transition-property: transform, border;
    }

    &:hover,
    &:focus {
      &::before {
        transform: translateY(-50%) scale(0.5);
      }
    }

    &:active {
      &::before {
        transition-duration: 0.1s;
        transform: translateY(-50%) scale(1);
        border: 1px solid black;
      }
    }
  }
`;

export const NavigationMenuLinksContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  > ul {
    ${reset.ul}
  }
`;

export const NavigationMenuContactList = styled.ul`
  display: grid;
  row-gap: 20px;

  > li {
    color: #2e2e2e;
    ${experimentalPreciseTypesetting}
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    > a {
      ${reset.a}
    }
  }
`;

export const NavigationMenuSocialList = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 10px;

  > a {
    ${reset.a}
    font-size: 0; // remove the phantom offset.

    transition: color 0.3s ease-in-out;

    color: #2e2e2e;
    &:hover {
      color: #a1a1a1;
    }
  }
`;
