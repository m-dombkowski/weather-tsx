export const pollutionColors = {
  good: "#4cd137",
  fair: "#3498db",
  moderate: "#fbc531",
  poor: "#d35400",
  veryPoor: "#EA2027",
};

export type QualityBrackets = {
  first: number;
  second: number;
  third: number;
  fourth: number;
  fifth: number;
};

export const pollutionChecker = (
  pollutionValue: number,
  ref: HTMLDivElement,
  qualityBrackets: QualityBrackets
) => {
  switch (true) {
    case pollutionValue >= qualityBrackets.first &&
      pollutionValue <= qualityBrackets.second:
      ref.style.backgroundColor = pollutionColors.good;
      break;
    case pollutionValue > qualityBrackets.second &&
      pollutionValue <= qualityBrackets.third:
      ref.style.backgroundColor = pollutionColors.fair;
      break;
    case pollutionValue > qualityBrackets.third &&
      pollutionValue <= qualityBrackets.fourth:
      ref.style.backgroundColor = pollutionColors.moderate;
      break;
    case pollutionValue > qualityBrackets.fourth &&
      pollutionValue <= qualityBrackets.fifth:
      ref.style.backgroundColor = pollutionColors.poor;
      break;
    case pollutionValue > qualityBrackets.fifth:
      ref.style.backgroundColor = pollutionColors.veryPoor;
      break;
    default:
      console.log("nie ma");
      break;
  }
};

export const aqiChecker = (pollutionValue: number, ref: HTMLDivElement) => {
  switch (true) {
    case pollutionValue === 1:
      ref.style.backgroundColor = pollutionColors.good;
      break;
    case pollutionValue === 2:
      ref.style.backgroundColor = pollutionColors.fair;
      break;
    case pollutionValue === 3:
      ref.style.backgroundColor = pollutionColors.moderate;
      break;
    case pollutionValue === 4:
      ref.style.backgroundColor = pollutionColors.poor;
      break;
    case pollutionValue === 5:
      ref.style.backgroundColor = pollutionColors.veryPoor;
      break;
    default:
      console.log("nie ma");

      break;
  }
};
