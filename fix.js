import fs from 'fs';
import path from 'path';

function replaceInFile(filePath, replacements) {
    let content = fs.readFileSync(filePath, 'utf8');
    for (const [from, to] of replacements) {
        content = content.replace(from, to);
    }
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${filePath}`);
}

replaceInFile('src/components/TrendAnalysis/TrendAnalysis.tsx', [
    [/formatter=\{\(value: any, name: any\) =>/g, "formatter={(value: unknown, name: unknown) =>"]
]);

replaceInFile('src/components/CompareCharts/CompareCharts.tsx', [
    [/formatter=\{\(value: any\) =>/g, "formatter={(value: unknown) =>"]
]);

replaceInFile('src/components/CompareExecutiveSummary/CompareExecutiveSummary.tsx', [
    [/import \{ Target \} from "lucide-react";\n/g, ""],
    [/const loserScore = 100 - winnerScore;/g, ""]
]);

replaceInFile('src/components/ComparePanel/ComparePanel.tsx', [
    [/TrendingUp, TrendingDown, Minus, DollarSign, Percent/g, ""]
]);

replaceInFile('src/components/DuPontAnalysis/DuPontAnalysis.tsx', [
    [/const \{ openDrillDown \} = useFinancialData\(\);\n/g, ""]
]);

replaceInFile('src/components/ExportReport/ExportReport.tsx', [
    [/const intelligence = generateExecutiveIntelligence\(/g, "generateExecutiveIntelligence("]
]);

replaceInFile('src/components/ExtractionDebugPanel/ExtractionDebugPanel.tsx', [
    [/const \{ financialData, missingFields \} = responseData;/g, "const { financialData } = responseData;"]
]);

replaceInFile('src/components/UploadZone/UploadZone.tsx', [
    [/import HeroSummary from "\.\.\/HeroSummary\/HeroSummary";\n/g, ""],
    [/const \{ financialData, historicalData, segmentData \} = responseData;/g, "const { financialData } = responseData;"],
    [/const \{/g, "const {"], // Just a dummy, let's target the exact string later. Wait, this might be tricky.
]);

// I will run the script for specific files
