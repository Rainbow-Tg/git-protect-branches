#!/bin/bash

# 读取配置文件中的分支列表
BRANCHES_TO_CHECK=$(node -e "console.log(require(process.cwd() + '/branches.js').PROTECTED_BRANCHES.join(' '))")

# 当前分支的名称
CURRENT_BRANCH_NAME=$(git branch --show-current)

# 如果是被保护的分支，直接退出 不做校验
for branch in $BRANCHES_TO_CHECK; do
    if [ "$CURRENT_BRANCH_NAME" == "$branch" ]; then
        exit 0
    fi
done

# 在非保护分支上检查是否存在 .danger 文件
if [ -f ".danger_branch" ]; then
    echo "在 ${CURRENT_BRANCH_NAME} 分支上发现 .danger_branch 文件，禁止提交！"
    exit 1
fi

exit 0