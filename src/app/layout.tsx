import type { Metadata } from 'next';
import './globals.linaria.global';
import localFont from 'next/font/local';
import { Attribution } from './components/Attribution';
import { sheetConfig } from './utils/getSheet';

const { CANONICAL_HOST } = process.env;
const metadataBase = CANONICAL_HOST ? new URL(`https://${CANONICAL_HOST}`) : undefined;

const gTEestiProDisplay = localFont({
  src: [
    {
      path: '../fonts/gt-eesti-pro-display/GT-Eesti-Display-Bold.otf',
      weight: '700',
    },
    {
      path: '../fonts/gt-eesti-pro-display/GT-Eesti-Display-Regular.otf',
      weight: '400',
    },
    {
      path: '../fonts/gt-eesti-pro-display/GT-Eesti-Display-Light.otf', // TODO! figure out if this should be Thin instead of Light, like in the design.
      weight: '300',
    },
  ],
  style: 'swap',
});

export const metadata: Metadata = {
  metadataBase,
  title: 'right.shift',
  description: 'creating digital products tailored for you',
  keywords: [
    'Web Development',
    'Mobile App Development',
    'Custom Solutions',
    'UI/UX Design',
    'E-commerce Solutions',
    'Digital Marketing',
    'Responsive Design',
    'Full-Stack Development',
    'App Optimization',
    'Cross-Platform Development',
    'Enterprise Solutions',
    'Software Development',
    'Web Design',
    'App Design',
    'User Experience (UX)',
    'SEO Optimization',
    'Content Development',
    'Web Hosting',
    'Security Solutions',
    'Performance Optimization',
  ],
  openGraph: {
    type: 'website',
    title: 'right.shift',
    description: 'digital products tailored for you',
    url: metadataBase,
    siteName: 'right.shift',
    locale: 'en_US',
    emails: sheetConfig.fallback.Contacts.Email,
    phoneNumbers: sheetConfig.fallback.Contacts.Phone,
  },
  alternates: {
    canonical: metadataBase,
  },
  authors: [
    { name: 'Arthur Ginzburg', url: 'https://ginzburg.art' },
    { name: 'Gabriel', url: 'https://jj-dsgn.com' },
  ],
  creator: 'Art Ginzburg',
  category: 'Web Studio',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Does this need rel="shortcut"? The Next.js doc https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons#image-files-ico-jpg-png just specifies rel="icon". I just remember it was better to also put "shortcut" in there, so leaving it until I update my knowledge. */}
        <link rel="shortcut icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={gTEestiProDisplay.className}>
        {children}
        <Attribution />
      </body>
    </html>
  );
}
