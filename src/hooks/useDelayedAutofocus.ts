import { useOnMounted } from './useOnMounted';

/**
 * Sometimes `autofocus` causes visual bugs. It can also cause lag on subsequent re-renders (which I hope you don't have, but if you do — you can help it with this hook).
 *
 * Also, delaying automatic focus looks nice sometimes, especially after animations.
 *
 * By the way, you can mitigate the negative effects with just 50ms of delay, even if your animation is 500ms in duration. That depends on the main thread being busy, I suggest to play with the delay.
 */
export function useDelayedAutofocus<T extends HTMLInputElement | HTMLTextAreaElement>(
  ref: React.RefObject<T>,
  delay: number,
) {
  useOnMounted(() => {
    setTimeout(() => {
      ref.current?.focus();
    }, delay);
  });
}
