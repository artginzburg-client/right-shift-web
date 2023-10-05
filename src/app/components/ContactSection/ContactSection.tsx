'use client';
import { useRef, useState } from 'react';
import {
  CalculatorSectionHeading,
  CalculatorSectionRegularText,
} from '../CalculatorSection/CalculatorSection.styled';
import {
  ContactSectionForm,
  ContactSectionInput,
  ContactSectionSendingInputContainer,
  ContactSectionTextarea,
} from './ContactSection.styled';
import { useEventListener } from 'usehooks-ts';
import { useDelayedAutofocus } from '~/hooks/useDelayedAutofocus';
import { usePreventClosingWindowWhileSending } from '~/hooks/usePreventClosingWindowWhileSending';
import { CircleButton } from '../ui/CircleButton/CircleButton';
import { ArrowRightIcon } from '../ui/ArrowRightIcon';
import { fetchRoute } from '~/app/utils/fetchRoute';

/** @todo Error Handling */
export function ContactSection() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [isSuccess, setIsSuccess] = useState(false);

  const [isSending, setIsSending] = useState(false);
  usePreventClosingWindowWhileSending(isSending);
  async function sendContactForm(contact: string, text: string) {
    setIsSending(true);
    try {
      const result = await fetchRoute('/api/contact', {
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
