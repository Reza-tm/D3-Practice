import { SVGAttributes } from "react";
import { getCoordinatesForAngle } from "../../utils/AreaChartUtils";

type Props = {
  text: string;
  angle: number;
  offset: number;
  textProps?: SVGAttributes<SVGTextElement>;
};

const Annotation = (props: Props) => {
  const { angle, offset, text, textProps } = props;
  const [x1, y1] = getCoordinatesForAngle(angle, offset);
  const [x2, y2] = getCoordinatesForAngle(angle, 1.6);
  return (
    <g>
      <line stroke="#34495e" opacity={0.4} y1={y1} y2={y2} x1={x1} x2={x2} />
      <text {...textProps} x={x2 + 6} y={y2} fill="#34495e" fontSize="0.7em">
        {text}
      </text>
    </g>
  );
};

export default Annotation;
