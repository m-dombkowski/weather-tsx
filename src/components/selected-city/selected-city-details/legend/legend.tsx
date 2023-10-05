import LegendBlock from "./legend-block";
import LegendColorBlock from "./legend-color-block";
import legends from "./index";

const Legend: React.FC = () => {
  return (
    <div className="min-w-[225px]">
      <h2 className="mb-8 text-2xl uppercase font-bold">Legend</h2>
      <LegendColorBlock />
      {legends.map((legendBlock, index) => (
        <LegendBlock
          key={index}
          title={legendBlock.title}
          brackets={legendBlock.brackets}
        />
      ))}
    </div>
  );
};

export default Legend;
