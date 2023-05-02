const colorsArray = [
  { name: "Good", hexCode: "#4cd137" },
  { name: "Fair", hexCode: "#3498db" },
  { name: "Moderate", hexCode: "#fbc531" },
  { name: "Poor", hexCode: "#d35400" },
  { name: "Very poor", hexCode: "#EA2027" },
];

const LegendColorBlock: React.FC = () => {
  return (
    <>
      <h3 style={{ marginBottom: "20px" }}>Colors:</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "20px",
          gap: "10px",
        }}
      >
        {colorsArray.map((color, index) => (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              width: "80%",
              justifyContent: "space-between",
            }}
            key={index}
          >
            {color.name}:
            <div
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                backgroundColor: color.hexCode,
              }}
            ></div>
          </span>
        ))}
      </div>
    </>
  );
};

export default LegendColorBlock;

{
  /* <span style={{ display: "flex", alignItems: "center", gap: "20px" }}>
Good:{" "}
<div
  style={{
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    backgroundColor: pollutionColors.good,
  }}
></div>
</span>
<span>
Fair: <div></div>
</span>
<span>
Moderate: <div></div>
</span>
<span>
Poor: <div></div>
</span>
<span>
Very Poor: <div></div>
</span> */
}
