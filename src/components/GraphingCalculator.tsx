"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import * as math from "mathjs";
import Plotly from "plotly.js";
import { MadeWithDyad } from "@/components/made-with-dyad";


const GraphingCalculator: React.FC = () => {
  const [functionString, setFunctionString] = useState<string>("x^2");
  const [xMinInput, setXMinInput] = useState<string>("-10");
  const [xMaxInput, setXMaxInput] = useState<string>("10");
  const [error, setError] = useState<string | null>(null);
  const graphDivRef = useRef<HTMLDivElement>(null);

  const plotFunction = useCallback(() => {
    if (!graphDivRef.current) return;

    setError(null); // Clear previous errors

    if (!functionString.trim()) {
      setError("Please enter a function to graph.");
      Plotly.purge(graphDivRef.current);
      return;
    }

    const parsedXMin = parseFloat(xMinInput);
    const parsedXMax = parseFloat(xMaxInput);

    if (isNaN(parsedXMin) || isNaN(parsedXMax)) {
      setError("Min X and Max X must be valid numbers.");
      Plotly.purge(graphDivRef.current);
      return;
    }

    if (parsedXMin >= parsedXMax) {
      setError("Min X must be less than Max X.");
      Plotly.purge(graphDivRef.current);
      return;
    }

    let compiledFunction: math.EvalFunction;
    try {
      compiledFunction = math.compile(functionString);
    } catch (e: any) {
      setError(`Syntax Error: ${e.message}`);
      Plotly.purge(graphDivRef.current);
      return;
    }

    const xValues: number[] = [];
    const yValues: number[] = [];
    const step = (parsedXMax - parsedXMin) / 400; // Generate 400 points for smoothness

    for (let x = parsedXMin; x <= parsedXMax; x += step) {
      try {
        const y = compiledFunction.evaluate({ x: x });
        if (typeof y === "number" && isFinite(y)) {
          xValues.push(x);
          yValues.push(y);
        }
      } catch (e) {
        // Ignore points where the function is undefined (e.g., sqrt(-1))
        // mathjs will often return NaN or throw for these, which we handle by not pushing to arrays
      }
    }

    if (xValues.length === 0) {
      setError("No valid points could be generated for the given function within the specified range. Try a different function or range.");
      Plotly.purge(graphDivRef.current);
      return;
    }

    const data: Plotly.Data[] = [
      {
        x: xValues,
        y: yValues,
        mode: "lines",
        type: "scatter",
        name: functionString,
        line: {
          color: "rgb(70, 130, 180)", // SteelBlue
          width: 2,
        },
      },
    ];

    const layout: Partial<Plotly.Layout> = {
      title: `Graph of y = ${functionString}`,
      xaxis: {
        title: "x",
        zeroline: true,
        zerolinecolor: "#969696",
        gridcolor: "#bdbdbd",
        range: [parsedXMin, parsedXMax], // Set x-axis range based on user input
      },
      yaxis: {
        title: "y",
        zeroline: true,
        zerolinecolor: "#969696",
        gridcolor: "#bdbdbd",
        autorange: true, // Keep y-axis auto-ranging for best fit
      },
      hovermode: "closest",
      responsive: true,
      margin: {
        l: 50,
        r: 50,
        b: 50,
        t: 50,
      },
    };

    Plotly.newPlot(graphDivRef.current, data, layout, {
      displayModeBar: false, // Hide Plotly's mode bar for a cleaner look
    });
  }, [functionString, xMinInput, xMaxInput]); // Re-run plotFunction if range inputs change

  useEffect(() => {
    plotFunction();
    // Cleanup Plotly on component unmount
    return () => {
      if (graphDivRef.current) {
        Plotly.purge(graphDivRef.current);
      }
    };
  }, [plotFunction]);

  const handleFunctionInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFunctionString(e.target.value);
  };

  const handleXMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setXMinInput(e.target.value);
  };

  const handleXMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setXMaxInput(e.target.value);
  };

  const handleGraphClick = () => {
    plotFunction();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      plotFunction();
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          High School Graphing Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="function-input">Enter Function (e.g., x^2 - 3*x + 2, sin(x), sqrt(x+2))</Label>
            <Input
              id="function-input"
              placeholder="e.g., x^2 - 3*x + 2"
              value={functionString}
              onChange={handleFunctionInputChange}
              onKeyPress={handleKeyPress}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="xmin-input">Min X</Label>
              <Input
                id="xmin-input"
                type="number"
                value={xMinInput}
                onChange={handleXMinInputChange}
                onKeyPress={handleKeyPress}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="xmax-input">Max X</Label>
              <Input
                id="xmax-input"
                type="number"
                value={xMaxInput}
                onChange={handleXMaxInputChange}
                onKeyPress={handleKeyPress}
              />
            </div>
          </div>
          <Button onClick={handleGraphClick} className="w-full">
            Graph
          </Button>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div
            ref={graphDivRef}
            className="w-full h-[400px] bg-gray-50 dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-700"
          >
            {/* Plotly graph will be rendered here */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GraphingCalculator;