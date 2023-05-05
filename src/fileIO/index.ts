import { ipcRenderer } from "electron"

const getAllFiles = ()=> ipcRenderer.invoke("fileIO:get-all-files")

const writeFile = (title:string,content:string)=> ipcRenderer.invoke("fileIO:write-file",title,content)


export {
    getAllFiles,
    writeFile
}