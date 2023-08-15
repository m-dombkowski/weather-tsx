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
      <h3 className="mb-5 text-xl font-bold">Colors:</h3>
      <div className="flex flex-col gap-4 justify-center">
        {colorsArray.map((color, index) => (
          <span className="flex justify-between" key={index}>
            {color.name}:
            <div
              className="block rounded-full basis-6 mr-5"
              style={{
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
