import { boundsMessures } from "../../constant/area-chart/messures";
import Annotation from "./Annotation";

type Props = {
  radius: number;
};

const FreezingCircle = (props: Props) => {
  const { radius } = props;
  return (
    <g>
      <Annotation
        textProps={{ dominantBaseline: "Hanging" }}
        text="Freezing temperature"
        angle={Math.PI * 0.9}
        offset={radius / boundsMessures.radius}
      />
      <circle fill="#00d2d3" opacity={0.15} r={radius} />
    </g>
  );
};

export default FreezingCircle;
