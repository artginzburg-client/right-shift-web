'use client';
import Image, { StaticImageData } from 'next/image';
import { useState } from 'react';
import { FaInstagram, FaLinkedinIn, FaTelegram } from 'react-icons/fa';
import {
  Heading1,
  HeadingsContainer,
  Main,
  NavigationMenuComponentContainer,
  NavigationMenuContactList,
  NavigationMenuContainer,
  NavigationMenuLinksContainer,
  NavigationMenuNav,
  NavigationMenuOuterContainer,
  NavigationMenuPrimaryButton,
  NavigationMenuSocialList,
  Subheading,
  SubheadingSpan,
  WorkSectionContainer,
  WorkSectionImage,
  WorkSectionImageContainer,
  WorkSectionNextIcon,
} from './page.styled';
// import Burger from '../images/burger.svg';
import Link from 'next/link';

import schoolMapImage from '~/images/work/school-map.png';
import nfoTokenImage from '~/images/work/nfo-token.png';
import kryshiIVysheImage from '~/images/work/kryshi-i-vyshe.png';
import stackImage from '~/images/work/stack.png';
import BurgerIcon from '~/images/burger';
import BackIcon from '~/images/back';
import nextIconSrc from '~/images/next.svg';
import { IconType } from 'react-icons/lib';

export default function Home() {
  const [openedSection, setOpenedSection] = useState<NavigationSection>();

  return (
    <Main data-has-opened-section={!!openedSection}>
      <HeadingsContainer data-has-opened-section={!!openedSection}>
        <Heading1>right.shift</Heading1>
        <Subheading>
          digital products tailored <SubheadingSpan>for you</SubheadingSpan>
        </Subheading>
      </HeadingsContainer>
      <NavigationMenuComponent openedSection={openedSection} setOpenedSection={setOpenedSection} />
    </Main>
  );
}

const navigationMenuId = 'primary-navigation';
type NavigationSection = 'work' | 'calc' | 'contact' | 'about';

function NavigationMenuComponent({
  openedSection,
  setOpenedSection,
}: {
  openedSection: NavigationSection | undefined;
  setOpenedSection: React.Dispatch<React.SetStateAction<NavigationSection | undefined>>;
}) {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  /** wasJustClosed is designed to prevent the :hover effects from actuating if the user clicks the close button without moving the cursor in Safari. */
  const [wasJustClosed, setWasJustClosed] = useState(false);

  return (
    <NavigationMenuComponentContainer
      workOpened={openedSection === 'work'}
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
      >
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => {
            setOpenedSection(undefined);
            if (!openedSection) {
              setIsMenuOpened((prev) => {
                if (prev) {
                  setWasJustClosed(true);
                }
                return !prev;
              });
            }
          }}
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
      />
    </NavigationMenuComponentContainer>
  );
}

function NavigationMenu({
  openedSection,
  setOpenedSection,

  setIsMenuOpened,
}: {
  openedSection: NavigationSection | undefined;
  setOpenedSection: React.Dispatch<React.SetStateAction<NavigationSection | undefined>>;

  setIsMenuOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const iconSizePx = 30;

  const phone = '+972 54 777 7777';

  const socials: { href: string; Icon: IconType }[] = [
    { href: 'instagram.com', Icon: FaInstagram },
    { href: 'linkedin.com', Icon: FaLinkedinIn },
    { href: 't.me', Icon: FaTelegram },
  ];

  return (
    <NavigationMenuOuterContainer
      onMouseEnter={() => {
        setIsMenuOpened(true);
      }}
    >
      <NavigationMenuContainer workOpened={openedSection === 'work'} id={navigationMenuId}>
        {!openedSection && (
          <>
            <NavigationMenuNav>
              <Link
                href="/work"
                onClick={(event) => {
                  event.preventDefault();
                  setOpenedSection('work');
                }}
              >
                our work
              </Link>
              <Link href="/calc">calculate price</Link>
              <Link href="/contact">contact us</Link>
              <Link href="/about">about us</Link>
            </NavigationMenuNav>
            <NavigationMenuLinksContainer>
              <NavigationMenuContactList>
                <li>
                  <Link href={`tel:${phone}`}>{phone}</Link>
                </li>
                <li>
                  <Link href="mailto:right.shift@gmail.com">right.shift@gmail.com</Link>
                </li>
              </NavigationMenuContactList>
              <NavigationMenuSocialList>
                {socials.map(({ href, Icon }) => (
                  <Link key={href} href={`https://${href}`} target="_blank" rel="noreferrer">
                    <Icon size={iconSizePx} />
                  </Link>
                ))}
              </NavigationMenuSocialList>
            </NavigationMenuLinksContainer>
          </>
        )}
        {openedSection === 'work' && <WorkSection />}
      </NavigationMenuContainer>
    </NavigationMenuOuterContainer>
  );
}

function WorkSection() {
  const works: { imgSrc: string | StaticImageData; aHref: string; title: string }[] = [
    {
      imgSrc: nfoTokenImage,
      aHref: 'https://nfotoken.com',
      title: 'NFO Token',
    },
    {
      imgSrc: schoolMapImage,
      aHref: 'https://ginzburg.art/CASProject/',
      title: 'School Map',
    },
    {
      imgSrc: stackImage,
      aHref: 'https://stack.ginzburg.art',
      title: 'stack',
    },
    {
      imgSrc: kryshiIVysheImage,
      aHref: 'https://concerts.kryshi-i-vyshe.ru',
      title: 'Kryshe i Vyshe',
    },
  ];
  return (
    <WorkSectionContainer>
      {works.map(({ imgSrc, aHref, title }) => (
        <WorkSectionImageContainer key={title} href={aHref} target="_blank" rel="noreferrer">
          <WorkSectionImage src={imgSrc} alt={title} />
          <WorkSectionNextIcon src={nextIconSrc} alt="Next" />
        </WorkSectionImageContainer>
      ))}
    </WorkSectionContainer>
  );
}
