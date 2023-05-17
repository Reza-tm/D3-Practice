import { AreaChartData } from "../../types/AreaChart";
import {
  generatePrecipRadiusScale,
  generatePrecipTypeScale,
} from "../../constant/area-chart/scales";
import {
  precipProbabilityAccessor,
  precipTypeProbabilityAccessor,
} from "../../constant/area-chart/accessors";
import {
  getCoordinatesForAngle,
  getXFromDataPoint,
  getYFromDataPoint,
} from "../../utils/AreaChartUtils";
import Annotation from "./Annotation";

type Props = {
  dataset: AreaChartData[];
  angleScale: (d: Date) => number;
};

const PrecipType = (props: Props) => {
  const { angleScale, dataset } = props;
  const precipTypes = ["rain", "sleet", "snow"];
  const precipRadiusScale = generatePrecipRadiusScale(dataset);
  const precipTypeScale = generatePrecipTypeScale(precipTypes);
  const angle = Math.PI * 0.26;
  const offset = 1.14;
  const labelCoordinates = getCoordinatesForAngle(angle, 1.6);

  return (
    <g>
      <Annotation text="Precipation " angle={angle} offset={offset} />
      {precipTypes.map((e, i) => {
        return (
          <g>
            <circle
              fill={precipTypeScale(e) as string}
              opacity={0.7}
              r={4}
              cx={labelCoordinates[0] + 16}
              cy={labelCoordinates[1] + 16 * (i + 1)}
            />
            <text
              dominantBaseline="middle"
              y={labelCoordinates[1] + 16 * (i + 1)}
              x={labelCoordinates[0] + 26}
              fontSize=".7em"
              fill="#8395a7"
            >
              {e}
            </text>
          </g>
        );
      })}
      {dataset.map((e) => (
        <circle
          r={precipRadiusScale(precipProbabilityAccessor(e))}
          fill={precipTypeScale(precipTypeProbabilityAccessor(e)) as string}
          opacity={0.6}
          cx={getXFromDataPoint(e, angleScale, offset)}
          cy={getYFromDataPoint(e, angleScale, offset)}
        />
      ))}
    </g>
  );
};

export default PrecipType;
