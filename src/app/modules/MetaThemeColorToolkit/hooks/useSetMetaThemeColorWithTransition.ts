'use client';
import gradient from 'gradient-color';
import { useEffect, useMemo, useState } from 'react';

/**
 * @todo 1. Decide whether it should use https://npm.im/rainbowvis.js, or any other library, better with TS support included. 2. Publish to NPM.
 *
 * Further reading about the "theme-color" property: https://css-tricks.com/meta-theme-color-and-trickery/
 *
 * @example
 * const metaThemeColor = useSetMetaThemeColorWithTransition(['#000', '#0ff'], isCheckboxOn, 1500);
 *
 * // Usage with CRA:
 * useSetMetaThemeColor(metaThemeColor) // a custom hook that simply sets `document.head.querySelector<HTMLMetaElement>('meta[name="theme-color"]').content`, wrapped in an effect, returning a function that puts the initial theme color back where it was.
 *
 * // Usage with Next.JS:
 * import Head from 'next/head';
 * ...
 * <Head>
 *   <meta name="theme-color" content={metaThemeColor} />
 * </Head>
 */
export function useSetMetaThemeColorWithTransition(
  colors: Parameters<typeof gradient>[0],
  /** A boolean value that triggers the transition. */
  trigger: boolean,
  /**
   * `makskornakov` told me about a mysterious problem that if you're making transitions with JS, they need to be twice faster than CSS transitions. I noticed earlier that my JS transition were indeed out of sync with CSS transitions. So I'm living it here for now. I think it may have something to do with framerate, but not sure at all. To check that matter, just increase the transition duration to something crazy like 30000 – the de-sync will become noticeable.
   *
   * TL;DR do `transitionDuration / 2` when passing this property if you feel that the transition's timing is out of sync with the same transition implemented in CSS.
   */
  transitionDuration: number,
  /** Color gradient steps. Default is `transitionDuration / 30`. Constrained by a minimum of `colors.length` */
  transitionResolution = transitionDuration / 30,
) {
  const metaThemeColorAnimationInterval = transitionDuration / transitionResolution;

  const fromBackgroundToAccent = useMemo(() => {
    try {
      return gradient(colors, transitionResolution);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === 'The number of generated colors should >= the number of color stops'
      ) {
        return colors;
      }
      throw error;
    }
  }, [colors, transitionResolution]);
  const fromAccentToBackground = useMemo(
    () => [...fromBackgroundToAccent].reverse(),
    [fromBackgroundToAccent],
  );

  console.log(fromBackgroundToAccent);

  const [metaThemeColor, setMetaThemeColor] = useState<string>(colors[Number(trigger)]);

  const [isFirstRun, setIsFirstRun] = useState(true);

  useEffect(() => {
    if (isFirstRun) {
      // Prevents the transition from firing until trigger is actually changed, not just initialized.
      setIsFirstRun(false);
      return;
    }

    const timeouts: NodeJS.Timeout[] = [];

    const colorGradient = trigger ? fromBackgroundToAccent : fromAccentToBackground;
    colorGradient.forEach((color, colorIndex) => {
      timeouts.push(
        setTimeout(() => {
          setMetaThemeColor(color);
        }, colorIndex * metaThemeColorAnimationInterval),
      );
    });

    return () => {
      timeouts.map(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  return metaThemeColor;
}
