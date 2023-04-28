import { CityForecastInterface } from "../state";

export const convertUnixToTime = (
  unixTimestamp: number,
  cityData: CityForecastInterface
) => {
  const date = new Date(
    (unixTimestamp + cityData.city.timezone - 10800) * 1000
  );
  // const hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  // const minutes =
  //   date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  // const day = date.getDay() < 10 ? "0" + date.getDay() : date.getDay();

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
