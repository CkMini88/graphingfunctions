"use client";

import React from 'react';
import { MadeWithDyad } from "@/components/made-with-dyad";
import GraphingCalculator from "@/components/GraphingCalculator"; // Import the GraphingCalculator

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-950 p-4">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8">Welcome to your Graphing Calculator!</h1>
      <GraphingCalculator /> {/* Render the GraphingCalculator component */}
      <MadeWithDyad />
    </div>
  );
};

export default Index;