#!/bin/bash

# 当前分支的名称
CURRENT_BRANCH_NAME=$(git branch --show-current)

# 定义不允许合并的分支列表
PROTECTED_BRANCHES=("dev" "test")

# 检查当前分支是否在受保护的分支列表中
for branch in "${PROTECTED_BRANCHES[@]}"; do
    if [ "$CURRENT_BRANCH_NAME" == "$branch" ]; then
        exit 0
    fi
done

while read local_ref local_sha remote_ref remote_sha
do
    # 检查新提交的范围内是否包含来自受保护分支的提交
    for branch in "${PROTECTED_BRANCHES[@]}"; do
        if git rev-list $local_sha | grep -q $(git rev-parse refs/heads/$branch); then
            echo "禁止将 $branch 分支合并到任何其他分支"
            exit 1
        fi
    done
done

exit 0