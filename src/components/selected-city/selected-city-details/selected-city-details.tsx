import { Link, useNavigate } from "react-router-dom";
import { convertUnixToTime } from "../../../utils";
import { useAppSelector } from "../../../hooks/rtk-hooks";
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
import SelectedCityForecast from "./selected-city-forecast";

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
  }, [cityCurrentData, navigate]);

  useEffect(() => {
    console.log(selectedCityData);
    if (selectedCityData && lowest != null && highest != null) {
      for (const { main } of selectedCityData.list) {
        if (main.temp_min < lowest) {
          setLowest(main.temp_min);
        }
        if (main.temp_max > highest) {
          setHighest(main.temp_max);
        }
      }
    }
  }, [selectedCityData, lowest, highest, cityCurrentData]);

  return (
    <>
      <div className="main-container flex justify-center items-center max-w-[900px]">
        <CSSTransition
          in={showLegend}
          nodeRef={ref}
          classNames="legend"
          timeout={500}
          unmountOnExit
          onEnter={() => setShowLegend(true)}
          onExited={() => setShowLegend(false)}
        >
          <div
            ref={ref}
            className="flex flex-col text-left overflow-y-scroll absolute max-h-[95vh] legend"
          >
            <Legend />
          </div>
        </CSSTransition>

        {cityCurrentData && (
          <div className="air-pollution-data relative flex flex-col justify-center gap-8 transition duration-500 max-w-[900px]">
            <Link
              to={"/"}
              className="arrow-back-container absolute top-0 mr-auto ml-[-65px] rounded-full py-1 px-1 transition-all duration-300 hover:bg-[#5a5a5a]"
            >
              <img src={arrowBackSvg} alt="icon of an arrow" />
            </Link>
            <div className="flex justify-between flex-wrap gap-6">
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
              {highest != null && (
                <AirPollutionBlock
                  data={Math.round(highest) + "°C"}
                  title="Max temp"
                  iconSize="xl"
                  prefix="fas"
                  iconName="temperature-arrow-up"
                />
              )}
              {lowest != null && (
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
            <div className="flex w-[900px] overflow-x-scroll border-4 border-[#3498DB] rounded-xl">
              <SelectedCityForecast cityData={selectedCityData} />
              {/* <SelectedCityChart cityData={selectedCityData} /> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SelectedCityDetails;
