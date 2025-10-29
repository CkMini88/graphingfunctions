"use client";

import React from 'react';
// import { MadeWithDyad } from "@/components/made-with-dyad"; // Removed import
import GraphingCalculator from "@/components/GraphingCalculator";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-950 p-4">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8">Welcome to your Calculators!</h1>
      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-5xl">
        <div className="flex-1">
          <GraphingCalculator />
        </div>
        {/* ScientificCalculator component removed */}
      </div>
      {/* <MadeWithDyad /> Removed the component */}
    </div>
  );
};

export default Index;