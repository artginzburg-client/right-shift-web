import { styled } from '@linaria/react';

import { reset, resetExtra } from './utils/reset';
import Image from 'next/image';
import Link from 'next/link';
import { media } from './utils/media-queries';

const easings = {
  /** Overshoots */
  easeOutBack: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
};

export const Main = styled.main`
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

export const Heading1 = styled.h1`
  margin: 0;

  /* color: #fff; */
  /* text-align: right; */
  leading-trim: both;
  text-edge: cap;
  /* font-family: 'GT Eesti Pro Display'; */
  font-size: 128px;
  font-style: normal;
  font-weight: 700;
  /* line-height: 0px; 0% */

  transition: transform 0.2s ${easings.easeOutBack};

  ${media.mobileStyle} {
    font-size: 65px;
  }
`;

export const Subheading = styled.p`
  margin: 0;

  /* color: #fff; */
  /* text-align: right; */
  leading-trim: both;
  text-edge: cap;
  /* font-family: GT Eesti Pro Display; */
  font-size: 36px;
  font-style: normal;
  font-weight: 300;
  /* line-height: 0px; 0% */
  letter-spacing: 0.72px;

  ${media.mobileStyle} {
    font-size: 17px;
  }
`;

export const HeadingsContainer = styled.div`
  /* display: flex; */
  /* height: 100%; */
  /* flex-direction: column; */
  /* align-items: flex-start; */
  /* justify-content: flex-end; */
  /* justify-content: flex-end; */
  /* align-items: flex-end; */
  /* margin-top: auto; */
  /* padding-top: auto; */

  padding: 62px 65px;

  color: #fff;

  transition: 0.45s ease-in-out;
  transition-property: filter, color;
  &[data-has-opened-section='true'] {
    filter: blur(10px);

    color: rgba(255, 255, 255, 0.7);
  }

  ${media.mobileStyle} {
    padding: 10px;
    margin-top: 40px;
  }
`;

export const SubheadingSpan = styled.span`
  position: relative;

  padding: 3px 7px;
  /* padding-bottom: 4px; */

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    inset: 0;
    width: 100%;
    height: 100%;

    border-radius: 10px;
    box-sizing: border-box;
    z-index: -1;

    background: rgb(255, 0, 0);
    background: linear-gradient(
      ${0.25 + 0.08}turn,
      rgba(255, 0, 0, 1),
      rgba(201, 193, 0, 1),
      rgba(0, 255, 240, 1),
      rgba(5, 0, 255, 1)
    );
  }
  &::after {
    content: '';
    position: absolute;
    inset: 1.5px;
    width: calc(100%-3px);
    height: calc(100%-3px);
    background-color: #1e1e1e;
    border-radius: 10px;
    z-index: -1;
  }
`;

export const NavigationMenuOuterContainer = styled.div`
  position: absolute;
  left: 100%;

  ${media.mobileStyle} {
    top: 100%;
    left: unset;
    right: -50%;
    transform: translateX(calc(50% - 17px));
  }
`;

const navigationMenuContainerWidth = 350;
const navigationMenuContainerWidthInWorkSection = 650;

const navigationMenuContainerHeight = 500;
// const navigationMenuContainerHeightInWorkSection = 373;

const mavigationMenuContainerBorderRadius = 20;

export const NavigationMenuContainer = styled.div<{ workOpened: boolean; calcOpened: boolean }>`
  background: #fff;
  border-radius: ${mavigationMenuContainerBorderRadius}px;

  transition: 0.6s ${easings.easeOutBack};
  transition-property: width, height;

  /* width: ${navigationMenuContainerWidth}px; */
  /* height: ${navigationMenuContainerHeight}px; */

  margin-right: 65px;

  box-sizing: border-box;
  padding: ${(props) => (props.calcOpened ? '50px' : props.workOpened ? '5px' : '50px 40px')};

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: ${(props) =>
    props.workOpened || props.calcOpened
      ? `${navigationMenuContainerWidthInWorkSection}px`
      : `${navigationMenuContainerWidth}px`};
  height: ${(props) => (props.workOpened ? 'auto' : `${navigationMenuContainerHeight}px`)};

  max-width: 100vw;
  max-height: calc(100svh - 130px);
  overflow: auto;
`;

export const NavigationMenuComponentContainer = styled.div<{
  workOpened: boolean;
  calcOpened: boolean;
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

  &:hover[data-is-opened='false'][data-was-just-closed='false'] {
    transform: translateX(${-65}px);

    > button {
      transform: rotate(-45deg);
    }

    ${media.mobileStyle} {
      transform: translateY(${-65}px);
    }
  }

  &[data-is-opened='true'] {
    transform: translateX(
      ${(props) =>
        `${
          -(props.workOpened || props.calcOpened
            ? navigationMenuContainerWidthInWorkSection
            : navigationMenuContainerWidth) - 65
        }px`}
    );

    ${media.mobileStyle} {
      transform: translateY(calc(-100svh + 125px));
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
    padding-bottom: 65px;
  }
`;

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

    /* transition-duration: 0.5s; */
    transition-delay: 0.25s;
  }

  &[data-has-opened-section='true'] {
    > svg > g:nth-of-type(1) {
      > line:nth-of-type(1) {
        transform: translateX(1.75px) translateY(-4px) rotateZ(135deg) scaleX(0.3);
        opacity: 0;
      }
      > line:nth-of-type(2) {
        transform: translateX(1.75px) translateY(2.75px) rotateZ(0deg) scaleX(1);
        opacity: 0;
      }
      > line:nth-of-type(3) {
        transform: translateX(2.75px) translateY(6.75px) rotateZ(-135deg) scaleX(0.3);
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
    leading-trim: both;
    text-edge: cap;
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

    &:hover {
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
    leading-trim: both;
    text-edge: cap;
    /* font-family: GT Eesti Pro Display; */
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

    &:hover {
      color: #a1a1a1;
    }
  }
`;

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

  /* opacity: 0; */

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

  &:hover {
    &::after {
      background-color: rgba(0, 0, 0, 0.7);
    }

    ${WorkSectionNextIcon} {
      /* opacity: 1; */
      transform: ${workSectionNextIconBaseTransform} scale(1);
    }
  }

  &:nth-child(1) {
    border-top-left-radius: ${mavigationMenuContainerBorderRadius}px;
    ${media.mobileStyle} {
      border-top-right-radius: ${mavigationMenuContainerBorderRadius}px;
    }
  }
  &:nth-child(2) {
    border-top-right-radius: ${mavigationMenuContainerBorderRadius}px;
    ${media.mobileStyle} {
      border-top-right-radius: 0;
    }
  }
  &:nth-last-child(1) {
    border-bottom-right-radius: ${mavigationMenuContainerBorderRadius}px;
    ${media.mobileStyle} {
      border-bottom-left-radius: ${mavigationMenuContainerBorderRadius}px;
    }
  }
  &:nth-last-child(2) {
    border-bottom-left-radius: ${mavigationMenuContainerBorderRadius}px;
    ${media.mobileStyle} {
      border-bottom-left-radius: 0;
    }
  }
`;
export const WorkSectionImage = styled(Image)`
  width: 100%;
  height: 100%;

  object-fit: cover;

  border-radius: inherit;
`;

export const CalculatorSectionContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const CalculatorSectionRegularText = styled.p`
  margin: 0;

  leading-trim: both;
  text-edge: cap;
  /* font-family: GT Eesti Pro Display; */
  font-size: 28px;
  /* font-style: normal; */
  /* font-weight: 400; */
  line-height: 120%; /* 33.6px */

  > span {
    font-weight: 700;
  }
`;

export const ArrowButtonElement = styled.button`
  ${reset.button}
  cursor: pointer;

  padding: 9px 12px;
  border-radius: 20px;
  border: 2px solid transparent;

  min-width: 230px;

  color: #000;
  leading-trim: both;
  text-edge: cap;
  /* font-family: GT Eesti Pro Display; */
  font-size: 24px;
  /* font-style: normal; */
  /* font-weight: 400; */
  /* line-height: 0px; 0% */
  line-height: 58%;
  /* box-sizing: border-box; */

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
`;

export const CalculatorSectionHeading = styled.h2`
  margin: 0;
  padding: 0;

  color: #000;
  /* text-align: right; */
  leading-trim: both;
  text-edge: cap;
  /* font-family: GT Eesti Pro Display; */
  font-size: 36px;
  font-style: normal;
  font-weight: 400;
  /* line-height: 70%; */ // one-line
  line-height: 120%; /* 43.2px */ // multi-line
`;
