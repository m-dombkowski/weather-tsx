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
        height: "100px",
        width: "120px",
        justifyContent: "center",
        padding: "20px 30px",
        borderRadius: "8px",
        background: "#1a1a1a",
        gap: "10px",
      }}
      title={
        cutDescription && typeof data === "string" ? "Location: " + data : title
      }
    >
      {iconSize && prefix && iconName && (
        <FontAwesomeIcon size={iconSize} icon={[prefix, iconName]} />
      )}
      {svgSrc && <img src={svgSrc} alt="icon of arrow" />}
      {!cutDescription ? (
        <p>{data}</p>
      ) : (
        <p style={{ textOverflow: "ellipsis", overflow: "hidden" }}>{data}</p>
      )}
      {/* <p>{data}</p> */}
    </div>
  );
};

export default AirPollutionBlock;
