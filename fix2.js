import fs from 'fs';

function replaceInFile(filePath, replacements) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        for (const [from, to] of replacements) {
            content = content.replace(from, to);
        }
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${filePath}`);
    } catch (e) {
        console.error(`Error updating ${filePath}: ${e.message}`);
    }
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
    [/TrendingUp, TrendingDown, Minus, DollarSign, Percent, /g, ""]
]);

replaceInFile('src/components/DuPontAnalysis/DuPontAnalysis.tsx', [
    // We already moved openDrillDown up, but if it's unused now, we can remove it.
    // Wait, earlier we moved `const { openDrillDown } = useFinancialData();` up.
    // If it's unused, let's remove it entirely.
    [/const \{ openDrillDown \} = useFinancialData\(\);\n/g, ""]
]);

replaceInFile('src/components/ExportReport/ExportReport.tsx', [
    [/const intelligence = generateExecutiveIntelligence\(/g, "generateExecutiveIntelligence("]
]);

replaceInFile('src/components/ExtractionDebugPanel/ExtractionDebugPanel.tsx', [
    [/const \{ financialData, missingFields \} = responseData;/g, "const { financialData } = responseData;"]
]);

replaceInFile('src/components/layout/TopHeader.tsx', [
    [/Clock, Building2, /g, ""]
]);

replaceInFile('src/contexts/NotificationContext.tsx', [
    [/CheckCircle2, Download, AlertCircle, ArrowLeftRight, /g, ""]
]);

replaceInFile('src/lib/pdf/financial/parser.ts', [
    [/ExtractedMetric, /g, ""]
]);

replaceInFile('src/components/AIInsights/InvestmentView.tsx', [
    [/AlertTriangle, /g, ""]
]);

replaceInFile('src/components/BenchmarkPanel/BenchmarkPanel.tsx', [
    [/CheckCircle, /g, ""]
]);
