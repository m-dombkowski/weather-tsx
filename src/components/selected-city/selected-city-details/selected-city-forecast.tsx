import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CityForecastInterface } from "../../../state";
import { convertUnixToTime } from "../../../utils";

interface ForecastProps {
  cityData: CityForecastInterface;
}
const SelectedCityForecast: React.FC<ForecastProps> = ({ cityData }) => {
  return (
    <div className="flex gap-[75px] p-[50px] pr-[60px] pl-[60px]">
      {cityData.list.map((object, index) => (
        <div key={index} className="flex flex-col justify-center items-center ">
          <p className="mb-[30px]">{convertUnixToTime(object.dt, cityData)}</p>
          <img
            className="mb-[5px]"
            src={`http://openweathermap.org/img/wn/${object.weather[0].icon}@2x.png`}
          />
          <p className="mb-[30px]">{Math.round(object.main.temp)}°C</p>
          <FontAwesomeIcon
            className="mb-[15px]"
            title="Rain possibility"
            size="xl"
            icon={["fas", "droplet"]}
          />
          <p>{Math.round(object.pop * 100)}%</p>
        </div>
      ))}
    </div>
  );
};

export default SelectedCityForecast;
