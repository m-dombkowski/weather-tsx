interface LegendBlockProps {
  title: string;
  brackets: string[];
}

const LegendBlock: React.FC<LegendBlockProps> = ({ title, brackets }) => {
  return (
    <div>
      <h3 className="mb-5 mt-10 text-xl uppercase font-bold">{title}</h3>
      <div className="flex flex-col gap-3 mb-10">
        {brackets.map((bracket, index) => (
          <p key={index}>{bracket}</p>
        ))}
      </div>
    </div>
  );
};

export default LegendBlock;
