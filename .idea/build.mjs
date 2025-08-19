// build.mjs
import fs from 'fs/promises';
import path from 'path';
import {fileURLToPath} from 'url';

// 获取当前目录
const __filename = fileURLToPath(import.meta.url);
const currentDir = path.dirname(__filename);
const projectDir = path.join(currentDir, '..');

async function fileExists(filePath) {
    try {
        await fs.access(filePath);
        return true;
    } catch {
        return false;
    }
}

async function incrmentVersion() {
    try {
        const systemJsonPath = path.join(projectDir, 'system.json');

        // 读取 system.json
        const systemJsonContent = await fs.readFile(systemJsonPath, 'utf8');
        const systemJson = JSON.parse(systemJsonContent);

        // 获取当前版本
        const currentVersion = systemJson.version;

        // 检查是否符合 alpha-build-X 格式
        const versionMatch = currentVersion.match(/^(alpha-build)(\d+)$/);
        if (versionMatch) {
            const prefix = versionMatch[1];
            const buildNumber = parseInt(versionMatch[2]);
            const newBuildNumber = buildNumber + 1;
            const newVersion = `${prefix}${newBuildNumber}`;

            // 更新版本号
            systemJson.version = newVersion;

            // 写回文件
            await fs.writeFile(systemJsonPath, JSON.stringify(systemJson, null, 2));

            return newVersion;
        } else {
            console.log(`Current version format "${currentVersion}" does not match expected pattern, skipping increment`);
            return currentVersion;
        }
    } catch (error) {
        console.error('Failed to increment version:', error.message);
        throw error;
    }
}

async function getAllFiles(dir, basePath) {
    let files = [];
    const entries = await fs.readdir(dir, {withFileTypes: true});

    for (const entry of entries) {
        // 跳过排除的目录和文件
        if (entry.name === '.idea' ||
            entry.name === '.git' ||
            entry.name === 'update.zip' ||
            entry.name === 'build.mjs') {
            continue;
        }

        const fullPath = path.join(dir, entry.name);
        const relativePath = path.relative(basePath, fullPath);

        if (entry.isDirectory()) {
            const subFiles = await getAllFiles(fullPath, basePath);
            files = files.concat(subFiles);
        } else {
            files.push({
                fullPath: fullPath,
                archivePath: relativePath
            });
        }
    }

    return files;
}

async function build() {
    try {
        const args = process.argv.slice(2);

        if (args == 'true') {
            console.log(`Publish Mode.`);
            await incrmentVersion();
        } else {
            console.log(`Rebuild Mode.`);
        }

        // 动态导入 adm-zip
        const {default: AdmZip} = await import('adm-zip');

        const outputPath = path.join(projectDir, 'update.zip');

        // 1. 删除已存在的 update.zip
        if (await fileExists(outputPath)) {
            await fs.unlink(outputPath);
        }

        // 2. 创建新的 ZIP 文件
        console.log('Creating zip archive...');
        const zip = new AdmZip();

        // 3. 获取所有需要压缩的文件
        const files = await getAllFiles(projectDir, projectDir);
        console.log(`Adding ${files.length} files to archive...`);

        // 4. 添加文件到 ZIP，保持目录结构
        for (const file of files) {
            const dirPath = path.dirname(file.archivePath);
            zip.addLocalFile(file.fullPath, dirPath === '.' ? '' : dirPath);
        }

        // 5. 写入 ZIP 文件
        zip.writeZip(outputPath);

        console.log('Build completed! update.zip created successfully!');

    } catch (error) {
        console.error('Build failed:', error.message);
        process.exit(1);
    }
}

// 运行构建
build();
