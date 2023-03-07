import { useEffect } from "react";

interface SelectedCityProps {
  selectedCityData: any;
}

const SelectedCity: React.FC<SelectedCityProps> = ({ selectedCityData }) => {
  const cityData = {
    icon: selectedCityData.weather[0].icon,
  };

  useEffect(() => {
    console.log(selectedCityData);
  }, []);

  return (
    <div>
      <span>{selectedCityData.main.temp}°C</span>
      <img src={`http://openweathermap.org/img/wn/${cityData.icon}@2x.png`} />
      <span>{selectedCityData.name}</span>
    </div>
  );
};

export default SelectedCity;
