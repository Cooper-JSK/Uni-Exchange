const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function promptUser(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

async function selectFiles(currentDir, excludePatterns) {
    const selectedFiles = [];

    const files = await fs.promises.readdir(currentDir);
    for (const file of files) {
        const filePath = path.join(currentDir, file);
        const stats = await fs.promises.stat(filePath);

        if (stats.isDirectory()) {
            if (!excludePatterns.includes(file)) {
                const includeFolder = await promptUser(`Include folder '${file}'? (y/n) `);
                if (includeFolder.toLowerCase() === 'y') {
                    const subFiles = await selectFiles(filePath, excludePatterns);
                    selectedFiles.push(...subFiles);
                }
            }
        } else {
            const includeFile = await promptUser(`Include file '${file}'? (y/n) `);
            if (includeFile.toLowerCase() === 'y') {
                selectedFiles.push(filePath);
            }
        }
    }

    return selectedFiles;
}

async function mergeFiles(selectedFiles, outputFilePath) {
    let mergedContent = '';

    for (const filePath of selectedFiles) {
        const fileContent = await fs.promises.readFile(filePath, 'utf-8');
        const sectionHeader = `\n${filePath.toUpperCase()} CODE IS BELOW\n`;
        mergedContent += sectionHeader + fileContent + '\n';
    }

    await fs.promises.writeFile(outputFilePath, mergedContent);
}

async function createOutputDirectory(outputDirPath) {
    try {
        await fs.promises.access(outputDirPath);
    } catch (error) {
        await fs.promises.mkdir(outputDirPath);
    }
}

function getTimestampedFileName() {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    return `merged-repo-${timestamp}.txt`;
}

async function main() {
    const currentDir = process.cwd();

    console.log('Select files and folders to include in the merge:');
    const excludePatterns = ['node_modules']; // Add more patterns if needed
    const selectedFiles = await selectFiles(currentDir, excludePatterns);

    const outputDirName = 'llm_text_transcripts';
    const outputDirPath = path.join(currentDir, outputDirName);
    await createOutputDirectory(outputDirPath);

    const outputFileName = getTimestampedFileName();
    const outputFilePath = path.join(outputDirPath, outputFileName);
    await mergeFiles(selectedFiles, outputFilePath);

    console.log(`Merged repository saved to: ${outputFilePath}`);
    rl.close();
}

main().catch(console.error);