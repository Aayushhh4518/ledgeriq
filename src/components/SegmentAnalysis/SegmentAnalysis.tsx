import { SegmentData } from "@/types/financial";

interface SegmentAnalysisProps {
  data?: SegmentData | null;
}

export default function SegmentAnalysis({ data }: SegmentAnalysisProps) {
  if (!data) return null;

  const totalSegments = Object.values(data).filter((val) => typeof val === 'number' && val > 0).length;

  return (
    <div className="border rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">Segment Analysis</h2>

      <p className="mb-4 text-gray-500">
        Total segments detected: {totalSegments}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-gray-100 p-4 rounded dark:bg-gray-800">
          <p className="text-sm text-gray-500">iPhone</p>
          <p className="font-semibold text-lg">${data.iphone.toLocaleString()}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded dark:bg-gray-800">
          <p className="text-sm text-gray-500">Mac</p>
          <p className="font-semibold text-lg">${data.mac.toLocaleString()}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded dark:bg-gray-800">
          <p className="text-sm text-gray-500">iPad</p>
          <p className="font-semibold text-lg">${data.ipad.toLocaleString()}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded dark:bg-gray-800">
          <p className="text-sm text-gray-500">Wearables, Home & Accessories</p>
          <p className="font-semibold text-lg">${data.wearables.toLocaleString()}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded dark:bg-gray-800">
          <p className="text-sm text-gray-500">Services</p>
          <p className="font-semibold text-lg">${data.services.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}