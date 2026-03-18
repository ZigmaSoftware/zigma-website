import React, { useState } from "react";
import IndiaMapSVG from "./IndiaMapSVG";
import { stateData, legendItems, plantTypeLabels } from "@/data/indiaPresenceData";

const IndiaPresence: React.FC = () => {
  const [activeState, setActiveState] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const currentState = selectedState || activeState;
  const currentData = currentState ? stateData[currentState] : null;

  const stateList = Object.values(stateData);

  const handleStateHover = (stateId: string | null) => {
    setActiveState(stateId);
  };

  const handleStateClick = (stateId: string) => {
    setSelectedState((prev) => (prev === stateId ? null : stateId));
  };

  const handleTabClick = (stateId: string) => {
    setSelectedState(stateId);
    setActiveState(stateId);
  };

  // Group plants by brand+type
  const groupedPlants = currentData
    ? currentData.plants.reduce(
        (acc, plant) => {
          const key = `${plant.brand} - ${plantTypeLabels[plant.type]}`;
          if (!acc[key]) acc[key] = [];
          acc[key].push(plant.name);
          return acc;
        },
        {} as Record<string, string[]>
      )
    : {};

  return (
    <section className="min-h-screen bg-background py-16 px-4 md:px-8 lg:px-16">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary tracking-tight">
          India Presence
        </h1>
        <p className="mt-3 text-muted-foreground text-base md:text-lg max-w-2xl">
          Our extensive network of integrated plants, grinding units, and bulk
          terminals across India.
        </p>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-6">
          {legendItems.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-sm inline-block"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-foreground font-medium">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* State Tabs - Vertical list on left */}
        <div className="lg:w-48 shrink-0">
          <div className="flex lg:flex-col flex-wrap gap-1">
            {stateList.map((state) => (
              <button
                key={state.id}
                onClick={() => handleTabClick(state.id)}
                className={`text-left text-sm px-3 py-2 rounded-sm transition-all duration-200 font-medium
                  ${
                    currentState === state.id
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-secondary"
                  }`}
              >
                {state.name}
              </button>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 flex items-center justify-center relative">
          <div className="w-full max-w-lg">
            <IndiaMapSVG
              activeState={currentState}
              onStateHover={handleStateHover}
              onStateClick={handleStateClick}
            />
          </div>
        </div>

        {/* Data Card */}
        <div className="lg:w-80 shrink-0">
          {currentData ? (
            <div
              key={currentData.id}
              className="bg-card border border-border rounded-sm p-6 shadow-sm animate-lift-in"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-8 bg-accent rounded-full" />
                <h2 className="text-xl font-bold text-foreground">
                  {currentData.name}
                </h2>
              </div>

              <div className="text-sm text-muted-foreground mb-4">
                {currentData.plants.length} plant
                {currentData.plants.length > 1 ? "s" : ""}
              </div>

              <div className="space-y-4">
                {Object.entries(groupedPlants).map(([group, locations]) => (
                  <div key={group}>
                    <h3 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                      {group}
                    </h3>
                    <ul className="space-y-1">
                      {locations.map((loc) => (
                        <li
                          key={loc}
                          className="text-sm text-foreground flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
                          {loc}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-sm p-6 shadow-sm">
              <div className="text-center text-muted-foreground">
                <svg
                  className="w-12 h-12 mx-auto mb-3 opacity-30"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
                <p className="text-sm font-medium">Hover over a state</p>
                <p className="text-xs mt-1">
                  to view plant locations and details
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default IndiaPresence;
