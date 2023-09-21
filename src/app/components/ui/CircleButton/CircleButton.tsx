import { CircleButtonElement } from './CircleButton.styled';

export function CircleButton({ children, ...props }: JSX.IntrinsicElements['button']) {
  return (
    <CircleButtonElement type="button" {...props}>
      {children}
    </CircleButtonElement>
  );
}
