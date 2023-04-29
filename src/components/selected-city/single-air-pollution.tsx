interface SingleAirPollutionProps {
  name: string;
  value: number;
  sub?: string;
}

const SingleAirPollution: React.FC<SingleAirPollutionProps> = ({
  name,
  value,
  sub,
}) => {
  return (
    <>
      {!sub && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p>{name}</p>
          <span>{value}</span>
        </div>
      )}
      {sub && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p>
            {name}
            <sub>{sub}</sub>
          </p>
          <span>{value}</span>
        </div>
      )}
    </>
  );
};

export default SingleAirPollution;
