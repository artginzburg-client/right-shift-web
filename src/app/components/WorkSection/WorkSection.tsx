import { StaticImageData } from 'next/image';
import {
  WorkSectionContainer,
  WorkSectionImage,
  WorkSectionImageContainer,
  WorkSectionNextIcon,
} from './WorkSection.styled';
import schoolMapImage from '~/images/work/school-map.png';
import nfoTokenImage from '~/images/work/nfo-token.png';
import kryshiIVysheImage from '~/images/work/kryshi-i-vyshe.png';
import stackImage from '~/images/work/stack.png';
import nextIconSrc from '~/images/next.svg';
import { newTab } from '~/tools/linkHelpers';

export function WorkSection() {
  function generateWorksWithTypes<
    T extends { imgSrc: string | StaticImageData; aHref: string; title: string },
  >(works: readonly T[]) {
    return works;
  }
  const works = generateWorksWithTypes([
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
  ] as const);

  return (
    <WorkSectionContainer>
      {works.map(({ imgSrc, aHref, title }) => (
        <WorkSectionImageContainer key={title} href={aHref} {...newTab}>
          <WorkSectionImage src={imgSrc} alt={title} loading="lazy" />
          <WorkSectionNextIcon src={nextIconSrc} alt="Next" />
        </WorkSectionImageContainer>
      ))}
    </WorkSectionContainer>
  );
}
