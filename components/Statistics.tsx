import React from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Statistics = () => {
  // Sample data for charts
  const skillProgressData = {
    labels: ["Striking", "Grappling", "Defense", "Endurance", "Flexibility"],
    datasets: [
      {
        label: "Skill Level",
        data: [80, 70, 75, 90, 60],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const trainingFrequencyData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Hours Trained",
        data: [2, 3, 2, 1, 0, 4, 1],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  const weightClassDistributionData = {
    labels: [
      "Featherweight",
      "Lightweight",
      "Welterweight",
      "Middleweight",
      "Heavyweight",
    ],
    datasets: [
      {
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
        ],
      },
    ],
  };

  return (
    <Box p={4} bg="white" boxShadow="md">
      <Heading mb={4}>Jiu-Jitsu Training Statistics</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Box>
          <Heading size="md" mb={3}>
            Skill Progress
          </Heading>
          <Bar data={skillProgressData} />
        </Box>
        <Box>
          <Heading size="md" mb={3}>
            Training Frequency
          </Heading>
          <Line data={trainingFrequencyData} />
        </Box>
        <Box>
          <Heading size="md" mb={3}>
            Weight Class Distribution
          </Heading>
          <Doughnut data={weightClassDistributionData} />
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default Statistics;
