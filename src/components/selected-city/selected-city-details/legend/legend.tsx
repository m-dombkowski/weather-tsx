import LegendBlock from "./legend-block";
import LegendColorBlock from "./legend-color-block";

const Legend: React.FC = () => {
  return (
    <>
      <h2 style={{ marginBottom: "20px" }}>Legend:</h2>
      <LegendColorBlock />
      <LegendBlock
        title="AQI"
        brackets={[
          "1 = Good",
          "2 = Fair",
          "3 = Moderate",
          "4 = Poor",
          "5 = Very Poor",
        ]}
      />
      <LegendBlock
        title="SO₂"
        brackets={[
          "0-20 = Good",
          "21-80 = Fair",
          "81-250 = Moderate",
          "251-350 = Poor",
          "351+ = Very Poor",
        ]}
      />
      <LegendBlock
        title="NO₂"
        brackets={[
          "0-40 = Good",
          "41-70 = Fair",
          "71-150 = Moderate",
          "151-200 = Poor",
          ">200 = Very Poor",
        ]}
      />
      <LegendBlock
        title="PM₁₀"
        brackets={[
          "0-20 = Good",
          "21-50 = Fair",
          "51-100 = Moderate",
          "101-200 = Poor",
          ">200 = Very Poor",
        ]}
      />
      <LegendBlock
        title="PM₂,₅"
        brackets={[
          "0-10 = Good",
          "11-25 = Fair",
          "26-50 = Moderate",
          "51-75 = Poor",
          ">75 = Very Poor",
        ]}
      />
      <LegendBlock
        title="O₃"
        brackets={[
          "0-60 = Good",
          "61-100 = Fair",
          "101-140 = Moderate",
          "141-180 = Poor",
          ">180 = Very Poor",
        ]}
      />
      <LegendBlock
        title="CO"
        brackets={[
          "0-4400 = Good",
          "4401-9400 = Fair",
          "9401-12400 = Moderate",
          "12401-15400 = Poor",
          "15400+ = Very Poor",
        ]}
      />
    </>
  );
};

export default Legend;
