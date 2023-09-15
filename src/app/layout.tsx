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

export const metadata = {
  title: 'right.shift',
  description: 'creating digital products tailored for you',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={gTEestiProDisplay.className}>{children}</body>
    </html>
  );
}
