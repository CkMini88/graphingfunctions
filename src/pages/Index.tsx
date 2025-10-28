"use client";

import React from 'react';
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-950 p-4">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Hello from Index Page!</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">Checking if the app is rendering.</p>
      <MadeWithDyad />
    </div>
  );
};

export default Index;