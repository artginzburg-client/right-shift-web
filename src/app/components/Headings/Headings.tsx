'use client';
import { useState } from 'react';
import { useEventListener } from 'usehooks-ts';

import { NavigationSection } from '../../config/navigationSections';

import {
  Heading1,
  HeadingsContainer,
  RotatingWordsInSubheadingContainer,
  Subheading,
  SubheadingSpan,
} from './Headings.styled';

export function Headings({
  isMenuOpened,
  openedSection,
}: {
  isMenuOpened: boolean;
  openedSection: NavigationSection | undefined;
}) {
  const [isPressingRightShift, setIsPressingRightShift] = useState(false);
  useEventListener('keydown', (event) => {
    if (event.code === 'ShiftRight') {
      setIsPressingRightShift(true);
    }
  });
  useEventListener('keyup', () => {
    setIsPressingRightShift(false);
  });

  const [isFocused, setIsFocused] = useState(true);
  const [blurredCount, setBlurredCount] = useState(0);
  const blurredCountTextMap: Record<number, string | undefined> = {
    1: 'Wake up, Neo...',
    2: 'The Matrix has you...',
    3: 'Follow the white rabbit.',
    4: 'Knock, knock, Neo.',
  };
  const blurredText = blurredCountTextMap[blurredCount];
  useEventListener(
    'blur',
    () => {
      setIsFocused(false);
      setBlurredCount((prev) => prev + 1);
    },
    undefined,
    true,
  );
  useEventListener(
    'focus',
    () => {
      setIsFocused(true);
    },
    undefined,
    true,
  );

  return (
    <HeadingsContainer data-is-menu-opened={isMenuOpened} data-has-opened-section={!!openedSection}>
      <Heading1 style={{ transform: isPressingRightShift ? 'scale(0.7)' : undefined }}>
        {isFocused ? 'right.shift' : blurredText}
      </Heading1>
      <Subheading>
        digital products <RotatingWordInSubheading /> <SubheadingSpan>for you</SubheadingSpan>
      </Subheading>
    </HeadingsContainer>
  );
}

function RotatingWordInSubheading() {
  const words = ['tailored', 'crafted', 'tuned'];

  return (
    <RotatingWordsInSubheadingContainer>
      {words.map((word) => (
        <span key={word}>{word}</span>
      ))}
    </RotatingWordsInSubheadingContainer>
  );
}
