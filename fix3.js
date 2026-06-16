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

replaceInFile('src/app/api/upload/route.ts', [
    [/const documentType = formData.get\("documentType"\) as string \| null;\n/g, ""],
    [/const fileContent = formData.get\("fileContent"\) as string \| null; \/\/ Used for text uploaded\n/g, ""],
    [/const fileContent = formData.get\("fileContent"\) as string \| null; \/\/ Used for text upload\n/g, ""],
    [/const metric = metrics\[field as keyof FinancialMetrics\] as any;/g, "const metric = metrics[field as keyof FinancialMetrics] as unknown;"] // Wait, the any type in api/upload/route.ts was on line 47. Wait, the upload API has no 'metrics'. Let's check exactly where.
]);

// CompareExecutiveSummary
replaceInFile('src/components/CompareExecutiveSummary/CompareExecutiveSummary.tsx', [
    [/import \{ Target \} from "lucide-react";\n/g, ""],
    [/const loserScore = 100 - winnerScore;\n/g, ""]
]);

// ComparePanel
replaceInFile('src/components/ComparePanel/ComparePanel.tsx', [
    [/TrendingUp, TrendingDown, Minus, DollarSign, Percent, /g, ""]
]);

// DuPontAnalysis
replaceInFile('src/components/DuPontAnalysis/DuPontAnalysis.tsx', [
    [/const \{ openDrillDown \} = useFinancialData\(\);\n/g, ""] // if still exists
]);

// ExportReport
replaceInFile('src/components/ExportReport/ExportReport.tsx', [
    [/const intelligence = generateExecutiveIntelligence/g, "generateExecutiveIntelligence"] // just call it
]);

// ExtractionDebugPanel
replaceInFile('src/components/ExtractionDebugPanel/ExtractionDebugPanel.tsx', [
    [/missingFields, /g, ""]
]);

// UploadZone
replaceInFile('src/components/UploadZone/UploadZone.tsx', [
    [/metrics, setMetrics,/g, "setMetrics,"],
    [/, ExtractedMetric /g, " "]
]);

// TopHeader
replaceInFile('src/components/layout/TopHeader.tsx', [
    [/Clock, Building2, /g, ""]
]);

// NotificationContext
replaceInFile('src/contexts/NotificationContext.tsx', [
    [/CheckCircle2, Download, AlertCircle, ArrowLeftRight, /g, ""]
]);

// parser.ts
replaceInFile('src/lib/pdf/financial/parser.ts', [
    [/ExtractedMetric, /g, ""]
]);

// InvestmentView
replaceInFile('src/components/AIInsights/InvestmentView.tsx', [
    [/AlertTriangle, /g, ""]
]);
