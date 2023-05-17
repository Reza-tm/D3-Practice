import { format } from "d3";

type Props = {
  ticks: number[];
  radiusScale: (v: number) => number;
};

const TemperatureCircle = (props: Props) => {
  const { radiusScale, ticks } = props;
  return (
    <g>
      {ticks.map((e, i) => (
        <>
          <circle r={radiusScale(e)} fill="none" stroke="#dadadd"></circle>
          {i > 0 && <rect y={-radiusScale(e) - 10} fill="#fff" width={40} height={20} />}
          {i > 0 && (
            <text
              dominantBaseline="middle"
              opacity={0.6}
              fontSize="0.7em"
              fill="#8395a7"
              x={4}
              y={-radiusScale(e) + 4}
            >
              {`${format(".0f")(e)}°F`}
            </text>
          )}
        </>
      ))}
    </g>
  );
};

export default TemperatureCircle;
