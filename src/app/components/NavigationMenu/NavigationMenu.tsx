'use client';
import { useRef, useState } from 'react';
import { FaInstagram, FaLinkedinIn, FaTelegram } from 'react-icons/fa';
import {
  NavigationMenuComponentContainer,
  NavigationMenuContactList,
  NavigationMenuContainer,
  NavigationMenuLinksContainer,
  NavigationMenuNav,
  NavigationMenuOuterContainer,
  NavigationMenuPrimaryButton,
  NavigationMenuSocialList,
} from './NavigationMenu.styled';
import Link from 'next/link';
import BurgerIcon from '~/images/burger';
import BackIcon from '~/images/back';
import { IconType } from 'react-icons/lib';
import { useEventListener } from 'usehooks-ts';
import { linkBuilders, newTab } from '~/tools/linkHelpers';
import { ReactStateRecord, ReactStateSetter } from '~/tools/reactTypeHelpers';
import { AboutSection } from '../AboutSection';
import { ContactSection } from '../ContactSection/ContactSection';
import { WorkSection } from '../WorkSection/WorkSection';
import {
  CalculatorSectionImperativeMethods,
  CalculatorSection,
} from '../CalculatorSection/CalculatorSection';
import { ContentSheetParsed } from '~/app/utils/getSheet';

const navigationMenuId = 'primary-navigation';
export function NavigationMenuComponent({
  openedSection,
  setOpenedSection,
  isMenuOpened,
  setIsMenuOpened,
  contentSheet,
}: ReactStateRecord<'openedSection', NavigationSection | undefined> &
  ReactStateRecord<'isMenuOpened', boolean> & { contentSheet: ContentSheetParsed }) {
  /** wasJustClosed is designed to prevent the :hover effects from actuating if the user clicks the close button without moving the cursor in Safari. */
  const [wasJustClosed, setWasJustClosed] = useState(false);

  const calculatorSectionRef = useRef<CalculatorSectionImperativeMethods>(null);

  useEventListener('hashchange', (event) => {
    // Feature: hashchange navigation
    const newUrl = new URL(event.newURL);
    if (newUrl.hash) {
      const hashTextPart = newUrl.hash.slice(1);
      if (!navigationSections.includes(hashTextPart as NavigationSection)) return;
      setOpenedSection(hashTextPart as NavigationSection);
    } else {
      setOpenedSection(undefined);
    }
  });

  useEventListener('keydown', (event) => {
    const code = event.code;
    if (code === 'Space' || code === 'Enter') {
      if (!openedSection) {
        setIsMenuOpened(true);
      }
      return;
    }
    if (code === 'Escape') {
      //#region prevent accidentally closing forms while any input is focused. The subsequent Escape press is allowed to close the form though, to not irritate the user.
      if (
        document.activeElement &&
        document.activeElement !== document.body &&
        'blur' in document.activeElement &&
        typeof document.activeElement.blur === 'function'
      ) {
        document.activeElement.blur();
        return;
      }
      //#endregion
      if (calculatorSectionRef.current?.goStageBack()) return;

      setOpenedSection(undefined);
      window.location.hash = '';
      // This disregards the trailing '#' in the window.location, which looked strange, especially when copied for social purposes. https://stackoverflow.com/a/49373716/11474669
      history.replaceState(null, '', ' '); // Feature: hashchange navigation

      if (!openedSection) {
        setIsMenuOpened(false);
        setWasJustClosed(true);
      }
    }
  });
  const primaryButtonVisibleKeyShortcut = isMenuOpened ? 'Escape' : 'Enter';

  return (
    <NavigationMenuComponentContainer
      workOpened={openedSection === 'work'}
      calcOpened={openedSection === 'calc'}
      contactOpened={openedSection === 'contact'}
      isMenuOpened={isMenuOpened}
      data-is-opened={isMenuOpened}
      data-was-just-closed={wasJustClosed}
      onMouseEnter={() => {
        setWasJustClosed(false);
      }}
      onClick={
        isMenuOpened
          ? undefined
          : () => {
              setIsMenuOpened(true);
            }
      }
    >
      <NavigationMenuPrimaryButton
        aria-label="Menu"
        aria-controls={navigationMenuId}
        aria-expanded={isMenuOpened}
        data-has-opened-section={!!openedSection}
        onClick={() => {
          if (calculatorSectionRef.current?.goStageBack()) return;

          setOpenedSection(undefined);
          window.location.hash = '';
          // This disregards the trailing '#' in the window.location, which looked strange, especially when copied for social purposes. https://stackoverflow.com/a/49373716/11474669
          history.replaceState(null, '', ' '); // Feature: hashchange navigation

          if (!openedSection) {
            setIsMenuOpened((prev) => {
              if (prev) {
                setWasJustClosed(true);
              }
              return !prev;
            });
          }
        }}
        aria-keyshortcuts={primaryButtonVisibleKeyShortcut}
        title={`[${primaryButtonVisibleKeyShortcut}]`}
      >
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <circle cx="25" cy="25" r="24.25" stroke="#fff" strokeWidth="1.5" />
          <BurgerIcon />
          <BackIcon />
        </svg>
      </NavigationMenuPrimaryButton>

      <NavigationMenu
        openedSection={openedSection}
        setOpenedSection={setOpenedSection}
        setIsMenuOpened={setIsMenuOpened}
        calculatorSectionRef={calculatorSectionRef}
        contentSheet={contentSheet}
      />
    </NavigationMenuComponentContainer>
  );
}
function NavigationMenu({
  openedSection,
  setOpenedSection,
  setIsMenuOpened,
  calculatorSectionRef,
  contentSheet,
}: ReactStateRecord<'openedSection', NavigationSection | undefined> & {
  setIsMenuOpened: ReactStateSetter<boolean>;
} & {
  calculatorSectionRef: React.RefObject<CalculatorSectionImperativeMethods>;
} & { contentSheet: ContentSheetParsed }) {
  const iconSizePx = 30;

  const socials: { href: string; Icon: IconType }[] = [
    { href: contentSheet.Socials.Instagram, Icon: FaInstagram },
    { href: contentSheet.Socials.LinkedIn, Icon: FaLinkedinIn },
    { href: contentSheet.Socials.Telegram, Icon: FaTelegram },
  ];

  const sectionTitles: Record<NavigationSection, string> = {
    work: 'our work',
    calc: 'calculate price',
    contact: 'contact us',
    about: 'about us',
  };

  return (
    <NavigationMenuOuterContainer
      onMouseEnter={() => {
        setIsMenuOpened(true);
      }}
    >
      <NavigationMenuContainer
        workOpened={openedSection === 'work'}
        calcOpened={openedSection === 'calc'}
        contactOpened={openedSection === 'contact'}
        id={navigationMenuId}
      >
        {!openedSection && (
          <>
            <NavigationMenuNav
              onFocus={() => {
                // onFocusWithin, actually.
                // This still has a small visual inadequacy, but it's better than the whole page glitch-shifting to show the NavigationMenu without writing anything to state.
                setIsMenuOpened(true);
              }}
            >
              {navigationSections.map((section) => (
                <Link
                  key={section}
                  href={`#${section}`}
                  onClick={() => {
                    setOpenedSection(section);
                    history.pushState(null, '', `#${section}`); // Feature: hashchange navigation
                  }}
                >
                  {sectionTitles[section]}
                </Link>
              ))}
            </NavigationMenuNav>
            <NavigationMenuLinksContainer>
              <NavigationMenuContactList>
                <li>
                  <Link {...linkBuilders.tel(contentSheet.Contacts.Phone)} />
                </li>
                <li>
                  <Link {...linkBuilders.mailto(contentSheet.Contacts.Email)} />
                </li>
              </NavigationMenuContactList>
              <NavigationMenuSocialList>
                {socials.map(({ href, Icon }) => (
                  <Link key={href} href={`https://${href}`} {...newTab}>
                    <Icon size={iconSizePx} />
                  </Link>
                ))}
              </NavigationMenuSocialList>
            </NavigationMenuLinksContainer>
          </>
        )}
        {openedSection === 'work' && <WorkSection />}
        {openedSection === 'calc' && <CalculatorSection ref={calculatorSectionRef} />}
        {openedSection === 'contact' && <ContactSection />}
        {openedSection === 'about' && <AboutSection />}
      </NavigationMenuContainer>
    </NavigationMenuOuterContainer>
  );
}
export const navigationSections = ['work', 'calc', 'contact', 'about'] as const;
export type NavigationSection = (typeof navigationSections)[number];
