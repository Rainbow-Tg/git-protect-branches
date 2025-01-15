#!/bin/bash

# 读取配置文件中的分支列表
BRANCHES_TO_CHECK=$(node -e "console.log(require(process.cwd() + '/branches.js').PROTECTED_BRANCHES.join(' '))")

# 获取当前分支名
current_branch=$(git branch --show-current)

# 检查当前分支是否在配置的分支列表中
for branch in $BRANCHES_TO_CHECK; do
    if [[ "$current_branch" == "$branch" ]]; then
        # 检查 danger 文件是否存在

        if [ ! -f ".danger_branch" ]; then
            echo "正在创建 .danger_branch"
            touch .danger_branch
            echo ".danger_branch 已创建"
        fi
        break
    fi
done