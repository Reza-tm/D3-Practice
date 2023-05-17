import { MonthCoordinate } from "../../types/AreaChart";

type Props = {
  monthCoordinates: MonthCoordinate[];
};

const DateLine = (props: Props) => {
  const { monthCoordinates } = props;
  return (
    <g>
      {monthCoordinates.map(({ labelPos: [labelX, labelY], pos: [x, y], date }) => (
        <>
          <line x2={x} y2={y} stroke="#dadadd" fill="none" />
          <text
            fill="#8395a7"
            fontSize="0.7em"
            dominantBaseline="middle"
            textAnchor={Math.abs(labelX) < 5 ? "middle" : labelX > 0 ? "start" : "end"}
            x={labelX}
            y={labelY}
          >
            {date}
          </text>
        </>
      ))}
    </g>
  );
};

export default DateLine;
