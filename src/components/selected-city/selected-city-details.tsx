import { useNavigate } from "react-router-dom";
import { convertUnixToTime } from "../../helpers";
import { useAppSelector } from "../../hooks/rtk-hooks";
import SelectedCityChart from "./selected-city-chart";
import { useEffect, useRef, useState } from "react";
import SelectedCityAirPollution from "./selected-city-air-pollution";
import LegendBlock from "./legend-block";
import Legend from "./legend";

const SelectedCityDetails: React.FC = () => {
  const selectedCityData = useAppSelector(
    (state) => state.selectedCity.selectedCity
  );
  const legendRef = useRef<HTMLDivElement | null>(null);
  const [showLegend, setShowLegend] = useState<boolean>(false);

  const navigate = useNavigate();

  const cityCurrentData = selectedCityData?.list[0];

  useEffect(() => {
    if (!cityCurrentData) {
      navigate("/");
    }
  }, []);

  const toggleLegend = () => {
    setShowLegend((prevState) => !prevState);
  };

  return (
    <>
      <div style={{ display: "flex", gap: "100px" }}>
        <div
          className={`legend ${
            !showLegend ? "legend-hidden" : "legend-visible"
          }`}
        >
          <Legend />
        </div>
        {cityCurrentData && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>
                {selectedCityData.city.name}, {selectedCityData.city.country}
              </p>
              <p>{Math.round(cityCurrentData.main.temp)}</p>
              <p>
                {Math.round(cityCurrentData.main.temp_max)}/
                {Math.round(cityCurrentData.main.temp_min)}
              </p>
              <p>{convertUnixToTime(cityCurrentData.dt, selectedCityData)}</p>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <p>{cityCurrentData.main.humidity}%</p>
              </div>
              <div>
                <p>{cityCurrentData.main.pressure}hPa</p>
              </div>
              <div>
                <p>{cityCurrentData.wind.speed}km/h</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <p>
                  Sunrise:
                  {convertUnixToTime(
                    selectedCityData.city.sunrise,
                    selectedCityData
                  )}
                </p>
                <p>
                  Sunset:
                  {convertUnixToTime(
                    selectedCityData.city.sunset,
                    selectedCityData
                  )}
                </p>
              </div>
            </div>
            <SelectedCityAirPollution />
            <div style={{ display: "flex" }}>
              <div>
                <SelectedCityChart cityData={selectedCityData} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SelectedCityDetails;
