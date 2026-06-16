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

replaceInFile('src/components/DuPontAnalysis/DuPontAnalysis.tsx', [
    [/import \{ useFinancialData \} from "@\/contexts\/FinancialContext";\n/g, ""]
]);

replaceInFile('src/components/ExportReport/ExportReport.tsx', [
    [/, useMemo /g, " "]
]);

replaceInFile('src/components/layout/TopHeader.tsx', [
    [/Clock,\n  Building2,\n  /g, ""]
]);

replaceInFile('src/contexts/NotificationContext.tsx', [
    [/CheckCircle2,\n  Download,\n  AlertCircle,\n  ArrowLeftRight,\n  /g, ""]
]);

replaceInFile('src/lib/pdf/financial/parser.ts', [
    [/ExtractedMetric,\n  /g, ""]
]);
