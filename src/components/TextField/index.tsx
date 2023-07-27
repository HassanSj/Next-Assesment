"use client";

import React, { useState } from "react";

interface ExpressionVariable {
  name: string;
  value: number | string; // Use string type for the value to handle 'x' placeholder
}

const arr: ExpressionVariable[] = [
  { name: "Cars", value: 50 },
  { name: "Bike", value: 20 },
  { name: "Apple", value: 10 },
  { name: "Chair", value: 70 },
];

const MathExpressionEvaluator: React.FC = () => {
  const [variables, setVariables] = useState<ExpressionVariable[]>([
    { name: "Cars", value: 50 },
    { name: "Bike", value: 20 },
    { name: "Apple", value: 10 },
    { name: "Chair", value: 70 },
  ]);
  const [expression, setExpression] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExpression(event.target.value);

    const filtered = variables.filter((variable) =>
      variable.name.toLowerCase().includes(event.target.value.toLowerCase())
    );

    setVariables(filtered);
  };

  const handleEditVariable = (variableName: string) => {
    const updatedVariables = variables.map((variable) =>
      variable.name === variableName ? { ...variable, value: "x" } : variable
    );

    setVariables(updatedVariables);
  };

  const evaluateExpression = () => {
    try {
      let evaluatedExpression = expression;
      variables.forEach((variable) => {
        evaluatedExpression = evaluatedExpression.replace(
          new RegExp(`\\b${variable.name}\\b`, "g"),
          variable.value.toString()
        );
      });

      const calculatedResult = eval(evaluatedExpression);

      setResult(calculatedResult);
    } catch (error) {
      setResult(null);
    }
  };

  const handleVariableValueChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    variableName: string
  ) => {
    const updatedVariables = variables.map((variable) =>
      variable.name === variableName
        ? { ...variable, value: event.target.value }
        : variable
    );
    setVariables(updatedVariables);
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        Array:{" "}
        {arr.map((ele) => (
          <div style={{ paddingRight: "20px" }} key={ele.name}>
            {ele.name} | {ele.value}
          </div>
        ))}
      </div>
      <input type="text" value={expression} onChange={handleChange} />
      <button onClick={evaluateExpression}>Calculate</button>
      {variables.map((variable) => (
        <div key={variable.name}>
          {variable.name} |{" "}
          {variable.value === "x" ? (
            <input
              type="number"
              value=""
              placeholder="Enter a value"
              onChange={(event) =>
                handleVariableValueChange(event, variable.name)
              }
            />
          ) : (
            <span onClick={() => handleEditVariable(variable.name)}>
              {variable.value}
            </span>
          )}
        </div>
      ))}

      <div style={{ margin: "20px" }}>
        {result !== null && <div>Result: {result}</div>}
      </div>
    </div>
  );
};

export default MathExpressionEvaluator;
