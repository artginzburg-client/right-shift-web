import { StaticImageData } from 'next/image';

import prime2uImage from '~/images/work/prime2u.png';
import jenteleyImage from '~/images/work/jenteley.png';
import primediamondsImage from '~/images/work/primediamonds.png';
import sdmlpImage from '~/images/work/sdm-lp.png';
import schoolMapImage from '~/images/work/school-map.png';
import nfoTokenImage from '~/images/work/nfo-token.png';
import kryshiIVysheImage from '~/images/work/kryshi-i-vyshe.png';
import stackImage from '~/images/work/stack.png';
import nextIconSrc from '~/images/next.svg';
import { newTab } from '~/tools/linkHelpers';

import {
  WorkSectionContainer,
  WorkSectionImage,
  WorkSectionImageContainer,
  WorkSectionNextIcon,
} from './WorkSection.styled';

export function WorkSection() {
  function generateWorksWithTypes<
    T extends { imgSrc: string | StaticImageData; aHref: string; title: string },
  >(works: readonly T[]) {
    return works;
  }
  const works = generateWorksWithTypes([
    {
      imgSrc: prime2uImage,
      aHref: 'https://prime2u.ru',
      title: 'Prime 2U',
    },
    {
      imgSrc: jenteleyImage,
      aHref: 'https://jenteley.ru',
      title: 'Enteley Jewelry',
    },
    {
      imgSrc: nfoTokenImage,
      aHref: 'https://nfotoken.com',
      title: 'NFO Token',
    },
    {
      imgSrc: schoolMapImage,
      aHref: 'https://ginzburg.art/CASProject/',
      title: 'School Map',
    },
    {
      imgSrc: stackImage,
      aHref: 'https://stack.ginzburg.art',
      title: 'stack',
    },
    {
      imgSrc: kryshiIVysheImage,
      aHref: 'https://concerts.kryshi-i-vyshe.ru',
      title: 'Kryshe i Vyshe',
    },
    {
      imgSrc: primediamondsImage,
      aHref: 'https://primediamonds.ru',
      title: 'Prime Diamonds',
    },
    {
      imgSrc: sdmlpImage,
      aHref: 'https://sdm-lp.ru',
      title: 'СДМ-ЛП',
    },
  ] as const);

  return (
    <WorkSectionContainer>
      {works.map(({ imgSrc, aHref, title }) => (
        <WorkSectionImageContainer key={title} href={aHref} {...newTab}>
          <WorkSectionImage src={imgSrc} alt={title} loading="eager" placeholder="blur" />
          <WorkSectionNextIcon src={nextIconSrc} alt="Next" />
        </WorkSectionImageContainer>
      ))}
    </WorkSectionContainer>
  );
}
