import MathExpressionEvaluator from "@/components/TextField";

export default function Home() {
  return (
    <div style={{ width: "100vw" }}>
      <h2>PAGE</h2>

      <div
        style={{ display: "flex", flexDirection: "column", padding: "20px" }}>
        <h3 style={{ marginBottom: "20px" }}>Text Field</h3>

        <MathExpressionEvaluator />
      </div>
    </div>
  );
}
