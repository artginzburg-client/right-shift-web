import { ArrowButtonElement } from './ArrowButton.styled';
import { ArrowRightIcon } from '../ArrowRightIcon';

export function ArrowButton({
  children,
  Element = ArrowButtonElement,
  ...props
}: JSX.IntrinsicElements['button'] & { Element?: React.FC<JSX.IntrinsicElements['button']> }) {
  return (
    <Element type="button" {...props}>
      {children}
      <ArrowRightIcon style={{ marginLeft: 15 }} />
    </Element>
  );
}
