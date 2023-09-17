import type { Metadata } from 'next';
import './globals.linaria.global';
import localFont from 'next/font/local';

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
      path: '../fonts/gt-eesti-pro-display/GT-Eesti-Display-Light.otf',
      weight: '300',
    },
  ],
  style: 'swap',
});

export const metadata: Metadata = {
  title: 'right.shift',
  description: 'creating digital products tailored for you',
  openGraph: {
    type: 'website',
    title: 'right.shift',
    description: 'digital products tailored for you',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Does this need rel="shortcut"? The Next.js doc https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons#image-files-ico-jpg-png just specifies rel="icon". I just remember it was better to also put "shortcut" in there, so leaving it until I update my knowledge. */}
        <link rel="shortcut icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={gTEestiProDisplay.className}>{children}</body>
    </html>
  );
}
