/**
 * @see https://stackoverflow.com/a/72878777/11474669
 *
 * @example const isTouchScreenDevice = getIsTouchScreenDevice()
 */
export const getIsTouchScreenDevice = () => {
  try {
    document.createEvent('TouchEvent');
    return true;
  } catch (e) {
    return false;
  }
};
