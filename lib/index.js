const fs = require("fs");
const p = require("path");
const { execSync } = require('child_process');
const os = require('os');

function install(dir = '.husky', outerDir = '') {
    try {
        // 定义需要复制的文件映射
        const filesToCopy = [
            { src: '../pre-push.sh', dest: p.join(dir, 'pre-push') },
            { src: '../post-checkout.sh', dest: p.join(dir, 'post-checkout') },
            { src: '../preHooks.js', dest: p.join(outerDir, 'preHooks.js') },
            { src: '../branches.js', dest: p.join(outerDir, 'branches.js') }
        ];

        // 遍历并复制文件，先检查目标文件是否存在
        filesToCopy.forEach(({ src, dest }) => {
            if (!fs.existsSync(dest)) {
                fs.copyFileSync(p.join(__dirname, src), dest);
            }
        });

        // 只在 macOS 系统下设置执行权限
        if (os.platform() === 'darwin') {
            execSync(`chmod +x ${p.join(dir, 'pre-push')}`);
            execSync(`chmod +x ${p.join(dir, 'post-checkout')}`);
        }
        
        console.log('Git hooks installed successfully!');
    } catch (error) {
        console.error('安装 git hooks 时发生错误:', error.message);
        throw error;
    }
}

exports.install = install;
