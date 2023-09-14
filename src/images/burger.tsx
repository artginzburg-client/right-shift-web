export default function BurgerIcon() {
  return (
    <g>
      <line
        x1="15.75"
        y1="14.25"
        x2="34.25"
        y2="14.25"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        {/* <animate attributeName="strokeWidth" values="0;20;0" dur="5s" repeatCount={'indefinite'} /> */}
      </line>
      <line
        x1="15.75"
        y1="24.25"
        x2="34.25"
        y2="24.25"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="15.75"
        y1="34.25"
        x2="34.25"
        y2="34.25"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* <rect x={15} y={14} width={20} height={0.75} stroke="green" rx={0.5}>
        <animate attributeName="width" values="0;50;0" dur="5s" repeatCount={'indefinite'} />
      </rect> */}
    </g>
  );
}
