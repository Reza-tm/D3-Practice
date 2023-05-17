import { cloudAccessor } from "../../constant/area-chart/accessors";
import { generateCloudRadiusScale } from "../../constant/area-chart/scales";
import { AreaChartData } from "../../types/AreaChart";
import { getXFromDataPoint, getYFromDataPoint } from "../../utils/AreaChartUtils";
import Annotation from "./Annotation";

type Props = {
  dataset: AreaChartData[];
  angleScale: (d: Date) => number;
};

const CloudCover = (props: Props) => {
  const { dataset, angleScale } = props;
  const cloudScale = generateCloudRadiusScale(dataset);
  const offset = 1.27;

  return (
    <g>
      <Annotation angle={Math.PI * 0.23} offset={offset} text="Cloud cover" />
      {dataset.map((e) => (
        <circle
          r={cloudScale(cloudAccessor(e))}
          fill="#c8d6e5"
          opacity={0.6}
          cx={getXFromDataPoint(e, angleScale, 1.27)}
          cy={getYFromDataPoint(e, angleScale, 1.27)}
        />
      ))}
    </g>
  );
};

export default CloudCover;
