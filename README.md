# git-protect-branches
禁止dev,test分支等合并到feature分支

终端执行npm i husky@8.0.3 git-protect-branches -D

package.json文件的scripts下新增
"prepare": "husky && husky install && gpb && gpb install"

执行npm i
