interface Props {
  score: number;
}

export default function InvestmentVerdict({
  score,
}: Props) {

  let verdict = "";
  let confidence = score;

  if (score >= 80) {
    verdict = "STRONG BUY";
  } else if (score >= 65) {
    verdict = "BUY";
  } else if (score >= 50) {
    verdict = "HOLD";
  } else if (score >= 35) {
    verdict = "WEAK HOLD";
  } else {
    verdict = "AVOID";
  }

  return (
    <div className="border rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">
        Investment Verdict
      </h2>

      <div className="space-y-2">
        <p className="text-4xl font-bold">
          {verdict}
        </p>

        <p className="text-lg text-gray-400">
          Confidence: {confidence}%
        </p>
      </div>
    </div>
  );
}