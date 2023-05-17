import { interpolateYlOrRd, range } from "d3";

type Props = {
  id: string;
};

const GradientFilter = (props: Props) => {
  const { id } = props;
  const numberOfStops = 10;
  const gradientColorScale = interpolateYlOrRd;
  const rangeOfStops = range(numberOfStops);

  return (
    <defs>
      <radialGradient id={id}>
        {rangeOfStops.map((e) => (
          <stop
            offset={`${(e * 100) / (numberOfStops - 1)}%`}
            stopColor={gradientColorScale(e / (numberOfStops - 1))}
          />
        ))}
      </radialGradient>
    </defs>
  );
};

export default GradientFilter;
