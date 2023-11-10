import { FaInstagram, FaLinkedinIn, FaTelegram } from 'react-icons/fa';
import Link from 'next/link';
import type { IconType } from 'react-icons/lib';

import {
  NavigationMenuContactList,
  NavigationMenuLinksContainer,
  NavigationMenuSocialList,
} from './NavigationMenu/NavigationMenu.styled';

import { linkBuilders, newTab } from '~/tools/linkHelpers';
import { getSheet, type ContentSheetParsed, sheetConfig } from '~/app/utils/getSheet';

const { CONTENT_SHEET_ID, NODE_ENV } = process.env;

/** This can technically be used with `Suspense`, but it's already really fast and cached. There's no point in optimizing without measuring, so I'll probably run some tests with and without `Suspense` later to determine if it should be used. */
export async function NavigationMenuLinksServer() {
  if (!CONTENT_SHEET_ID && NODE_ENV !== 'test')
    throw new Error('CONTENT_SHEET_ID environment variable not present');
  const contentSheet = CONTENT_SHEET_ID ? await getSheet(CONTENT_SHEET_ID) : sheetConfig.fallback;

  return <NavigationMenuLinks contentSheet={contentSheet} />;
}

export function NavigationMenuLinks({ contentSheet }: { contentSheet: ContentSheetParsed }) {
  const iconSizePx = 30;

  const socials: { href: string; Icon: IconType; title: string }[] = [
    { href: contentSheet.Socials.Instagram, Icon: FaInstagram, title: 'Instagram' },
    { href: contentSheet.Socials.LinkedIn, Icon: FaLinkedinIn, title: 'LinkedIn' },
    { href: contentSheet.Socials.Telegram, Icon: FaTelegram, title: 'Telegram' },
  ];

  return (
    <NavigationMenuLinksContainer>
      <NavigationMenuContactList>
        <li>
          <Link {...linkBuilders.tel(contentSheet.Contacts.Phone)} />
        </li>
        <li>
          <Link {...linkBuilders.mailto(contentSheet.Contacts.Email)} />
        </li>
      </NavigationMenuContactList>
      <NavigationMenuSocialList>
        {socials.map(({ href, Icon, title }) => (
          <li key={href}>
            <Link href={`https://${href}`} title={title} aria-label={title} {...newTab}>
              <Icon size={iconSizePx} />
            </Link>
          </li>
        ))}
      </NavigationMenuSocialList>
    </NavigationMenuLinksContainer>
  );
}
