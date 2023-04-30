import { useEffect, useRef } from "react";
import { QualityBrackets, pollutionChecker } from ".";
import { useAppSelector } from "../../hooks/rtk-hooks";

interface LegendBlockProps {
  title: string;
  brackets: string[];
}

const LegendBlock: React.FC<LegendBlockProps> = ({ title, brackets }) => {
  return (
    <div>
      <h3 style={{ marginBottom: "20px" }}>{title}</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginBottom: "30px",
        }}
      >
        {brackets.map((bracket, index) => (
          <p key={index}>{bracket}</p>
        ))}
      </div>
    </div>
  );
};

export default LegendBlock;
