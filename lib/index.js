const fs = require("fs");
const p = require("path");
const { execSync } = require('child_process');
const os = require('os');

function install(dir = '.husky', outerDir = '') {
    try {
        // 复制文件
        fs.copyFileSync(p.join(__dirname, '../pre-push.sh'), p.join(dir, 'pre-push'));
        fs.copyFileSync(p.join(__dirname, '../post-checkout.sh'), p.join(dir, 'post-checkout'));
        fs.copyFileSync(p.join(__dirname, '../preHooks.js'), p.join(outerDir, 'preHooks.js'));

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
