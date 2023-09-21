'use client';
import { useState } from 'react';
import { Main } from './page.styled';

import { useOnMounted } from '~/hooks/useOnMounted';
import {
  NavigationSection,
  navigationSections,
  NavigationMenuComponent,
} from './components/NavigationMenu/NavigationMenu';
import { Headings } from './components/Headings/Headings';
import { ReactStateSetter } from '~/tools/reactTypeHelpers';

export default function Home() {
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
