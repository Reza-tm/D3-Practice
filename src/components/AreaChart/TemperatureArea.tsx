import { AreaChartData } from "../../types/AreaChart";
import {
  dateAccessor,
  temperatureMaxAccessor,
  temperatureMinAccessor,
} from "../../constant/area-chart/accessors";
import { ScaleLinear, areaRadial } from "d3";
import Annotation from "./Annotation";

type Props = {
  dataset: AreaChartData[];
  angleScale: (d: Date) => number;
  radiusScale: ScaleLinear<number, number, never>;
};

const TemperatureArea = (props: Props) => {
  const { dataset, angleScale, radiusScale } = props;
  const areaGenerator = areaRadial<AreaChartData>()
    .angle((d) => angleScale(dateAccessor(d)))
    .innerRadius((d) => radiusScale(temperatureMinAccessor(d)))
    .outerRadius((d) => radiusScale(temperatureMaxAccessor(d)));
  return (
    <g>
      <Annotation
        textProps={{ dominantBaseline: "Hanging" }}
        text="Temperature"
        angle={Math.PI * 0.7}
        offset={0.5}
      />
      <path d={areaGenerator(dataset) as string} fill="url(#temperature-gradient)" />
    </g>
  );
};

export default TemperatureArea;
