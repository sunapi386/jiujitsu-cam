"use client";
import React, { useEffect, useRef } from "react";
import cytoscape from "cytoscape";

import { Spinner } from "@chakra-ui/react";
import { SideDrawer } from "@/components/sideDrawer";

function Library() {
  const cyRef = useRef(null);

  useEffect(() => {
    if (!cyRef.current) return;

    const cy = cytoscape({
      container: cyRef.current,
      elements: [
        {
          data: {
            id: "BackSurvival",
            label: "The Back Survival Position",
          },
        },
        {
          data: {
            id: "AllFoursSurvival",
            label: "Surviving All-Fours Back Position",
          },
        },
        {
          data: {
            id: "MountSurvival",
            label: "Surviving the Mount",
          },
        },
        {
          data: {
            id: "SideControlSurvival",
            label: "Side Control Survival",
          },
        },
        {
          data: {
            id: "KneeOnBellySurvival",
            label: "Knee-on-Belly Survival",
          },
        },
        {
          data: {
            id: "EscapeBack",
            label: "Escaping the Back",
          },
        },
        {
          data: {
            id: "EscapeMount",
            label: "Mount Escapes",
          },
        },
        {
          data: {
            id: "EscapeSideControl",
            label: "Side Control Escapes",
          },
        },
        {
          data: {
            id: "EscapeKneeOnBelly",
            label: "Knee-on-Belly Running Escape",
          },
        },
        {
          data: {
            id: "ArmbarEscape",
            label: "Armbar Escapes",
          },
        },
        {
          data: {
            id: "TriangleEscape",
            label: "Triangle Escape to Pass",
          },
        },
        {
          data: {
            id: "GuillotineEscape",
            label: "Guillotine Escapes",
          },
        },
        {
          data: {
            id: "FootlockEscape",
            label: "Footlock Escapes",
          },
        },
        {
          data: {
            id: "KimuraEscape",
            label: "Kimura Escapes",
          },
        },
        {
          data: {
            id: "ArmWrap",
            label: "Arm Wrap Techniques",
          },
        },
        {
          data: {
            id: "OverwrapToBack",
            label: "Overwrap to Back",
          },
        },
        {
          data: {
            id: "ScissorKneeShield",
            label: "Scissor / Knee Shield",
          },
        },
        {
          data: {
            id: "ClassicArmbarClosedGuard",
            label: "Classic Armbar",
          },
        },
        {
          data: {
            id: "BraboChokeClosedGuard",
            label: "Brabo Choke",
          },
        },
        {
          data: {
            id: "ClassicTriangleClosedGuard",
            label: "Classic Triangle Choke",
          },
        },
        {
          data: {
            id: "HipBumpSweep",
            label: "Hip Bump Sweep",
          },
        },
        {
          data: {
            id: "FlowerSweep",
            label: "Flower Sweep",
          },
        },
        {
          data: {
            id: "ButterflyGuard",
            label: "Butterfly Guard",
          },
        },
        {
          data: {
            id: "SpiderGuard",
            label: "Spider Guard",
          },
        },
        {
          data: {
            id: "CrossGripGuard",
            label: "Cross-Grip Guard",
          },
        },
        {
          data: {
            id: "DeLaRiva",
            label: "De La Riva",
          },
        },
        {
          data: {
            id: "SitUpGuard",
            label: "Sit-Up Guard",
          },
        },
        {
          data: {
            id: "ReverseDeLaRiva",
            label: "Reverse De La Riva Guard",
          },
        },
        {
          data: {
            id: "HalfGuard",
            label: "Half Guard",
          },
        },
        {
          data: {
            id: "SubmissionBack",
            label: "From the Back",
          },
        },
        {
          data: {
            id: "SubmissionMount",
            label: "From the Mount",
          },
        },
        {
          data: {
            id: "SubmissionSideControl",
            label: "Side Control",
          },
        },
        {
          data: {
            id: "SubmissionHalfGuard",
            label: "Half Guard",
          },
        },
        {
          data: {
            id: "SubmissionGuardTop",
            label: "Guard Top (e.g., Straight Ankle Lock)",
          },
        },
        {
          data: {
            source: "BackSurvival",
            target: "EscapeBack",
          },
        },
        {
          data: {
            source: "AllFoursSurvival",
            target: "EscapeBack",
          },
        },
        {
          data: {
            source: "MountSurvival",
            target: "EscapeMount",
          },
        },
        {
          data: {
            source: "SideControlSurvival",
            target: "EscapeSideControl",
          },
        },
        {
          data: {
            source: "KneeOnBellySurvival",
            target: "EscapeKneeOnBelly",
          },
        },
        {
          data: {
            source: "ArmWrap",
            target: "ClassicArmbarClosedGuard",
          },
        },
        {
          data: {
            source: "OverwrapToBack",
            target: "SubmissionBack",
          },
        },
        {
          data: {
            source: "ScissorKneeShield",
            target: "FlowerSweep",
          },
        },
        {
          data: {
            source: "ClassicArmbarClosedGuard",
            target: "BraboChokeClosedGuard",
          },
        },
        {
          data: {
            source: "ClassicTriangleClosedGuard",
            target: "HipBumpSweep",
          },
        },
        {
          data: {
            source: "ButterflyGuard",
            target: "SubmissionMount",
          },
        },
        {
          data: {
            source: "SpiderGuard",
            target: "SubmissionSideControl",
          },
        },
        {
          data: {
            source: "CrossGripGuard",
            target: "SubmissionMount",
          },
        },
        {
          data: {
            source: "DeLaRiva",
            target: "SitUpGuard",
          },
        },
        {
          data: {
            source: "ReverseDeLaRiva",
            target: "HalfGuard",
          },
        },
        {
          data: {
            source: "HalfGuard",
            target: "SubmissionHalfGuard",
          },
        },
        {
          data: {
            source: "EscapeBack",
            target: "ArmbarEscape",
          },
        },
        {
          data: {
            source: "EscapeMount",
            target: "TriangleEscape",
          },
        },
        {
          data: {
            source: "EscapeSideControl",
            target: "GuillotineEscape",
          },
        },
        {
          data: {
            source: "EscapeKneeOnBelly",
            target: "FootlockEscape",
          },
        },
        {
          data: {
            source: "ArmbarEscape",
            target: "KimuraEscape",
          },
        },
        {
          data: {
            source: "SubmissionBack",
            target: "SubmissionMount",
          },
        },
        {
          data: {
            source: "SubmissionMount",
            target: "SubmissionSideControl",
          },
        },
        {
          data: {
            source: "SubmissionSideControl",
            target: "SubmissionHalfGuard",
          },
        },
        {
          data: {
            source: "SubmissionHalfGuard",
            target: "SubmissionGuardTop",
          },
        },
      ],
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
        name: "grid",
      },
    });
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <SideDrawer />
      <div className="flex-1 p-6">
        <div>Technique Library</div>
        <div
          ref={cyRef}
          style={{ width: "1000px", height: "1000px", background: "white" }}
        />
        <Spinner size="xl" />
      </div>
    </div>
  );
}

export default Library;
