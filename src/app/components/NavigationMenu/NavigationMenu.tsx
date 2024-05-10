'use client';
import { useRef, useState } from 'react';
import {
  NavigationMenuComponentContainer,
  NavigationMenuContainer,
  NavigationMenuNav,
  NavigationMenuOuterContainer,
  NavigationMenuPrimaryButton,
} from './NavigationMenu.styled';
import Link from 'next/link';
import BurgerIcon from '~/images/burger';
import BackIcon from '~/images/back';
import { useEventListener } from 'usehooks-ts';
import { ReactStateRecord, ReactStateSetter } from '~/tools/reactTypeHelpers';
import { AboutSection } from '../AboutSection';
import { ContactSection } from '../ContactSection/ContactSection';
import { WorkSection } from '../WorkSection/WorkSection';
import {
  CalculatorSectionImperativeMethods,
  CalculatorSection,
} from '../CalculatorSection/CalculatorSection';
import { buildCssTransform } from '~/tools/buildCssTransform';
import { getIsTouchScreenDevice } from '~/tools/isTouchScreenDevice';
import { NavigationSection, navigationSections } from '../../config/navigationSections';
import gsap from 'gsap';

const navigationMenuId = 'primary-navigation';
export function NavigationMenuComponent({
  openedSection,
  setOpenedSection,
  isMenuOpened,
  setIsMenuOpened,
  navigationMenuLinksElement,
}: ReactStateRecord<'openedSection', NavigationSection | undefined> &
  ReactStateRecord<'isMenuOpened', boolean> & { navigationMenuLinksElement: JSX.Element }) {
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
      <NavigationMenuPrimaryButtonComponent
        openedSection={openedSection}
        setOpenedSection={setOpenedSection}
        isMenuOpened={isMenuOpened}
        setIsMenuOpened={setIsMenuOpened}
        calculatorSectionRef={calculatorSectionRef}
        setWasJustClosed={setWasJustClosed}
      />

      <NavigationMenu
        openedSection={openedSection}
        setOpenedSection={setOpenedSection}
        setIsMenuOpened={setIsMenuOpened}
        calculatorSectionRef={calculatorSectionRef}
        navigationMenuLinksElement={navigationMenuLinksElement}
      />
    </NavigationMenuComponentContainer>
  );
}

/** Excluded to isolate re-renders due to frequently changing state */
function NavigationMenuPrimaryButtonComponent({
  openedSection,
  setOpenedSection,
  isMenuOpened,
  setIsMenuOpened,
  calculatorSectionRef,
  setWasJustClosed,
}: ReactStateRecord<'openedSection', NavigationSection | undefined> &
  ReactStateRecord<'isMenuOpened', boolean> & {
    calculatorSectionRef: React.RefObject<CalculatorSectionImperativeMethods>;
  } & { setWasJustClosed: ReactStateSetter<boolean> }) {
  //#region Feature: NavigationMenuPrimaryButton turn icon to dot
  const [isDot, setIsDot] = useState(false);
  useEventListener(
    'mouseover',
    (event) => {
      const target = event.target as HTMLElement;
      const actualTarget =
        target.tagName === 'path' || target.tagName === 'line' || target.tagName === 'circle'
          ? target.closest('svg')?.parentElement!
          : target.tagName === 'SPAN' || target.tagName === 'svg' || target.tagName === 'IMG'
            ? target.parentElement!
            : target;
      setIsDot(
        actualTarget.className === NavigationMenuPrimaryButton.__linaria.className
          ? false
          : ['A', 'BUTTON'].some((value) => actualTarget.tagName === value),
      );
    },
    undefined,
    { passive: true },
  );
  useEventListener(
    'click',
    () => {
      setIsDot(false);
    },
    undefined,
    { passive: true },
  );
  //#endregion

  const primaryButtonVisibleKeyShortcut = isMenuOpened ? 'Escape' : 'Enter';

  return (
    <NavigationMenuPrimaryButton
      aria-label="Menu"
      aria-controls={navigationMenuId}
      aria-expanded={isMenuOpened}
      data-has-opened-section={!!openedSection}
      data-is-dot={isDot}
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
  );
}

function NavigationMenu({
  openedSection,
  setOpenedSection,
  setIsMenuOpened,
  calculatorSectionRef,
  navigationMenuLinksElement,
}: ReactStateRecord<'openedSection', NavigationSection | undefined> & {
  setIsMenuOpened: ReactStateSetter<boolean>;
} & {
  calculatorSectionRef: React.RefObject<CalculatorSectionImperativeMethods>;
} & { navigationMenuLinksElement: JSX.Element }) {
  const sectionTitles: Record<NavigationSection, string> = {
    work: 'our work',
    calc: 'calculate price',
    contact: 'contact us',
    about: 'about us',
  };

  const isTouchScreenDevice = getIsTouchScreenDevice();
  const animationProps: Pick<
    Parameters<typeof NavigationMenuContainer>[0],
    'onMouseMove' | 'onMouseDown' | 'onMouseLeave'
  > = {
    onMouseMove(event) {
      if (isTouchScreenDevice) return;

      const element = event.currentTarget;
      const elementPos = element.getBoundingClientRect();

      const mousePositionOnElement = {
        x: event.clientX - elementPos.left,
        y: event.clientY - elementPos.top,
      };
      const elementCenter = {
        x: elementPos.width / 2,
        y: elementPos.height / 2,
      };
      const mousePositionFromCenter = {
        x: elementCenter.x - mousePositionOnElement.x,
        y: elementCenter.y - mousePositionOnElement.y,
      };

      const delta = 80;
      const timeline = gsap.timeline();

      const absoluteDistanceFromCenter =
        Math.abs(mousePositionFromCenter.x) + Math.abs(mousePositionFromCenter.y);

      timeline.to(element, {
        duration: 4 + absoluteDistanceFromCenter * 0.01,
        rotationX: `${mousePositionFromCenter.y / delta}deg`,
        rotationY: `${-mousePositionFromCenter.x / delta}deg`,
        x: `${(-mousePositionFromCenter.x / delta) * 4}px`,
        y: `${(-mousePositionFromCenter.y / delta) * 4}px`,
        rotationZ: `${mousePositionFromCenter.x / delta / 2}deg`,

        ease: 'power3',
      });
    },
    onMouseDown(event) {
      const timeline = gsap.timeline();

      const element = event.currentTarget;
      gsap.killTweensOf(element);
      timeline.to(element, {
        duration: 0.25,
        scale: 0.985,
      });

      setTimeout(() => {
        timeline.duration(0.5);
        timeline.reverse();
      }, 300);
    },
    onMouseLeave(event) {
      if (isTouchScreenDevice) return;

      const timeline = gsap.timeline();

      const element = event.currentTarget;
      gsap.killTweensOf(element);
      timeline.to(element, {
        duration: 1,
        scaleX: 1,
        scaleY: 1,
        transform: 'none',
      });
    },
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
        {...animationProps}
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
                  <span>{sectionTitles[section]}</span>
                </Link>
              ))}
            </NavigationMenuNav>
            {navigationMenuLinksElement}
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
