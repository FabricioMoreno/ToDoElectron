import { useEffect, useState } from 'react'
import Update from '@/components/update'
import logoVite from './assets/logo-vite.svg'
import logoElectron from './assets/logo-electron.svg'
import './App.scss'
import ToDo from './components/ToDo'

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
  useEffect(()=>{
    console.log("here",process)
  })
  return (
    <div className='App'>
      <h1 style={{color:"#6395a3"}}>ToDo</h1>
      <button style={buttonCreateToDoStyle}>Create toDo</button>

      <div style={toDoListStyle}>
        <ToDo/>      

      </div>

      
    </div>
  )
}

export default App
