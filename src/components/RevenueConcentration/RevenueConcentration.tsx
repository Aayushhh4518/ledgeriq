interface Props {
  totalRevenue: number;
  segmentData: {
    iphone: number;
    mac: number;
    ipad: number;
    wearables: number;
    services: number;
  };
}

export default function RevenueConcentration({
  totalRevenue,
  segmentData,
}: Props) {
  const largestSegment = Math.max(
    segmentData.iphone,
    segmentData.mac,
    segmentData.ipad,
    segmentData.wearables,
    segmentData.services
  );

  const concentration =
    (largestSegment / totalRevenue) * 100;

  let risk = "LOW";

  if (concentration > 60) {
    risk = "HIGH";
  } else if (concentration > 40) {
    risk = "MEDIUM";
  }

  return (
    <div className="border rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">
        Revenue Concentration
      </h2>

      <p>
        Largest segment contributes:
      </p>

      <h3 className="text-4xl font-bold mt-2">
        {concentration.toFixed(1)}%
      </h3>

      <p className="mt-4">
        Risk Level: <strong>{risk}</strong>
      </p>
    </div>
  );
}