import { useContext, useEffect, useState } from 'react'
import Update from '@/components/update'
import logoVite from './assets/logo-vite.svg'
import logoElectron from './assets/logo-electron.svg'
import './App.scss'
import ToDo from './components/ToDo'

import { getAllFiles } from './fileIO'
import actions from './actions'
import {GlobalContext} from "./contexts/GlobalContext"
import { Box } from '@mui/material'

console.log('[App.tsx]', `Hello world from Electron ${process.versions.electron}!`)

const toDoListStyle = {
  marginTop:"1rem"
}
const buttonCreateToDoStyle = {
  background:"#6376B0",
  color:"#ffffff",
  marginBottom:"20px"
}

function App() {

  const {allFiles, setAllFiles} = useContext(GlobalContext)!

  useEffect(()=>{
    console.log(allFiles,"aaaaaa")

  },[])

  return (
    <div className='App'>
      <h1 style={{color:"#6395a3"}}>ToDo</h1>

      <ToDo title="" content="" type={actions.create}/>

      <div style={toDoListStyle}>
        {allFiles.length===0? <Box>No ToDo</Box>:
          allFiles.map((file:{id:string,title:string,content:string})=><ToDo
          key={file.id}
          id = {file.id}
          title={file.title} 
          content={file.content} 
          type={actions.edit}/>)
        }

      </div>

      
    </div>
  )
}

export default App
