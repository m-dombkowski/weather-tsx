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
      style={{
        display: "flex",
        flexDirection: "column",
        height: "130px",
        width: "120px",
        justifyContent: "center",
        padding: "20px 30px",
        borderRadius: "8px",
        background: "#1a1a1a",
        gap: "10px",
      }}
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
      {/* <p>{data}</p> */}
    </div>
  );
};

export default AirPollutionBlock;
