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

  const segments = [
    {
      name: "iPhone",
      value: segmentData.iphone,
    },
    {
      name: "Services",
      value: segmentData.services,
    },
    {
      name: "Mac",
      value: segmentData.mac,
    },
    {
      name: "iPad",
      value: segmentData.ipad,
    },
    {
      name: "Wearables",
      value: segmentData.wearables,
    },
  ];

  const iphoneShare =
    (segmentData.iphone / totalRevenue) * 100;

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
        {iphoneShare > 50
          ? "Medium"
          : "Low"}
      </div>
    </div>
  );
}