'use client';
import { StaticImageData } from 'next/image';
import { useState } from 'react';
import { FaInstagram, FaLinkedinIn, FaTelegram } from 'react-icons/fa';
import {
  ArrowButtonElement,
  CalculatorSectionContainer,
  CalculatorSectionDesiredOptionCheckbox,
  CalculatorSectionDesiredOptionLabel,
  CalculatorSectionDesiredOptions,
  CalculatorSectionHeading,
  CalculatorSectionRegularText,
  CircleButtonElement,
  CircleButtonsContainer,
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
  RotatingWordsInSubheadingContainer,
  Subheading,
  SubheadingSpan,
  WorkSectionContainer,
  WorkSectionImage,
  WorkSectionImageContainer,
  WorkSectionNextIcon,
} from './page.styled';
import Link from 'next/link';

import schoolMapImage from '~/images/work/school-map.png';
import nfoTokenImage from '~/images/work/nfo-token.png';
import kryshiIVysheImage from '~/images/work/kryshi-i-vyshe.png';
import stackImage from '~/images/work/stack.png';
import BurgerIcon from '~/images/burger';
import BackIcon from '~/images/back';
import nextIconSrc from '~/images/next.svg';
import { IconType } from 'react-icons/lib';
import { useEventListener } from 'usehooks-ts';
import { useOnMounted } from '~/hooks/useOnMounted';
import { linkBuilders, newTab } from '~/tools/linkHelpers';

const navigationSections = ['work', 'calc', 'contact', 'about'] as const;
type NavigationSection = (typeof navigationSections)[number];

export default function Home() {
  const [openedSection, setOpenedSection] = useState<NavigationSection>();
  const [isMenuOpened, setIsMenuOpened] = useState(false);

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
    <Main data-has-opened-section={!!openedSection}>
      <HeadingsContainer data-has-opened-section={!!openedSection}>
        <Heading1 style={{ transform: isPressingRightShift ? 'scale(0.7)' : undefined }}>
          right.shift
        </Heading1>
        <Subheading>
          digital products <RotatingWordInSubheading /> <SubheadingSpan>for you</SubheadingSpan>
        </Subheading>
      </HeadingsContainer>
      <NavigationMenuComponent
        openedSection={openedSection}
        setOpenedSection={setOpenedSection}
        isMenuOpened={isMenuOpened}
        setIsMenuOpened={setIsMenuOpened}
      />
    </Main>
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

const navigationMenuId = 'primary-navigation';

function NavigationMenuComponent({
  openedSection,
  setOpenedSection,

  isMenuOpened,
  setIsMenuOpened,
}: {
  openedSection: NavigationSection | undefined;
  setOpenedSection: React.Dispatch<React.SetStateAction<NavigationSection | undefined>>;

  isMenuOpened: boolean;
  setIsMenuOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  /** wasJustClosed is designed to prevent the :hover effects from actuating if the user clicks the close button without moving the cursor in Safari. */
  const [wasJustClosed, setWasJustClosed] = useState(false);

  useEventListener('keydown', (event) => {
    const code = event.code;
    if (code === 'Space' || code === 'Enter') {
      if (!openedSection) {
        setIsMenuOpened(true);
      }
      return;
    }
    if (code === 'Escape') {
      setOpenedSection(undefined);
      window.location.hash = '';
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
          setOpenedSection(undefined);
          window.location.hash = '';
          if (!openedSection) {
            setIsMenuOpened((prev) => {
              if (prev) {
                setWasJustClosed(true);
              }
              return !prev;
            });
          }
        }}
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
      <NavigationMenuContainer
        workOpened={openedSection === 'work'}
        calcOpened={openedSection === 'calc'}
        id={navigationMenuId}
      >
        {!openedSection && (
          <>
            <NavigationMenuNav>
              <Link
                href="#work"
                onClick={() => {
                  setOpenedSection('work');
                }}
              >
                our work
              </Link>
              <Link
                href="#calc"
                onClick={() => {
                  setOpenedSection('calc');
                }}
              >
                calculate price
              </Link>
              <Link href="#contact">contact us</Link>
              <Link href="#about">about us</Link>
            </NavigationMenuNav>
            <NavigationMenuLinksContainer>
              <NavigationMenuContactList>
                <li>
                  <Link {...linkBuilders.tel('+972 54 777 7777')} />
                </li>
                <li>
                  <Link {...linkBuilders.mailto('right.shift@gmail.com')} />
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
        {openedSection === 'calc' && <CalculatorSection />}
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
        <WorkSectionImageContainer key={title} href={aHref} {...newTab}>
          <WorkSectionImage src={imgSrc} alt={title} loading="lazy" />
          <WorkSectionNextIcon src={nextIconSrc} alt="Next" />
        </WorkSectionImageContainer>
      ))}
    </WorkSectionContainer>
  );
}

function CalculatorSection() {
  const [stage, setStage] = useState(0);
  function nextStage() {
    setStage((prev) => prev + 1);
  }

  const [answers, setAnswers] = useState<(string | boolean | string[])[]>([]);
  function addAnswer(answer: (typeof answers)[number]) {
    setAnswers((prev) => [...prev, answer]);
  }

  const possibleDesiredOptions = [
    'The first screen (banner)',
    'Your cases / examples of work',
    'FAQ',

    'Catalog of services',
    'Advantages',
    'Subscribe to the newsletter',

    'Your achievements and merits',
    'Table with competitors',
    'A block with a gift / promo code',

    'Employees',
    'Location (maps)',
    'Partners',

    'Contact information',
    'Video Gallery',
    'Photo Gallery',
  ];

  const generateAnswers = {
    string(possibleAnswers: string[]) {
      return possibleAnswers.map((possibleAnswer) => (
        <ArrowButton
          key={possibleAnswer}
          onClick={() => {
            addAnswer(possibleAnswer);
            nextStage();
          }}
        >
          {possibleAnswer}
        </ArrowButton>
      ));
    },
    boolean() {
      return (
        <CircleButtonsContainer>
          <CircleButton
            onClick={() => {
              addAnswer(true);
              nextStage();
            }}
          >
            Yes
          </CircleButton>
          <CircleButton
            onClick={() => {
              addAnswer(false);
              nextStage();
            }}
          >
            No
          </CircleButton>
        </CircleButtonsContainer>
      );
    },
  };

  return (
    <CalculatorSectionContainer>
      {stage === 0 && (
        <>
          <CalculatorSectionRegularText>
            {"Hey, we're the"} <span>right.shift</span>{' '}
            {`team. We've created a project cost calculator just for you. Give it a try to get an idea of the cost approximation for your project. If you'd like an accurate estimate, please provide your contact details at the end of the cost calculation, and we'll send you a precise quote in no time. We appreciate your trust in us!`}
          </CalculatorSectionRegularText>
          <ArrowButton onClick={nextStage}>{"Let's get started"}</ArrowButton>
        </>
      )}
      {stage === 1 && (
        <>
          <CalculatorSectionHeading>What do you need to develop?</CalculatorSectionHeading>
          {generateAnswers.string(['Landing page', 'Website CMS', 'Application'])}
        </>
      )}
      {stage === 2 && (
        <>
          <CalculatorSectionHeading>What about design?</CalculatorSectionHeading>
          {generateAnswers.string(['Basic', 'Standard', 'Advanced'])}
        </>
      )}
      {stage === 3 && (
        <>
          <CalculatorSectionHeading>
            Do you need integration with third-party services / API?
          </CalculatorSectionHeading>
          {generateAnswers.boolean()}
        </>
      )}
      {stage === 4 && (
        <>
          <CalculatorSectionHeading>
            Do you have media materials? (photos, videos, illustrations, infographics, etc.)
          </CalculatorSectionHeading>
          {generateAnswers.boolean()}
        </>
      )}
      {stage === 5 && (
        <>
          <CalculatorSectionHeading>Select the desired options</CalculatorSectionHeading>
          <form
            style={{ display: 'contents' }}
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const selectedOptions = formData.getAll('desired-option') as string[];
              addAnswer(selectedOptions);
              nextStage();
            }}
          >
            <CalculatorSectionDesiredOptions>
              {possibleDesiredOptions.map((option) => (
                <CalculatorSectionDesiredOptionLabel key={option}>
                  <CalculatorSectionDesiredOptionCheckbox
                    type="checkbox"
                    name="desired-option"
                    value={option}
                  />
                  {option}
                </CalculatorSectionDesiredOptionLabel>
              ))}
            </CalculatorSectionDesiredOptions>
            <ArrowButton type="submit">Calculate</ArrowButton>
          </form>
        </>
      )}
    </CalculatorSectionContainer>
  );
}

function ArrowButton({ children, ...props }: JSX.IntrinsicElements['button']) {
  return (
    <ArrowButtonElement type="button" {...props}>
      {children}
      <ArrowRightIcon />
    </ArrowButtonElement>
  );
}

function ArrowRightIcon() {
  const stroke = '#1e1e1e';
  const strokeWidth = 1.9;

  const width = 34;
  const height = 16;
  const x2 = width - 1;
  const y2 = height / 2;

  const flipperSize = 6.5;
  const flippersX1 = x2 - flipperSize;
  const upperFlipperY1 = y2 - flipperSize;
  const lowerFlipperY1 = y2 + flipperSize;

  const sharedLineProps: JSX.IntrinsicElements['line'] = {
    stroke,
    strokeWidth,
    strokeLinecap: 'round',
    x2,
    y2,
  };

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ marginLeft: 15 }}
    >
      <line x1={0} y1={y2} {...sharedLineProps} />
      <line x1={flippersX1} y1={upperFlipperY1} {...sharedLineProps} />
      <line x1={flippersX1} y1={lowerFlipperY1} {...sharedLineProps} />
    </svg>
  );
}

function CircleButton({ children, ...props }: JSX.IntrinsicElements['button']) {
  return (
    <CircleButtonElement type="button" {...props}>
      {children}
    </CircleButtonElement>
  );
}
