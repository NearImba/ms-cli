const templateCollection = require('./templateConfigs')
const path = require('path')
const fse = require('fs-extra')
const inquirer = require('inquirer')
const GIT = require('simple-git')()

module.exports = async function (appName, createDir, options) {
    let template = 'mobile'
    if (typeof options.template !== 'undefined') {
        template = options.template
    }
    if (typeof templateCollection[template] !== 'undefined') {
        if (typeof appName === 'undefined') {
            const { ok } = await inquirer.prompt([
                {
                    name: 'ok',
                    type: 'confirm',
                    message: `创建文件模版在当前目录?`
                }
            ])
            if (!ok) {
                return
            }
        }

        try {
            if (appName) {
                await fse.ensureDir(path.resolve(createDir, appName))
            }
            await writeTemplate(path.resolve(createDir, appName || "./"), templateCollection[template])
            const p1 = require(path.resolve(createDir, appName || "./", "package.json"))
            const package = Object.assign(p1, {
                name: appName || "unamed-project",
                version: "1.0.0"
            })
            await fse.remove(path.resolve(createDir, appName || "./", "package.json"))
            await fse.writeJson(path.resolve(createDir, appName || "./", "package.json"), package, { spaces: 2 })
            console.info('完成，请先安装依赖，再npm run dev')
        } catch (err) {
            console.error(err)
        }

    } else {
        console.error('未知模版！')
        console.log('请尝试 npm i zmfe-cli -g 或群里反馈')
    }
}

function getTemplateFromGit( f) {
    return new Promise((resolve, reject) => {
        console.info('正在拉取fe-solutions模版代码,请稍候')
        GIT.clone('git', f, function(r) {
            if(r) {
                reject(r)
            } else {
                console.info('拉取完成')
                resolve()
            }
        })
    })
}

async function writeTemplate(folder, templatePathSuffix) {
    const tempFolderName = 'zmfe' + Date.now()
    await getTemplateFromGit(path.resolve(folder, tempFolderName)).catch(r => {
        console.log(r)
        console.info('git拉取模版失败')
    })
    await fse.copy(path.resolve(folder, tempFolderName, templatePathSuffix), folder)
    await fse.remove(path.resolve(folder, tempFolderName))
}