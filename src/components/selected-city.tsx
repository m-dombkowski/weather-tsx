import { useEffect } from "react";

interface SelectedCityProps {
  selectedCityData: any;
}

const SelectedCity: React.FC<SelectedCityProps> = ({ selectedCityData }) => {
  useEffect(() => {
    console.log(selectedCityData);
  }, []);

  return (
    <div>
      <span>{selectedCityData.main.temp}°C</span>
      <img
        src={`http://openweathermap.org/img/wn/${selectedCityData.weather[0].icon}@2x.png`}
      />
      <span>{selectedCityData.name}</span>
    </div>
  );
};

export default SelectedCity;
