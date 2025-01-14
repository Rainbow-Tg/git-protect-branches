#!/bin/bash

# 当前分支的名称
CURRENT_BRANCH_NAME=$(git branch --show-current)

# 定义豁免检查的分支列表
EXEMPT_BRANCHES=("dev" "test" "uat")

# 如果是豁免分支，直接退出
for branch in "${EXEMPT_BRANCHES[@]}"; do
    if [ "$CURRENT_BRANCH_NAME" == "$branch" ]; then
        exit 0
    fi
done

# 在非豁免分支上检查是否存在 .danger 文件
if [ -f ".danger_branch" ]; then
    echo "在非 dev/test/uat 分支上发现 .danger_branch 文件，禁止提交！"
    exit 1
fi

exit 0