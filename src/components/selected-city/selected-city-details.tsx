import { useNavigate } from "react-router-dom";
import { convertUnixToTime } from "../../helpers";
import { useAppSelector } from "../../hooks/rtk-hooks";
import SelectedCityChart from "./selected-city-chart";
import { useEffect } from "react";
import SelectedCityAirPollution from "./selected-city-air-pollution";

const SelectedCityDetails: React.FC = () => {
  const selectedCityData = useAppSelector(
    (state) => state.selectedCity.selectedCity
  );

  const navigate = useNavigate();

  const cityCurrentData = selectedCityData?.list[0];

  useEffect(() => {
    if (!cityCurrentData) {
      navigate("/");
    }
  }, []);

  return (
    <>
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
                /Sunset:
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
    </>
  );
};

export default SelectedCityDetails;
