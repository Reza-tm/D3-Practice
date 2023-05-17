import { AreaChartData } from "../../types/AreaChart";
import { getXFromDataPoint, getYFromDataPoint } from "../../utils/AreaChartUtils";
import Annotation from "./Annotation";

type Props = {
  uvData: AreaChartData[];
  scale: (v: Date) => number;
};

const UvIndexLine = (props: Props) => {
  const { uvData, scale } = props;
  const offset = 0.95;
  return (
    <g>
      <Annotation
        textProps={{ dominantBaseline: "Hanging" }}
        text="Uv index over 8"
        angle={Math.PI * 0.734}
        offset={offset}
      />
      {uvData.map((d) => (
        <line
          stroke="#feca57"
          strokeWidth={2}
          x1={getXFromDataPoint(d, scale, offset)}
          x2={getXFromDataPoint(d, scale, offset + 0.1)}
          y1={getYFromDataPoint(d, scale, offset)}
          y2={getYFromDataPoint(d, scale, offset + 0.1)}
        />
      ))}
    </g>
  );
};

export default UvIndexLine;
