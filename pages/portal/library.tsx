"use client";
import React, { useEffect, useRef } from "react";
import cytoscape from "cytoscape";

import { Spinner } from "@chakra-ui/react";
import PortalLayout from "@/components/PortalLayout";
import { cyElements } from "@/data/cyTransitions";

function Library() {
  const cyRef = useRef(null);

  useEffect(() => {
    if (!cyRef.current) return;

    const cy = cytoscape({
      container: cyRef.current,
      elements: cyElements,
      style: [
        {
          selector: "node",
          style: {
            "background-color": "#0074D9",
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

  return (
    <PortalLayout>
      <div>Technique Library</div>
      {cyRef ? (
        <div
          ref={cyRef}
          style={{ width: "1000px", height: "1000px", background: "white" }}
        />
      ) : (
        <Spinner size="xl" />
      )}
    </PortalLayout>
  );
}

export default Library;
