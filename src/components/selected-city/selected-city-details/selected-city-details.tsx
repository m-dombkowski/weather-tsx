import { Link, useNavigate } from "react-router-dom";
import { convertUnixToTime } from "../../../helpers";
import { useAppSelector } from "../../../hooks/rtk-hooks";
import SelectedCityChart from "./selected-city-chart";
import { useEffect, useRef, useState } from "react";
import Legend from "./legend/legend";
import "./selected-city-details.css";
import { CSSTransition } from "react-transition-group";
import AirPollutionBlock from "./air-pollution/air-pollution-block";
import atmosphericPressureSvg from "../../../assets/atmospheric-pressure.svg";
import sunriseSvg from "../../../assets/sunrise-up-svgrepo-com.svg";
import arrowBackSvg from "../../../assets/arrow-go-back-svgrepo-com.svg";
import sunsetSvg from "../../../assets/sunset-down-svgrepo-com.svg";
import humiditySvg from "../../../assets/humidity-svgrepo-com.svg";
import SelectedCityAirPollution from "./air-pollution/selected-city-air-pollution";

const SelectedCityDetails: React.FC = () => {
  const selectedCityData = useAppSelector(
    (state) => state.selectedCity.selectedCity
  );
  const ref = useRef<HTMLDivElement | null>(null);
  const [showLegend, setShowLegend] = useState<boolean>(false);
  const cityCurrentData = selectedCityData?.list[0];
  const [lowest, setLowest] = useState<number | undefined>(
    cityCurrentData?.main.temp_min
  );
  const [highest, setHighest] = useState<number | undefined>(
    cityCurrentData?.main.temp_max
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!cityCurrentData) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (selectedCityData && lowest && highest) {
      for (const { main } of selectedCityData.list) {
        if (main.temp_min < lowest) {
          setLowest(main.temp_min);
        }
        if (main.temp_max > highest) {
          setHighest(main.temp_max);
        }
      }
    }
  }, [selectedCityData, lowest, highest]);

  return (
    <>
      <div className="main-container" style={{ display: "flex", gap: "50px" }}>
        <CSSTransition
          in={showLegend}
          nodeRef={ref}
          classNames="legend"
          timeout={500}
          unmountOnExit
          onEnter={() => setShowLegend(true)}
          onExited={() => setShowLegend(false)}
        >
          <div ref={ref} className="legend">
            <Legend />
          </div>
        </CSSTransition>

        {cityCurrentData && (
          <div
            className="air-pollution-data"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "30px",
            }}
          >
            <Link to={"/"} className="arrow-back-container">
              <img src={arrowBackSvg} alt="icon of an arrow" />
            </Link>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <AirPollutionBlock
                data={
                  selectedCityData.city.name +
                  "," +
                  selectedCityData.city.country
                }
                title="Location"
                iconSize="xl"
                prefix="fas"
                iconName="location-dot"
                cutDescription={true}
              />

              <AirPollutionBlock
                data={Math.round(cityCurrentData.main.temp) + "°C"}
                title="Current Temp"
                iconSize="xl"
                prefix="fas"
                iconName="temperature-full"
              />
              {highest && (
                <AirPollutionBlock
                  data={Math.round(highest) + "°C"}
                  title="Max temp"
                  iconSize="xl"
                  prefix="fas"
                  iconName="temperature-arrow-up"
                />
              )}
              {lowest && (
                <AirPollutionBlock
                  data={Math.round(lowest) + "°C"}
                  title="Min temp"
                  iconSize="xl"
                  prefix="fas"
                  iconName="temperature-arrow-down"
                />
              )}

              <AirPollutionBlock
                data={convertUnixToTime(cityCurrentData.dt, selectedCityData)}
                title="Local Time"
                iconSize="xl"
                prefix="fas"
                iconName="clock"
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <AirPollutionBlock
                data={cityCurrentData.main.humidity + "%"}
                title="Humidity"
                svgSrc={humiditySvg}
              />
              <AirPollutionBlock
                data={`${cityCurrentData.main.pressure}
                 hPa`}
                title="Atmospheric Pressure"
                svgSrc={atmosphericPressureSvg}
              />
              <AirPollutionBlock
                data={Math.round(cityCurrentData.wind.speed * 10) / 10 + "km/h"}
                title="Wind Speed"
                iconSize="xl"
                prefix="fas"
                iconName="wind"
              />
              <AirPollutionBlock
                data={Math.round(cityCurrentData.pop * 100) + "%"}
                title="Rain possibility"
                iconSize="xl"
                prefix="fas"
                iconName="cloud-rain"
              />
              <AirPollutionBlock
                data={convertUnixToTime(
                  selectedCityData.city.sunrise,
                  selectedCityData
                )}
                title="Sunrise"
                svgSrc={sunriseSvg}
              />
              <AirPollutionBlock
                data={convertUnixToTime(
                  selectedCityData.city.sunset,
                  selectedCityData
                )}
                title="Sunset"
                svgSrc={sunsetSvg}
              />
            </div>
            <SelectedCityAirPollution ref={ref} toggleLegend={setShowLegend} />
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
