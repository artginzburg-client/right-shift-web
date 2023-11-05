'use client';
import { useState } from 'react';
import {
  Heading1,
  HeadingsContainer,
  RotatingWordsInSubheadingContainer,
  Subheading,
  SubheadingSpan,
} from './Headings.styled';
import { useEventListener } from 'usehooks-ts';
import { NavigationSection } from '../../config/navigationSections';

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

  return (
    <HeadingsContainer data-is-menu-opened={isMenuOpened} data-has-opened-section={!!openedSection}>
      <Heading1 style={{ transform: isPressingRightShift ? 'scale(0.7)' : undefined }}>
        right.shift
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
