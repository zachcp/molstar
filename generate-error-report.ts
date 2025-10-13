#!/usr/bin/env -S deno run --allow-read --allow-run --allow-write

/**
 * Generate an organized error report from `deno publish --dry-run`
 * Groups errors by file and type for easier fixing
 */

interface ErrorEntry {
  type: string;
  file: string;
  line: number;
  column: number;
  snippet?: string;
}

interface FileErrors {
  file: string;
  errors: {
    missingReturnType: ErrorEntry[];
    missingType: ErrorEntry[];
    unsupportedSuperClass: ErrorEntry[];
  };
  total: number;
}

async function getErrors(): Promise<ErrorEntry[]> {
  const command = new Deno.Command("deno", {
    args: ["publish", "--dry-run"],
    stdout: "piped",
    stderr: "piped",
  });

  const { stdout, stderr } = await command.output();
  let output =
    new TextDecoder().decode(stdout) + new TextDecoder().decode(stderr);

  // Strip ANSI color codes
  output = output.replace(/\x1b\[[0-9;]*m/g, "");

  const errors: ErrorEntry[] = [];
  const lines = output.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check for error types
    if (line.includes("error[missing-explicit-return-type]")) {
      const pathLine = lines[i + 1];
      const match = pathLine.match(/\s*-->\s+(.+):(\d+):(\d+)$/);
      if (match) {
        let [, filePath, lineNum, colNum] = match;
        if (filePath.includes("/molstar/")) {
          filePath = filePath.substring(filePath.indexOf("/molstar/") + 9);
        }
        const snippet = i + 3 < lines.length ? lines[i + 3].trim() : undefined;
        errors.push({
          type: "missing-explicit-return-type",
          file: filePath,
          line: parseInt(lineNum, 10),
          column: parseInt(colNum, 10),
          snippet,
        });
      }
    } else if (line.includes("error[missing-explicit-type]")) {
      const pathLine = lines[i + 1];
      const match = pathLine.match(/\s*-->\s+(.+):(\d+):(\d+)$/);
      if (match) {
        let [, filePath, lineNum, colNum] = match;
        if (filePath.includes("/molstar/")) {
          filePath = filePath.substring(filePath.indexOf("/molstar/") + 9);
        }
        const snippet = i + 3 < lines.length ? lines[i + 3].trim() : undefined;
        errors.push({
          type: "missing-explicit-type",
          file: filePath,
          line: parseInt(lineNum, 10),
          column: parseInt(colNum, 10),
          snippet,
        });
      }
    } else if (line.includes("error[unsupported-super-class-expr]")) {
      const pathLine = lines[i + 1];
      const match = pathLine.match(/\s*-->\s+(.+):(\d+):(\d+)$/);
      if (match) {
        let [, filePath, lineNum, colNum] = match;
        if (filePath.includes("/molstar/")) {
          filePath = filePath.substring(filePath.indexOf("/molstar/") + 9);
        }
        const snippet = i + 3 < lines.length ? lines[i + 3].trim() : undefined;
        errors.push({
          type: "unsupported-super-class-expr",
          file: filePath,
          line: parseInt(lineNum, 10),
          column: parseInt(colNum, 10),
          snippet,
        });
      }
    }
  }

  return errors;
}

function groupByFile(errors: ErrorEntry[]): FileErrors[] {
  const fileMap = new Map<string, FileErrors>();

  for (const error of errors) {
    if (!fileMap.has(error.file)) {
      fileMap.set(error.file, {
        file: error.file,
        errors: {
          missingReturnType: [],
          missingType: [],
          unsupportedSuperClass: [],
        },
        total: 0,
      });
    }

    const fileErrors = fileMap.get(error.file)!;
    fileErrors.total++;

    switch (error.type) {
      case "missing-explicit-return-type":
        fileErrors.errors.missingReturnType.push(error);
        break;
      case "missing-explicit-type":
        fileErrors.errors.missingType.push(error);
        break;
      case "unsupported-super-class-expr":
        fileErrors.errors.unsupportedSuperClass.push(error);
        break;
    }
  }

  return Array.from(fileMap.values()).sort((a, b) => b.total - a.total);
}

function generateMarkdownReport(fileErrors: FileErrors[]): string {
  let report = "# Molstar JSR Publication Error Report\n\n";
  report += `Generated: ${new Date().toISOString()}\n\n`;

  // Summary
  const totalErrors = fileErrors.reduce((sum, f) => sum + f.total, 0);
  const totalReturnType = fileErrors.reduce(
    (sum, f) => sum + f.errors.missingReturnType.length,
    0,
  );
  const totalType = fileErrors.reduce(
    (sum, f) => sum + f.errors.missingType.length,
    0,
  );
  const totalSuperClass = fileErrors.reduce(
    (sum, f) => sum + f.errors.unsupportedSuperClass.length,
    0,
  );

  report += "## Summary\n\n";
  report += `- **Total Errors**: ${totalErrors}\n`;
  report += `- **Files with Errors**: ${fileErrors.length}\n\n`;
  report += "### By Error Type\n\n";
  report += `- **Missing Explicit Return Type**: ${totalReturnType} errors\n`;
  report += `- **Missing Explicit Type**: ${totalType} errors\n`;
  report += `- **Unsupported Super Class Expression**: ${totalSuperClass} errors\n\n`;

  // Top 20 files with most errors
  report += "## Top 20 Files with Most Errors\n\n";
  report += "| File | Total | Return Types | Types | Super Class |\n";
  report += "|------|-------|--------------|-------|-------------|\n";

  for (const file of fileErrors.slice(0, 20)) {
    const shortFile = file.file.replace("src/", "");
    report += `| ${shortFile} | ${file.total} | ${file.errors.missingReturnType.length} | ${file.errors.missingType.length} | ${file.errors.unsupportedSuperClass.length} |\n`;
  }

  report += "\n## Detailed Error List\n\n";

  // Group files by directory
  const dirMap = new Map<string, FileErrors[]>();
  for (const fileError of fileErrors) {
    const dir = fileError.file.split("/").slice(0, -1).join("/") || "root";
    if (!dirMap.has(dir)) {
      dirMap.set(dir, []);
    }
    dirMap.get(dir)!.push(fileError);
  }

  const sortedDirs = Array.from(dirMap.entries()).sort(([a], [b]) =>
    a.localeCompare(b),
  );

  for (const [dir, files] of sortedDirs) {
    report += `### Directory: \`${dir}\`\n\n`;

    for (const file of files) {
      report += `#### \`${file.file.split("/").pop()}\` (${file.total} errors)\n\n`;

      if (file.errors.missingReturnType.length > 0) {
        report += "**Missing Explicit Return Types:**\n\n";
        for (const error of file.errors.missingReturnType) {
          report += `- Line ${error.line}:${error.column}\n`;
          if (error.snippet) {
            report += `  \`\`\`typescript\n  ${error.snippet}\n  \`\`\`\n`;
          }
        }
        report += "\n";
      }

      if (file.errors.missingType.length > 0) {
        report += "**Missing Explicit Types:**\n\n";
        for (const error of file.errors.missingType) {
          report += `- Line ${error.line}:${error.column}\n`;
          if (error.snippet) {
            report += `  \`\`\`typescript\n  ${error.snippet}\n  \`\`\`\n`;
          }
        }
        report += "\n";
      }

      if (file.errors.unsupportedSuperClass.length > 0) {
        report += "**Unsupported Super Class Expressions:**\n\n";
        for (const error of file.errors.unsupportedSuperClass) {
          report += `- Line ${error.line}:${error.column}\n`;
          if (error.snippet) {
            report += `  \`\`\`typescript\n  ${error.snippet}\n  \`\`\`\n`;
          }
        }
        report += "\n";
      }
    }
  }

  return report;
}

function generateCSVReport(fileErrors: FileErrors[]): string {
  let csv = "File,Line,Column,Error Type\n";

  for (const file of fileErrors) {
    for (const error of file.errors.missingReturnType) {
      csv += `"${file.file}",${error.line},${error.column},missing-explicit-return-type\n`;
    }
    for (const error of file.errors.missingType) {
      csv += `"${file.file}",${error.line},${error.column},missing-explicit-type\n`;
    }
    for (const error of file.errors.unsupportedSuperClass) {
      csv += `"${file.file}",${error.line},${error.column},unsupported-super-class-expr\n`;
    }
  }

  return csv;
}

async function main() {
  console.log("Analyzing deno publish errors...\n");

  const errors = await getErrors();
  console.log(`Found ${errors.length} total errors\n`);

  const fileErrors = groupByFile(errors);
  console.log(`Across ${fileErrors.length} files\n`);

  console.log("Generating reports...\n");

  // Generate Markdown report
  const markdownReport = generateMarkdownReport(fileErrors);
  await Deno.writeTextFile("JSR-ERROR-REPORT.md", markdownReport);
  console.log("✓ Generated JSR-ERROR-REPORT.md");

  // Generate CSV report
  const csvReport = generateCSVReport(fileErrors);
  await Deno.writeTextFile("JSR-ERROR-REPORT.csv", csvReport);
  console.log("✓ Generated JSR-ERROR-REPORT.csv");

  // Generate JSON report for programmatic access
  await Deno.writeTextFile(
    "JSR-ERROR-REPORT.json",
    JSON.stringify(fileErrors, null, 2),
  );
  console.log("✓ Generated JSR-ERROR-REPORT.json");

  console.log("\n=== Summary ===");
  console.log(
    `Total errors: ${errors.length} across ${fileErrors.length} files`,
  );
  console.log(
    `Top 5 files:\n${fileErrors
      .slice(0, 5)
      .map((f) => `  - ${f.file}: ${f.total} errors`)
      .join("\n")}`,
  );
}

if (import.meta.main) {
  await main();
}
