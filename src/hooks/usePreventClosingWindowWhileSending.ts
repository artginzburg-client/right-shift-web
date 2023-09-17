import { useEventListener } from 'usehooks-ts';

export function usePreventClosingWindowWhileSending(isSending: boolean) {
  return useEventListener('beforeunload', (event) => {
    if (isSending) {
      event.returnValue = `The form is being sent. Sure you don't need it?`;
    }
  });
}
