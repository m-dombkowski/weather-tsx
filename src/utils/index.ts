import { CityForecastInterface, CityInterface } from "../state";

export const convertUnixToTime = (
  unixTimestamp: number,
  cityData: CityInterface | CityForecastInterface
) => {
  let date;

  const timezone =
    "sys" in cityData ? cityData.sys.timezone : cityData?.city.timezone;

  if (timezone !== 7200) {
    date = new Date((unixTimestamp + timezone - 3600) * 1000);
  } else {
    date = new Date(unixTimestamp * 1000);
  }

  const formattedDate = date
    .toLocaleString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
    })
    .replace(" at", "")
    .replace("/", ".");

  return formattedDate;
};

export const validateSearchInput = (input: string): boolean => {
  // const regex = /^[a-z]+(\s+[a-z]+)*$/i;
  // eslint-disable-next-line no-useless-escape
  const regex = /^[A-Za-z,\. ]{3,50}$/;
  // const regex = /[A-Za-z,]+.*\s+/;
  console.log(regex.test(input));
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
