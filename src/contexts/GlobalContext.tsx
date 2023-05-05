import { createContext, useState, useEffect } from "react";
import {getAllFiles} from "../fileIO"


type ContextType = {
  allFiles: any[],
  setAllFiles: React.Dispatch<React.SetStateAction<any[]>>
  loadAlltFiles: () => Promise<void>
}

const GlobalContext = createContext<ContextType | null>(null)


function GlobalContextProvider({children}:{children:React.ReactNode}){
    const [allFiles, setAllFiles] = useState<any[]>([])

    //Get all toDos
    const loadAlltFiles = async()=>{
      try{
        const allFiles = await getAllFiles()
        setAllFiles(allFiles)
        console.log(allFiles,"ppppp")
        

      }catch(err){
        console.error("Error to get all toDos")
      }
    }

    //Load all toDos created in this system
    useEffect(()=>{
      const getAllFiles = async()=>{
        await loadAlltFiles()
      }
  
      getAllFiles()
    },[])
    

    const [userDetails, setUserDetails] = useState({
        username: "John Doe"
      });
    

    return (
        <GlobalContext.Provider value={{ allFiles, setAllFiles, loadAlltFiles }}>
          {children}
        </GlobalContext.Provider>
      );
    
}


export {
    GlobalContext,
    GlobalContextProvider
}