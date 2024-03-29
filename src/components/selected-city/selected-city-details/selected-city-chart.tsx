import { CityForecastInterface } from "../../../state";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { convertUnixToTime } from "../../../utils";

interface ChartProps {
  cityData: CityForecastInterface;
}

const SelectedCityChart: React.FC<ChartProps> = ({ cityData }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `${cityData.city.name}, ${cityData.city.country} 24 hours forecast`,
      },
    },
  };

  const labels: string[] = cityData.list.map((record) => {
    return convertUnixToTime(record.dt, cityData);
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Temperature",
        data: cityData.list.map((record) => {
          return Math.round(record.main.temp);
        }),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <>
      <Line data={data} options={options} height={450} width={900} />
    </>
  );
};

export default SelectedCityChart;
