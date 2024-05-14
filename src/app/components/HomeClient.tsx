'use client';
import { Suspense, useState } from 'react';
import { Main } from '../page.styled';
import { Headings } from './Headings/Headings';
import { NavigationMenuComponent } from './NavigationMenu/NavigationMenu';
import { NavigationSection, navigationSections } from '../config/navigationSections';
import { useOnMounted } from '~/hooks/useOnMounted';
import { ReactStateSetter } from '~/tools/reactTypeHelpers';

import { colors } from '../config/colors';
import Head from 'next/head';
import { DynamicMetaThemeColorTransition } from '../modules/MetaThemeColorToolkit/next/MetaThemeColorWithTransition/dynamic';

export function HomeClient({
  navigationMenuLinksElement,
}: {
  navigationMenuLinksElement: JSX.Element;
}) {
  const [openedSection, setOpenedSection] = useState<NavigationSection>();
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  useFeatureHashRouteToSection(setOpenedSection, setIsMenuOpened);

  // const openedSectionColorMap: Record<NavigationSection, string> = {
  //   work: 'rgb(150, 0, 0)',
  //   calc: 'rgb(151, 133, 0)',
  //   contact: 'rgb(0, 170, 150)',
  //   about: 'rgb(3, 0, 150)',
  // };

  // const lightness = 30;

  const saturation = 80;
  const lightness = 25;

  const rollingColors = [
    colors.background,
    `hsl(0, ${saturation}%, ${lightness}%)`,
    `hsl(57.61194029850746, ${saturation}%, ${lightness * 0.78}%)`,
    `hsl(176.47058823529414, ${saturation}%, ${lightness}%)`,
    `hsl(241.1764705882353, ${saturation}%, ${lightness}%)`,
  ];

  // const openedSectionColorMap: Record<NavigationSection, string> = {
  //   work: `hsl(0, 100%, ${lightness}%)`,
  //   calc: `hsl(90, 100%, ${lightness}%)`,
  //   contact: `hsl(180, 100%, ${lightness}%)`,
  //   about: `hsl(270, 100%, ${lightness}%)`,
  // };

  return (
    <>
      <Suspense>
        <DynamicMetaThemeColorTransition
          colors={rollingColors}
          trigger={openedSection !== undefined}
          transitionDuration={10000}
        />
      </Suspense>
      <Main data-has-opened-section={!!openedSection}>
        <Headings isMenuOpened={isMenuOpened} openedSection={openedSection} />
        <NavigationMenuComponent
          openedSection={openedSection}
          setOpenedSection={setOpenedSection}
          isMenuOpened={isMenuOpened}
          setIsMenuOpened={setIsMenuOpened}
          navigationMenuLinksElement={navigationMenuLinksElement}
        />
      </Main>
    </>
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
