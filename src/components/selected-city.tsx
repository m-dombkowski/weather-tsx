import { useEffect } from "react";

interface SelectedCityProps {
  selectedCityData: any;
}

const SelectedCity: React.FC<SelectedCityProps> = ({ selectedCityData }) => {
  const cityData = {
    icon: selectedCityData.weather[0].icon,
    time: selectedCityData.dt,
  };

  const convertUnixToTime = (unixTimestamp: number) => {
    const date = new Date(
      (unixTimestamp + selectedCityData.timezone - 3600) * 1000
    );
    const hours =
      date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    const minutes =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    // const seconds = "0" + date.getSeconds();

    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    console.log(selectedCityData);
  });

  return (
    <div>
      <span>{Math.round(selectedCityData.main.temp)}°C</span>
      <img src={`http://openweathermap.org/img/wn/${cityData.icon}@2x.png`} />
      <span>{selectedCityData.name}</span>
      <p>{convertUnixToTime(cityData.time)}</p>
    </div>
  );
};

export default SelectedCity;
