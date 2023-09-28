'use client';
import { useEffect } from 'react';
import packageJson from '~/../package.json';

export function Attribution() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  if (process.env.NODE_ENV === 'production') useAttribution();

  return null;
}

function useAttribution() {
  const designerLink = 'https://jj-dsgn.com';

  useEffect(() => {
    console.info(
      `Developed by ${packageJson.author.name} · ${packageJson.author.url}. Designed by Gabriel · ${designerLink}`,
    );
  }, []);
}
