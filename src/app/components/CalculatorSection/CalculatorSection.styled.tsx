import { styled } from '@linaria/react';
import { media } from '~/app/utils/media-queries';
import {
  experimentalPreciseTypesetting,
  easings,
  sharedCircularButtonSubmittingEffect,
} from '~/app/page.styled';
import { navigationMenuContainerPaddingInCalc } from '~/app/components/NavigationMenu/NavigationMenu.styled';
import { colors } from '~/app/config/colors';
import { mobileSafeHoverEffect } from '~/app/utils/mobileSafeHoverEffect';
import { reset } from '~/app/utils/reset';

export const CalculatorSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  row-gap: 50px;
`;
export const CalculatorSectionCopyright = styled.p`
  margin: 0;

  position: absolute;
  bottom: ${-navigationMenuContainerPaddingInCalc + 20}px;
  right: ${-navigationMenuContainerPaddingInCalc + 20}px;

  ${experimentalPreciseTypesetting}
  font-size: 20px;
  font-weight: 400;

  > span {
    font-size: 16px;
    font-weight: 700;
  }
`;

export const CalculatorSectionRegularText = styled.p`
  margin: 0;

  ${experimentalPreciseTypesetting}
  font-size: 28px;
  line-height: 120%; /* 33.6px */

  > span {
    font-weight: 700;
  }

  ${media.mobileStyle} {
    font-size: 24px;
  }
`;

export const CalculatorSectionArrowButtonsContainer = styled.div`
  display: inherit;
  flex-direction: inherit;
  align-items: inherit;
  row-gap: 30px;
`;
export const CalculatorSectionSeparator = styled.div`
  width: 100px;
  height: 1px;
  border-radius: 2px;
  background-color: #000;
  opacity: 0.4; /* was 0.5 in Figma, tuned down to better match the look. */
`;

export const CalculatorSectionHeading = styled.h2`
  margin: 0;
  padding: 0;

  color: #000;
  ${experimentalPreciseTypesetting}
  font-size: 36px;
  font-style: normal;
  font-weight: 400;
  /* line-height: 70%; */ // one-line
  line-height: 120%; /* 43.2px */ // multi-line

  ${media.mobileStyle} {
    font-size: 30px;
  }
`;

export const CircleButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 80px;
`;
export const CalculatorSectionDesiredOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 10px;
  row-gap: 40px;

  ${media.mobileStyle} {
    grid-template-columns: 1fr;
  }
`;
export const CalculatorSectionDesiredOptionLabel = styled.label`
  color: #1e1e1e;
  ${experimentalPreciseTypesetting}
  font-size: 20px;
  line-height: 120%; /* 24px */

  display: flex;
  column-gap: 18px;
  align-items: center;

  cursor: pointer;
`;
export const CalculatorSectionDesiredOptionCheckbox = styled.input`
  all: unset;

  aspect-ratio: 1;
  width: 25px;
  height: 25px;
  box-sizing: border-box;
  border: 1px solid #1e1e1e;
  border-radius: 50%;

  transition: background-color 0.3s ease-out;
  &:checked {
    background-color: #1e1e1e;
  }

  &:focus-visible {
    border-width: 5px;
    &:checked {
      border-color: #fff;
    }
  }
`;
const calculatorSectionInputSendButtonSize = 70;
export const CalculatorSectionInput = styled.input`
  all: unset;
  cursor: auto;

  font-size: 20px;
  padding-right: 3px;
  width: calc(98% - ${calculatorSectionInputSendButtonSize}px);

  &:valid + button,
  &:disabled + button {
    &::before {
      transform: scale(1);
    }
    &::after {
      border-color: transparent;
      transform: scale(0.82);
    }

    transition: box-shadow 0.5s ${easings.easeOutBack};
    ${mobileSafeHoverEffect(`
      &:not(:disabled) {
        box-shadow: 0 0 20px 0 #0005;
      }
    `)}
  }
  &:invalid + button {
    cursor: not-allowed;
  }

  &:disabled {
    cursor: wait;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 60px #fff inset !important;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;
const calculatorSectionInputSendButtonSuccessOutlineSizePercents = 1;
export const CalculatorSectionInputSendButton = styled.button`
  ${reset.button}
  cursor: pointer;

  border-radius: 50%;
  aspect-ratio: 1;
  width: ${calculatorSectionInputSendButtonSize}px;

  z-index: 0;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: -${calculatorSectionInputSendButtonSuccessOutlineSizePercents}%;
    left: -${calculatorSectionInputSendButtonSuccessOutlineSizePercents}%;
    z-index: -1;
    width: ${100 + calculatorSectionInputSendButtonSuccessOutlineSizePercents * 2}%;
    height: ${100 + calculatorSectionInputSendButtonSuccessOutlineSizePercents * 2}%;
    border-radius: inherit;

    background: ${colors.rainbow};
    transform: scale(0);
    transition: transform 0.5s ${easings.easeOutBack} 0.3s;
  }
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    border-radius: inherit;

    background: #fff;
    border: 1px solid black;
    box-sizing: border-box;
    transition: 0.5s ${easings.easeOutBack} 0.3s;
    transition-property: border-color, transform;
  }

  ${sharedCircularButtonSubmittingEffect}
`;
