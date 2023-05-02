import { CityForecastInterface } from "../state";

export const convertUnixToTime = (
  unixTimestamp: number,
  cityData: CityForecastInterface
) => {
  let date;
  if (cityData.city.timezone !== 7200) {
    date = new Date((unixTimestamp + cityData.city.timezone - 14400) * 1000);
  } else {
    date = new Date((unixTimestamp - 7200) * 1000);
  }
  console.log(date);

  const formattedDate = date
    .toLocaleString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "long",
    })
    .replace(" at", "");

  return formattedDate;
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
