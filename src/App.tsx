import {checkUpdate} from './utils/utils'

function App() {
  const update=()=>{
    // 渲染进程：主动触发版本检测事件
    checkUpdate()
  }
  return (
    <>
     <div>hello1</div>
     <div>hello2</div>
     <div>hello3</div>
     <button onClick={update}>检查更新</button>
     {/* <div>hello1</div> */}
    </>
  )
}

export default App
