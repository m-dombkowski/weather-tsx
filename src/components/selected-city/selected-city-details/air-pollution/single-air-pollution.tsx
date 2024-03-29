import { useCallback, useEffect, useRef } from "react";
import { aqiChecker, pollutionChecker } from "../..";

interface SingleAirPollutionProps {
  name: string;
  value: number;
  sub?: string;
  title: string;
  qualityCheckerValue: string;
}

const SingleAirPollution: React.FC<SingleAirPollutionProps> = ({
  name,
  value,
  sub,
  title,
  qualityCheckerValue,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const qualityChecker = useCallback(() => {
    if (ref.current) {
      switch (qualityCheckerValue) {
        case "AQI":
          aqiChecker(value, ref.current);
          break;
        case "SO2":
          pollutionChecker(value, ref.current, {
            first: 0,
            second: 20,
            third: 80,
            fourth: 250,
            fifth: 350,
          });
          break;
        case "NO2":
          pollutionChecker(value, ref.current, {
            first: 0,
            second: 40,
            third: 70,
            fourth: 150,
            fifth: 200,
          });
          break;
        case "PM10":
          pollutionChecker(value, ref.current, {
            first: 0,
            second: 20,
            third: 50,
            fourth: 100,
            fifth: 200,
          });
          break;
        case "PM25":
          pollutionChecker(value, ref.current, {
            first: 0,
            second: 10,
            third: 25,
            fourth: 50,
            fifth: 75,
          });
          break;
        case "O3":
          pollutionChecker(value, ref.current, {
            first: 0,
            second: 60,
            third: 100,
            fourth: 140,
            fifth: 180,
          });
          break;
        case "CO":
          pollutionChecker(value, ref.current, {
            first: 0,
            second: 4400,
            third: 9400,
            fourth: 12400,
            fifth: 15400,
          });
          break;
        default:
          console.log("nie ma");
      }
    }
  }, [qualityCheckerValue, value]);
  useEffect(() => {
    qualityChecker();
  }, [qualityChecker]);
  return (
    <div
      className="flex flex-col items-center justify-between py-5 px-7 rounded-xl bg-[#1a1a1a] text-[#333] text-bold w-100px"
      title={title}
      ref={ref}
    >
      {sub == null && (
        <>
          <p>{name}</p>
          <span>{value}</span>
        </>
      )}
      {sub != null && (
        <>
          <p>
            {name}
            <sub>{sub}</sub>
          </p>
          <span>{value}</span>
        </>
      )}
    </div>
  );
};

export default SingleAirPollution;
