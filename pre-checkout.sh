#!/bin/bash

# 可配置的分支名列表，用空格分隔
BRANCHES_TO_CHECK="dev test hook-dev hook-uat hook-test"

# 获取当前分支名
current_branch=$(git branch --show-current)

# 检查当前分支是否在配置的分支列表中
for branch in $BRANCHES_TO_CHECK; do
    if [[ "$current_branch" == "$branch" ]]; then
        # 检查 danger 文件是否存在

        if [ ! -f ".danger_branch" ]; then
            echo "正在创建 danger_branch."
            touch .danger_branch
            echo ".danger_branch 已创建"
        fi
        break
    fi
done