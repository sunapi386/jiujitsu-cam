"use client";
import React, { useEffect, useRef, useState } from "react";
import cytoscape from "cytoscape";
import {
  Spinner,
  Box,
  Select,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
} from "@chakra-ui/react";
import PortalLayout from "@/components/PortalLayout";
import { cyElements } from "@/data/cyTransitions";

function Library() {
  const cyRef = useRef(null);
  const [startPosition, setStartPosition] = useState("");
  const [endPosition, setEndPosition] = useState("");

  // Mock data for dropdowns, replace with actual data
  const positions = [
    "Open Guard",
    "Closed Guard",
    "Half Guard",
    "Side Control",
    "Mount",
  ];

  useEffect(() => {
    if (!cyRef.current) return;

    const cy = cytoscape({
      container: cyRef.current,
      elements: cyElements,
      style: [
        {
          selector: "node",
          style: {
            label: "data(label)",
            "text-valign": "center",
            color: "#fff",
            "text-outline-width": 2,
            "text-outline-color": "#0074D9",
          },
        },
        {
          selector: "edge",
          style: {
            width: 3,
            "line-color": "#0074D9",
            "target-arrow-color": "#0074D9",
            "target-arrow-shape": "triangle",
            "curve-style": "bezier",
          },
        },
      ],
      layout: {
        name: "breadthfirst",
        directed: true,
      },
    });
  }, []);

  const handleSearch = () => {
    // Logic to filter and display results based on selected positions
  };

  return (
    <PortalLayout>
      <Box p={6}>
        <Heading mb={4}>Technique Library</Heading>
        <VStack spacing={4}>
          <HStack spacing={4}>
            <Select
              placeholder="Start Position"
              value={startPosition}
              onChange={(e) => setStartPosition(e.target.value)}
            >
              {positions.map((position) => (
                <option key={position} value={position}>
                  {position}
                </option>
              ))}
            </Select>
            <Select
              placeholder="End Position"
              value={endPosition}
              onChange={(e) => setEndPosition(e.target.value)}
            >
              {positions.map((position) => (
                <option key={position} value={position}>
                  {position}
                </option>
              ))}
            </Select>
            <Button colorScheme="blue" onClick={handleSearch}>
              Search
            </Button>
          </HStack>
          <Text>
            Explore techniques and transitions based on your selected positions.
            Click on search results to view detailed video clips and images.
          </Text>
          {/* Placeholder for search results */}
          {/* Implement a component or logic to display search results here */}
        </VStack>
        {cyRef ? (
          <Box
            ref={cyRef}
            style={{ width: "100%", height: "500px", background: "white" }}
          />
        ) : (
          <Spinner size="xl" />
        )}
      </Box>
    </PortalLayout>
  );
}

export default Library;
