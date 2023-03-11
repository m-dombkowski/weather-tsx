import { CityInterface } from "../state";

export const convertUnixToTime = (
  unixTimestamp: number,
  cityData: CityInterface
) => {
  const date = new Date((unixTimestamp + cityData.timezone - 3600) * 1000);
  const hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  const minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  // const seconds = "0" + date.getSeconds();

  return `${hours}:${minutes}`;
};
