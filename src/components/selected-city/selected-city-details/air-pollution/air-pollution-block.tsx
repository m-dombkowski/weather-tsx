import {
  IconName,
  IconPrefix,
  SizeProp,
} from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface AirPollutionBlockProps {
  title: string;
  data: string | number;
  iconSize?: SizeProp | undefined;
  prefix?: IconPrefix;
  iconName?: IconName;
  needBR?: boolean;
  svgSrc?: string;
  cutDescription?: boolean;
}

const AirPollutionBlock: React.FC<AirPollutionBlockProps> = ({
  data,
  title,
  iconSize,
  prefix,
  iconName,
  svgSrc,
  cutDescription,
}) => {
  return (
    <div
      className="flex flex-col  justify-center py-5 px-8 gap-4 bg-[#1a1a1a] basis-32 rounded-lg"
      title={
        cutDescription === true && typeof data === "string"
          ? "Location: " + data
          : title
      }
    >
      {iconSize != null && prefix != null && iconName != null && (
        <FontAwesomeIcon size={iconSize} icon={[prefix, iconName]} />
      )}
      {svgSrc != null && <img src={svgSrc} alt="icon of arrow" />}
      {cutDescription === false ? (
        <p>{data}</p>
      ) : (
        <p
          style={
            cutDescription === true
              ? { textOverflow: "ellipsis", overflow: "hidden" }
              : undefined
          }
        >
          {data}
        </p>
      )}
    </div>
  );
};

export default AirPollutionBlock;
