import { useEffect, useState } from 'react'
import Update from '@/components/update'
import logoVite from './assets/logo-vite.svg'
import logoElectron from './assets/logo-electron.svg'
import './App.scss'
import ToDo from './components/ToDo'

import { getAllFiles } from './fileIO'

console.log('[App.tsx]', `Hello world from Electron ${process.versions.electron}!`)

const toDoListStyle = {
  marginTop:"1rem"
}
const buttonCreateToDoStyle = {
  background:"#6376B0",
  color:"#ffffff"
}

function App() {
  const [count, setCount] = useState(0)
  const [allFiles, setAllFiles] = useState([])


  //Load all toDos created in this system
  useEffect(()=>{

    const getFiles = async()=>{
      const allFiles = await getAllFiles()
      setAllFiles(allFiles)
      console.log(allFiles)
    }

    getFiles()
  },[])

  return (
    <div className='App'>
      <h1 style={{color:"#6395a3"}}>ToDo</h1>
      <button style={buttonCreateToDoStyle}>Create toDo</button>

      <div style={toDoListStyle}>
        {
          allFiles.map((file,index)=><ToDo key={index} title={file.title} content={file.content}/>)
        }

      </div>

      
    </div>
  )
}

export default App
