import { styled } from '@linaria/react';

import { reset } from '~/app/utils/reset';

export const ContactSectionForm = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;
export const ContactSectionSendingInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const ContactSectionInput = styled.input`
  all: unset;
  cursor: auto;

  font-size: 20px;
  padding-right: 3px;
  max-width: 70%;
`;
export const ContactSectionTextarea = styled.textarea`
  ${reset.textarea}

  font-size: 20px;
  font-weight: 300;

  min-height: 100px;
  max-width: 100%;
  min-width: 100%;
`;
