import { ResultData } from "../../types/AreaChart";
import AnimatedTextWord from "./AnimatedText";

const Tooltip = ({ data }: { data: ResultData }) => {
  return (
    <div
      id="tooltip"
      className="bg-[#edf0f8] p-5 w-72 opacity-0 transition-opacity h-fit rounded-md"
    >
      <AnimatedTextWord text={`Date : ${data.date}`} />
      <AnimatedTextWord text={`Min-Temp : ${data.temperatureMin}`} />
      <AnimatedTextWord text={`Max-Temp : ${data.temperatureMax}`} />
      <AnimatedTextWord text={`UV Index  : ${data.uvIndex}`} />
      <AnimatedTextWord text={`Cloud cover : ${data.cloudCover}`} />
      <AnimatedTextWord text={`Precipitation Probability : ${data.precipProbability}`} />
      <AnimatedTextWord text={`Precipitation type : ${data.precipType}`} />
    </div>
  );
};

export default Tooltip;
