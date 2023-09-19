'use client';
import { StaticImageData } from 'next/image';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { FaInstagram, FaLinkedinIn, FaTelegram } from 'react-icons/fa';
import {
  ArrowButtonElement,
  ArrowButtonElementStickyOnSmallHeight,
  CalculatorSectionArrowButtonsContainer,
  CalculatorSectionContainer,
  CalculatorSectionCopyright,
  CalculatorSectionDesiredOptionCheckbox,
  CalculatorSectionDesiredOptionLabel,
  CalculatorSectionDesiredOptions,
  CalculatorSectionHeading,
  CalculatorSectionInput,
  CalculatorSectionInputSendButton,
  CalculatorSectionRegularText,
  CalculatorSectionSeparator,
  CircleButtonElement,
  CircleButtonsContainer,
  ContactSectionForm,
  ContactSectionInput,
  ContactSectionSendingInputContainer,
  ContactSectionTextarea,
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
import { useDelayedAutofocus } from '~/hooks/useDelayedAutofocus';
import { ReactStateRecord, ReactStateSetter } from '~/tools/reactTypeHelpers';
import { usePreventClosingWindowWhileSending } from '~/hooks/usePreventClosingWindowWhileSending';

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
      <HeadingsContainer
        data-is-menu-opened={isMenuOpened}
        data-has-opened-section={!!openedSection}
      >
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

interface CalculatorSectionImperativeMethods {
  /** @returns whether to prevent closing the NavigationMenu. */
  goStageBack: () => true | undefined;
}

/**
 * @todo don't rerender on send — or in simple words, just don't clear the email in case the request fails and the user has to send again.
 * @todo Error Handling
 */
const CalculatorSection = forwardRef<CalculatorSectionImperativeMethods>((props, ref) => {
  const [calcStage, setCalcStage] = useState(0);

  const devOnlyDebuggers = {
    shouldFakePromise: false,
    shouldDisplayRetryButton: false,
  };

  function nextStage() {
    setCalcStage((prev) => prev + 1);
  }

  const [answers, setAnswers] = useState<(string | boolean | string[])[]>([]);
  function addAnswer(answer: (typeof answers)[number]) {
    setAnswers((prev) => [...prev, answer]);
  }

  const [calculatedCost, setCalculatedCost] = useState<number>();

  const [isSendingAnswers, setIsSendingAnswers] = useState(false);
  usePreventClosingWindowWhileSending(isSendingAnswers);
  async function sendAnswers(email: string) {
    const newCost = approximateCost();
    setCalculatedCost(newCost);
    setIsSendingAnswers(true);

    if (devOnlyDebuggers.shouldFakePromise) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          setIsSendingAnswers(false);
          resolve(true);
        }, 4000);
      });
    }

    const result = await fetch(`${window.location.origin}/api/calculator`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        answers,
        cost: newCost,
      }),
    });
    setIsSendingAnswers(false);
    return result;
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
      return (
        <CalculatorSectionArrowButtonsContainer>
          {possibleAnswers.map((possibleAnswer, possibleAnswerIndex, arr) => (
            <>
              <ArrowButton
                key={possibleAnswer}
                onClick={() => {
                  addAnswer(possibleAnswer);
                  nextStage();
                }}
              >
                {possibleAnswer}
              </ArrowButton>
              {possibleAnswerIndex !== arr.length - 1 && <CalculatorSectionSeparator />}
            </>
          ))}
        </CalculatorSectionArrowButtonsContainer>
      );
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

  type QuestionSlug = 'subject' | 'design' | 'integrations' | 'options';

  const questions: Record<
    QuestionSlug,
    {
      type: 'string' | 'boolean' | 'stringArray';
      title: string;
      choice?: string[];
      generator: (typeof generateAnswers)['boolean' | 'string'];
    }
  > = {
    subject: {
      type: 'string',
      title: 'What do you need to develop?',
      choice: ['Landing page', 'Website CMS', 'Application'],
      generator: generateAnswers.string,
    },
    design: {
      type: 'string',
      title: 'What about design?',
      choice: ['Basic', 'Standard', 'Advanced'],
      generator: generateAnswers.string,
    },
    integrations: {
      type: 'boolean',
      title: 'Do you need integration with third-party services / API?',
      generator: generateAnswers.boolean,
    },
    options: {
      type: 'stringArray',
      title: 'Select the desired options',
      generator: () => {
        const optionName = 'desired-option';
        return (
          <form
            style={{ display: 'contents' }}
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const selectedOptions = formData.getAll(optionName) as string[];
              addAnswer(selectedOptions);
              nextStage();
            }}
          >
            <CalculatorSectionDesiredOptions>
              {possibleDesiredOptions.map((option) => (
                <CalculatorSectionDesiredOptionLabel key={option}>
                  <CalculatorSectionDesiredOptionCheckbox
                    type="checkbox"
                    name={optionName}
                    value={option}
                  />
                  {option}
                </CalculatorSectionDesiredOptionLabel>
              ))}
            </CalculatorSectionDesiredOptions>
            <ArrowButton Element={ArrowButtonElementStickyOnSmallHeight} type="submit">
              Calculate
            </ArrowButton>
          </form>
        );
      },
    },
  };

  //#region If I'm going to implement this, it better be across the whole app, not just here.
  // useEventListener('keydown', (event) => {
  //   if (stage === 0 && event.code === 'Enter') {
  //     nextStage();
  //     return;
  //   }

  //   //#region future functionality for answering questions with a keyboard even faster than with Tab-navigation. Probably, not going to be used like that – I want to first focus the answer visually on keydown, and only addAnswer() on keyup, with an ability for the user to press Escape while he's holding the digit to cancel. Also, add Y/N for boolean answers.
  //   // if ([1, 2, 3].includes(stage) && event.code.startsWith('Digit')) {
  //   //   console.log('select');
  //   //   const digit = Number(event.code.replace('Digit', ''));
  //   //   if (digit > 3 || digit < 1) return;
  //   //   /** Remove this const later, it's hacky and inefficient. */
  //   //   const stageIndexToName: QuestionSlug[] = ['subject', 'design', 'integrations', 'options'];
  //   //   const currentStageName = stageIndexToName[stage - 1];
  //   //   const currentQuestion = questions[currentStageName];
  //   //   if (currentQuestion.choice) {
  //   //     addAnswer(currentQuestion.choice[digit - 1]);
  //   //   } else {
  //   //     if (digit === 3) return;
  //   //     addAnswer(digit === 1 ? true : false);
  //   //   }
  //   //   nextStage();
  //   // }
  //   //#endregion
  // });
  //#endregion

  function approximateCost() {
    const costOfHour = 30;
    const hourWeights = {
      subject: [10, 40, 100],
      design: [10, 30, 50],
      /** 0 = No, int = Yes */
      integrations: 20,
      /** Each options weight */
      options: 2,
    };

    const answersObject = {
      subject: answers[0],
      design: answers[1],
      integrations: answers[2],
      options: answers[3],
    };

    const hourWeightOfAnswers = Object.entries(questions).map(([questionName, question]) => {
      const questionAnswerRaw = answersObject[questionName as keyof typeof answersObject];
      const hourWeightOfQuestion = hourWeights[questionName as keyof typeof answersObject];
      const answerIndex = question.choice?.findIndex(
        (choiceOption) => choiceOption === questionAnswerRaw,
      );
      const hourWeightOfAnswer =
        question.type === 'boolean'
          ? questionAnswerRaw
            ? hourWeightOfQuestion
            : 0
          : question.type === 'string'
          ? (hourWeightOfQuestion as number[])[answerIndex!]
          : (questionAnswerRaw as string[]).length * (hourWeightOfQuestion as number);

      return hourWeightOfAnswer as number;
    });

    const totalHours = hourWeightOfAnswers.reduce((prev, cur) => prev + cur, 0);
    const totalCost = costOfHour * totalHours;

    return totalCost;
  }

  const stages: React.FC[] = [
    () => (
      <>
        <CalculatorSectionRegularText>
          {"Hey, we're the"} <span>right.shift</span>{' '}
          {`team. We've created a project cost calculator just for you. Give it a try to get an idea of the cost approximation for your project. If you'd like an accurate estimate, please provide your contact details at the end of the cost calculation, and we'll send you a precise quote in no time. We appreciate your trust in us!`}
        </CalculatorSectionRegularText>
        <ArrowButton Element={ArrowButtonElementStickyOnSmallHeight} onClick={nextStage}>
          {"Let's get started"}
        </ArrowButton>
      </>
    ),
    ...Object.values(questions).map(
      (question) =>
        function QuestionComponent() {
          return (
            <>
              <CalculatorSectionHeading>{question.title}</CalculatorSectionHeading>
              {question.generator(question.choice!)}
            </>
          );
        },
    ),
    () => (
      <>
        <CalculatorSectionHeading>{`The e-mail to reach out to`}</CalculatorSectionHeading>
        <CalculatorSectionRegularText>
          {`We're human, we don't spam :)`}
        </CalculatorSectionRegularText>
        <form
          style={{ display: 'contents' }}
          onSubmit={async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const email = formData.get('email') as string;
            await sendAnswers(email);
            nextStage();
          }}
        >
          <label style={{ width: '100%' }}>
            <CalculatorSectionInput
              disabled={isSendingAnswers}
              type="email"
              name="email"
              placeholder="Your e-mail"
              required
              autoFocus
            />
            <CalculatorSectionInputSendButton
              disabled={isSendingAnswers}
              type="submit"
              className={isSendingAnswers ? 'submitting' : undefined}
            >
              <ArrowRightIcon />
            </CalculatorSectionInputSendButton>
          </label>
        </form>
      </>
    ),
    () => (
      <>
        <CalculatorSectionHeading>{`Thanks!`}</CalculatorSectionHeading>
        <CalculatorSectionRegularText>
          The estimated cost of your project is ${calculatedCost}
        </CalculatorSectionRegularText>
        <CalculatorSectionRegularText>{`We'll be in touch`}</CalculatorSectionRegularText>
        {devOnlyDebuggers.shouldDisplayRetryButton && (
          <button
            onClick={() => {
              sendAnswers('Sent for debugging purposes');
            }}
          >
            Dev-only retry
          </button>
        )}
      </>
    ),
  ];
  useImperativeHandle(
    ref,
    () =>
      ({
        goStageBack() {
          if (calcStage === stages.length - 1) return;

          if (calcStage !== 0) {
            setCalcStage((prev) => prev - 1);
            setAnswers((prev) => prev.slice(0, -1));
            return true;
          }
        },
      } as CalculatorSectionImperativeMethods),
  );

  const CurrentStage = stages[calcStage];

  return (
    <CalculatorSectionContainer
      style={{
        cursor: isSendingAnswers ? 'wait' : undefined,
        position: 'relative', // for the copyright
      }}
    >
      <CurrentStage />
      {calcStage !== 0 && calcStage < stages.length - 2 && (
        <CalculatorSectionCopyright>
          <span>ⓒ</span> right.shift
        </CalculatorSectionCopyright>
      )}
    </CalculatorSectionContainer>
  );
});
CalculatorSection.displayName = 'CalculatorSection';

const navigationMenuId = 'primary-navigation';

function NavigationMenuComponent({
  openedSection,
  setOpenedSection,

  isMenuOpened,
  setIsMenuOpened,
}: ReactStateRecord<'openedSection', NavigationSection | undefined> &
  ReactStateRecord<'isMenuOpened', boolean>) {
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
      />
    </NavigationMenuComponentContainer>
  );
}

function NavigationMenu({
  openedSection,
  setOpenedSection,

  setIsMenuOpened,

  calculatorSectionRef,
}: ReactStateRecord<'openedSection', NavigationSection | undefined> & {
  setIsMenuOpened: ReactStateSetter<boolean>;
} & {
  calculatorSectionRef: React.RefObject<CalculatorSectionImperativeMethods>;
}) {
  const iconSizePx = 30;

  const socials: { href: string; Icon: IconType }[] = [
    { href: 'www.instagram.com/art.ginzburg/', Icon: FaInstagram },
    { href: 'www.linkedin.com/company/right-shift-dev', Icon: FaLinkedinIn },
    { href: 't.me/ginzart', Icon: FaTelegram },
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
                  <Link {...linkBuilders.tel('+31 6 45 10 65 69')} />
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
        {openedSection === 'calc' && <CalculatorSection ref={calculatorSectionRef} />}
        {openedSection === 'contact' && <ContactSection />}
        {openedSection === 'about' && <AboutSection />}
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

function ArrowButton({
  children,
  Element = ArrowButtonElement,
  ...props
}: JSX.IntrinsicElements['button'] & { Element?: React.FC<JSX.IntrinsicElements['button']> }) {
  return (
    <Element type="button" {...props}>
      {children}
      <ArrowRightIcon style={{ marginLeft: 15 }} />
    </Element>
  );
}

function ArrowRightIcon(props: JSX.IntrinsicElements['svg']) {
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
      {...props}
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

/** @todo Error Handling */
function ContactSection() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [isSuccess, setIsSuccess] = useState(false);

  const [isSending, setIsSending] = useState(false);
  usePreventClosingWindowWhileSending(isSending);
  async function sendContactForm(contact: string, text: string) {
    setIsSending(true);
    try {
      const result = await fetch(`${window.location.origin}/api/contact`, {
        method: 'POST',
        body: JSON.stringify({
          contact,
          text,
        }),
      });
      if (!result.ok) {
        return;
      }
      setIsSuccess(true);
      return result;
    } finally {
      setIsSending(false);
    }
  }

  useEventListener('keydown', (event) => {
    if (event.code === 'Escape') return;

    if (document.activeElement === textareaRef.current) {
      if ((event.metaKey || event.ctrlKey) && event.code === 'Enter') {
        event.preventDefault();
        formRef.current?.requestSubmit();
      }
      return;
    }

    if (document.activeElement && document.activeElement !== document.body) return;

    textareaRef.current?.focus();
  });

  useDelayedAutofocus(textareaRef, 100);

  if (isSuccess) {
    return (
      <ContactSectionForm style={{ alignItems: 'center' }}>
        <CalculatorSectionHeading>Thanks</CalculatorSectionHeading>
        <CalculatorSectionRegularText>{`We received your message, the team will read it during the day. Hope to hear more from you!`}</CalculatorSectionRegularText>
      </ContactSectionForm>
    );
  }

  const sendButtonVisibleKeyShortcut = isSending ? undefined : 'Meta+Enter';

  return (
    <ContactSectionForm
      ref={formRef}
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        sendContactForm(formData.get('contact') as string, formData.get('text') as string);
      }}
      style={{ cursor: isSending ? 'wait' : undefined }}
    >
      <ContactSectionTextarea
        ref={textareaRef}
        placeholder="Lorem ipsum and so forth... We are humans. Please be nice"
        name="text"
        disabled={isSending}
      />
      <ContactSectionSendingInputContainer>
        <ContactSectionInput
          placeholder="Your name / e-mail / link"
          name="contact"
          disabled={isSending}
        />
        <CircleButton
          type="submit"
          disabled={isSending}
          aria-keyshortcuts={sendButtonVisibleKeyShortcut}
          title={isSending ? undefined : `[${sendButtonVisibleKeyShortcut}]`}
        >
          <ArrowRightIcon />
        </CircleButton>
      </ContactSectionSendingInputContainer>
    </ContactSectionForm>
  );
}

function AboutSection() {
  return (
    <CalculatorSectionRegularText>
      {`We're developers, designers, and marketers. Some of the members have been in the industry since 2018, and we are capable of building everything Web that you can imagine.`}
    </CalculatorSectionRegularText>
  );
}
