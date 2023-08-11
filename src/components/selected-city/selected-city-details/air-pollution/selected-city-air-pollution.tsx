import { forwardRef } from "react";
import { useAppSelector } from "../../../../hooks/rtk-hooks";
import SingleAirPollution from "./single-air-pollution";

interface SelectedCityAirPollutionProps {
  toggleLegend: React.Dispatch<React.SetStateAction<boolean>>;
}

const SelectedCityAirPollution = forwardRef<
  HTMLDivElement,
  SelectedCityAirPollutionProps
>(function CityAirPollution(props, ref) {
  
  const airPollution = useAppSelector(
    (state) => state.airPollution.airPollution
  );

  const airPollutionData = airPollution?.list[0];

  const handleLegendVisibility = () => {
    props.toggleLegend((prevState) => !prevState);
  };

  return (
    <>
      {airPollutionData && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div style={{ display: "flex", gap: "20px" }}>
            <h2>Air pollution</h2>
            <button onClick={handleLegendVisibility}>i</button>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <SingleAirPollution
              name="AQI"
              value={airPollutionData.main.aqi}
              title="Air Quality Index"
              qualityCheckerValue="AQI"
            />
            <SingleAirPollution
              name="SO"
              sub="2"
              value={airPollutionData.components.so2}
              title="Concentration of SO2 (Sulphur dioxide), μg/m³"
              qualityCheckerValue="SO2"
            />
            <SingleAirPollution
              name="NO"
              sub="2"
              value={airPollutionData.components.no2}
              title="Concentration of NO2 (Nitrogen dioxide), μg/m³"
              qualityCheckerValue="NO2"
            />
            <SingleAirPollution
              name="PM"
              sub="10"
              value={airPollutionData.components.pm10}
              title="Concentration of PM10 (Coarse particulate matter), μg/m³"
              qualityCheckerValue="PM10"
            />
            <SingleAirPollution
              name="PM"
              sub="2,5"
              value={airPollutionData.components.pm2_5}
              title="Concentration of PM2.5 (Fine particles matter), μg/m³"
              qualityCheckerValue="PM25"
            />
            <SingleAirPollution
              name="O"
              sub="3"
              value={airPollutionData.components.o3}
              title="Concentration of O3 (Ozone), μg/m³"
              qualityCheckerValue="O3"
            />
            <SingleAirPollution
              name="CO"
              value={airPollutionData.components.co}
              title="Concentration of CO (Carbon monoxide), μg/m³"
              qualityCheckerValue="CO"
            />
          </div>
        </div>
      )}
    </>
  );
});

export default SelectedCityAirPollution;
