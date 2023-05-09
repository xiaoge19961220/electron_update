const { ipcRenderer } = window.require('electron');

export const checkUpdate=()=>{

    ipcRenderer.send('check-update')
}