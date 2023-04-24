

function App() {
  const  {ipcRenderer} = require('electron')
  const update=()=>{
    // 渲染进程：主动触发版本检测事件
    ipcRenderer.send('check-update')
  }
  return (
    <>
     <div>hello1</div>
     <div>hello3</div>
     <div>hello2</div>
     <button onClick={update}>检查更新</button>
     {/* <div>hello1</div> */}
    </>
  )
}

export default App
