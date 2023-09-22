'use client';
import { useState } from 'react';
import { Main } from '../page.styled';
import { Headings } from './Headings/Headings';
import {
  NavigationSection,
  NavigationMenuComponent,
  navigationSections,
} from './NavigationMenu/NavigationMenu';
import { useOnMounted } from '~/hooks/useOnMounted';
import { ReactStateSetter } from '~/tools/reactTypeHelpers';
import { ContentSheetParsed } from '../utils/getSheet';

export function HomeClient({ contentSheet }: { contentSheet: ContentSheetParsed }) {
  const [openedSection, setOpenedSection] = useState<NavigationSection>();
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  useFeatureHashRouteToSection(setOpenedSection, setIsMenuOpened);

  return (
    <Main data-has-opened-section={!!openedSection}>
      <Headings isMenuOpened={isMenuOpened} openedSection={openedSection} />
      <NavigationMenuComponent
        openedSection={openedSection}
        setOpenedSection={setOpenedSection}
        isMenuOpened={isMenuOpened}
        setIsMenuOpened={setIsMenuOpened}
        contentSheet={contentSheet}
      />
    </Main>
  );
}

function useFeatureHashRouteToSection(
  setOpenedSection: ReactStateSetter<NavigationSection | undefined>,
  setIsMenuOpened: ReactStateSetter<boolean>,
) {
  useOnMounted(() => {
    const hashPart = window.location.hash;
    if (hashPart) {
      const hash = hashPart.slice(1);
      if (navigationSections.includes(hash as NavigationSection)) {
        setOpenedSection(hash as NavigationSection);
        setIsMenuOpened(true);
      } else {
        window.location.hash = '';
      }
    }
  });
}
