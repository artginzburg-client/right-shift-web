export function ArrowRightIcon(props: JSX.IntrinsicElements['svg']) {
  const stroke = '#1e1e1e';
  const strokeWidth = 1.9;

  const width = 34;
  const height = 16;
  const x2 = width - 1;
  const y2 = height / 2;

  const flipperSize = 6.5;
  const flippersX1 = x2 - flipperSize;
  const upperFlipperY1 = y2 - flipperSize;
  const lowerFlipperY1 = y2 + flipperSize;

  const sharedLineProps: JSX.IntrinsicElements['line'] = {
    stroke,
    strokeWidth,
    strokeLinecap: 'round',
    x2,
    y2,
  };

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <line x1={0} y1={y2} {...sharedLineProps} />
      <line x1={flippersX1} y1={upperFlipperY1} {...sharedLineProps} />
      <line x1={flippersX1} y1={lowerFlipperY1} {...sharedLineProps} />
    </svg>
  );
}
