import { MadeWithDyad } from "@/components/made-with-dyad";
import GraphingCalculator from "@/components/GraphingCalculator"; // Import the new component

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-950 p-4">
      <GraphingCalculator /> {/* Render the graphing calculator */}
      <MadeWithDyad />
    </div>
  );
};

export default Index;