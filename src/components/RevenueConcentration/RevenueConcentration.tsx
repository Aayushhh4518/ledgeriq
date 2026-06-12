interface RevenueConcentrationProps {
  segmentData: Record<string, number>;
}

export default function RevenueConcentration({
  segmentData,
}: RevenueConcentrationProps) {
  const segments = Object.entries(segmentData || {})
    .map(([key, value]) => ({
      name: key,
      value,
    }))
    .sort((a, b) => b.value - a.value);

  const totalRevenue = segments.reduce((sum, seg) => sum + seg.value, 0);

  const highestConcentration = segments.length > 0
    ? (segments[0].value / totalRevenue) * 100
    : 0;

  return (
    <div className="border rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">
        Revenue Concentration
      </h2>

      <div className="space-y-3">
        {segments.map((segment) => (
          <div key={segment.name}>
            <div className="flex justify-between">
              <span>{segment.name}</span>

              <span>
                {(
                  (segment.value / totalRevenue) *
                  100
                ).toFixed(1)}
                %
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <strong>
          Concentration Risk:
        </strong>{" "}
        {highestConcentration > 50
          ? "Medium"
          : "Low"}
      </div>
    </div>
  );
}