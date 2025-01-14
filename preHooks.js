const fs = require('fs')

const GIT_CURRENT_BRANCH = 'git rev-parse --abbrev-ref HEAD'
const exec = require('child_process').exec
const invalidBranches = ['dev', 'test', 'uat']
const invalidTag = '.danger_branch'

const promiseRetrieve = () => {
  return new Promise((resolve, reject) => {
    exec(GIT_CURRENT_BRANCH, (error, stdout) => {
      if (error) {
        reject('查询失败')
      }
      resolve(stdout)
    })
  })
}

async function start() {
  try {
    const branchName = await promiseRetrieve()
    if (!invalidBranches.includes(branchName)) {
      // 当不是非法分支时，检测是否包含非法分支的特殊文件.danger_branch
      const exist = fs.existsSync(invalidTag)
      if (exist) {
        console.log('====存在违法文件，检查分支代码====')
        process.exit(2)
      }
    }
  } catch (e) {
    console.log(e)
  }
}
start()
