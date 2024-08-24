'use client';
import { Fragment, forwardRef, useImperativeHandle, useState } from 'react';

import { usePreventClosingWindowWhileSending } from '~/hooks/usePreventClosingWindowWhileSending';
import { fetchRoute } from '~/app/utils/fetchRoute';

import { ArrowRightIcon } from '../ui/ArrowRightIcon';
import { CircleButton } from '../ui/CircleButton/CircleButton';
import { ArrowButton } from '../ui/ArrowButton/ArrowButton';
import { ArrowButtonElementStickyOnSmallHeight } from '../ui/ArrowButton/ArrowButton.styled';

import {
  CalculatorSectionArrowButtonsContainer,
  CalculatorSectionContainer,
  CalculatorSectionCopyright,
  CalculatorSectionHeading,
  CalculatorSectionRegularText,
  CalculatorSectionSeparator,
  CircleButtonsContainer,
} from './CalculatorSection.styled';
import {
  CalculatorSectionDesiredOptionCheckbox,
  CalculatorSectionDesiredOptionLabel,
  CalculatorSectionDesiredOptions,
  CalculatorSectionInput,
  CalculatorSectionInputSendButton,
} from './CalculatorSection.styled';

export interface CalculatorSectionImperativeMethods {
  /** @returns whether to prevent closing the NavigationMenu. */
  goStageBack: () => true | undefined;
}
/**
 * @todo don't rerender on send — or in simple words, just don't clear the email in case the request fails and the user has to send again.
 * @todo Error Handling
 */
export const CalculatorSection = forwardRef<CalculatorSectionImperativeMethods>((_props, ref) => {
  const [calcStage, setCalcStage] = useState(0);

  const devOnlyDebuggers = {
    shouldFakePromise: false,
    shouldRejectFakePromise: false,
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
          if (devOnlyDebuggers.shouldRejectFakePromise) {
            reject('Dev-only debugger initiated rejection');
          } else {
            resolve(true);
          }
        }, 4000);
      });
    }

    const result = await fetchRoute('/api/calculator', {
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
            <Fragment key={possibleAnswer}>
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
            </Fragment>
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
      choice: ['Landing page', 'Website', 'Application'],
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
      }) as CalculatorSectionImperativeMethods,
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
