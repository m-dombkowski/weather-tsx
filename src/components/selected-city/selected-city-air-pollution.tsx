import { useAppSelector } from "../../hooks/rtk-hooks";
import SingleAirPollution from "./single-air-pollution";

const SelectedCityAirPollution: React.FC = () => {
  const airPollution = useAppSelector(
    (state) => state.airPollution.airPollution
  );

  const airPollutionData = airPollution?.list[0];

  return (
    <>
      {airPollutionData && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex" }}>
            <h2>Air pollution</h2>
            <button>i</button>
          </div>
          <div style={{ display: "flex" }}>
            <SingleAirPollution name="AQI" value={airPollutionData.main.aqi} />
            <SingleAirPollution
              name="SO"
              sub="2"
              value={airPollutionData.components.so2}
            />
            <SingleAirPollution
              name="NO"
              sub="2"
              value={airPollutionData.components.no2}
            />
            <SingleAirPollution
              name="PM"
              sub="10"
              value={airPollutionData.components.pm10}
            />
            <SingleAirPollution
              name="PM"
              sub="2,5"
              value={airPollutionData.components.pm2_5}
            />
            <SingleAirPollution
              name="O"
              sub="3"
              value={airPollutionData.components.o3}
            />
            <SingleAirPollution
              name="CO"
              value={airPollutionData.components.co}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SelectedCityAirPollution;
