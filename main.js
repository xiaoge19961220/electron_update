const { app, BrowserWindow, ipcMain,dialog } = require('electron')
const path = require('path')
const log = require('electron-log');
const { autoUpdater } = require('electron-updater')
const env = process.env.NODE_ENV || 'development';
require('dotenv').config({ path: `.env.${env}` });

// 获取当前的环境变量
// const env = process.env.NODE_ENV;
if (env === 'development') {
  log.info('开发环境');
  log.info(process.env.MY_VAR)
} else if (env === 'production') {
  log.info('生产环境');
  log.info(process.env.MY_VAR)
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }

  })

  autoUpdater.autoDownload = false

//开发使用 生产存在安全隐患
  Object.defineProperty(app, 'isPackaged', {
    get() {
      return true;
    }
  });


  // 主进程：执行更新版本检查
  ipcMain.on('check-update', () => {
    autoUpdater.checkForUpdates()
    log.info('检查更新')
  })

  autoUpdater.on('error', (error) => {
    log.error('检查更新失败')
    dialog.showMessageBox({
      type: 'error',
      title: '检查更新',
      message: '检查更新失败'
    })
  })


  autoUpdater.on('update-available', (info) => {
    log.info('有可用更新')
    dialog.showMessageBox({
      type: 'info',
      title: '更新提示',
      message: '软件需要更新，您是否立即更新？',
      buttons: ['推迟', '立即更新']
    }).then((res) => {
      log.warn('index:' + res.response)
      if (res.response === 1) {
        log.warn('选择升级')
        autoUpdater.downloadUpdate()
      } else {
        log.warn('选择不升级:')
      }
    })
  })

  // 检查更新时触发
  autoUpdater.on('update-available', (res) => {
    log.warn('检查更新时触发')
    log.warn(res)
    dialog.showMessageBox({
      title: '检查更新',
      message: '正在检查更新'
    })
  })

  // 没有可用更新
  autoUpdater.on('update-not-available', () => {
    log.warn('没有可用更新')
    dialog.showMessageBox({
      title: '已是最新版',
      message: '当前版本是最新版本。'
    })
  })

  // 安装更新
  autoUpdater.on('update-downloaded', (res) => {
    // console.log(4);
    log.warn(res)
    log.warn('下载完毕！提示安装更新')
    dialog.showMessageBox({
      title: '升级提示！',
      message: '已自动升级为最新版，请等待程序安装完成并重启应用！'
    }, () => {
      log.warn('确认安装')
      setImmediate(() => autoUpdater.quitAndInstall(true, true))
    })
  })
  // 执行 重启应用程序并下载后安装更新（只能在update-downloaded发出后调用）
  // autoUpdater.quitAndInstall()

  // 显示入口文件内容
  //判断是不是开发环境
  if (env === 'development'){
    mainWindow.loadURL('http://localhost:3000/')
    mainWindow.webContents.openDevTools();
  }else{
    mainWindow.loadFile('www/index.html')
  }

  // 打开调试模式
  mainWindow.webContents.openDevTools();
}

// 初始化
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

