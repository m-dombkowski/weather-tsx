import { CityForecastInterface } from "../state";

export const convertUnixToTime = (
  unixTimestamp: number,
  cityData: CityForecastInterface
) => {
  const date = new Date((unixTimestamp + cityData.city.timezone - 7200) * 1000);
  const hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  const minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  // const seconds = "0" + date.getSeconds();

  return `${hours}:${minutes}`;
};

export const validateSearchInput = (input: string): boolean => {
  const regex = /^[a-zA-Z\s]*$/;
  return regex.test(input);
};

export const floatingLabels = (
  event: React.ChangeEvent<HTMLInputElement>,
  classSelector: string
) => {
  const label = document.querySelector(classSelector);

  if (event.target.value !== "") {
    label?.classList.add("active");
  } else {
    label?.classList.remove("active");
  }
};
