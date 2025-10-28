"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as math from "mathjs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const ScientificCalculator: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleButtonClick = (value: string) => {
    setError(null);
    if (value === "=") {
      try {
        const calculatedResult = math.evaluate(input);
        setResult(calculatedResult.toString());
        setInput(calculatedResult.toString()); // Set input to result for chained operations
      } catch (e: any) {
        setError("Invalid expression");
        setResult("Error");
      }
    } else if (value === "C") {
      setInput("");
      setResult("");
      setError(null);
    } else if (value === "DEL") {
      setInput((prev) => prev.slice(0, -1));
    } else if (value === "sqrt") {
      setInput((prev) => prev + "sqrt(");
    } else if (value === "log") {
      setInput((prev) => prev + "log(");
    } else if (value === "sin") {
      setInput((prev) => prev + "sin(");
    } else if (value === "cos") {
      setInput((prev) => prev + "cos(");
    } else if (value === "tan") {
      setInput((prev) => prev + "tan(");
    } else if (value === "^") {
      setInput((prev) => prev + "^");
    } else if (value === "pi") {
      setInput((prev) => prev + "pi");
    } else if (value === "e") {
      setInput((prev) => prev + "e");
    } else {
      setInput((prev) => prev + value);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setError(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleButtonClick("=");
    }
  };

  const buttons = [
    ["C", "DEL", "(", ")"],
    ["7", "8", "9", "/"],
    ["4", "5", "6", "*"],
    ["1", "2", "3", "-"],
    ["0", ".", "=", "+"],
    ["sin", "cos", "tan", "^"],
    ["sqrt", "log", "pi", "e"],
  ];

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Scientific Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <Input
            type="text"
            className="text-right text-2xl p-4 mb-2"
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="0"
          />
          <Input
            type="text"
            className="text-right text-3xl font-bold p-4 bg-gray-100 dark:bg-gray-800"
            value={result}
            readOnly
            placeholder="Result"
          />
          {error && (
            <Alert variant="destructive" className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="grid grid-cols-4 gap-2 mt-4">
            {buttons.flat().map((btn) => (
              <Button
                key={btn}
                onClick={() => handleButtonClick(btn)}
                className={`
                  ${["C", "DEL"].includes(btn) ? "bg-red-500 hover:bg-red-600 text-white" : ""}
                  ${["=", "+", "-", "*", "/"].includes(btn) ? "bg-blue-500 hover:bg-blue-600 text-white" : ""}
                  ${["sin", "cos", "tan", "sqrt", "log", "^", "pi", "e", "(", ")"].includes(btn) ? "bg-purple-500 hover:bg-purple-600 text-white" : ""}
                  ${!["C", "DEL", "=", "+", "-", "*", "/", "sin", "cos", "tan", "sqrt", "log", "^", "pi", "e", "(", ")"].includes(btn) ? "bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white" : ""}
                  ${btn === "=" ? "col-span-1" : ""}
                `}
              >
                {btn}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScientificCalculator;