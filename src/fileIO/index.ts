import { ipcRenderer } from "electron"

const getAllFiles = ()=> ipcRenderer.invoke("fileIO:get-all-files")

const writeFile = (title:string,content:string)=> ipcRenderer.invoke("fileIO:write-file",title,content)

const deleteFile = (id?:String) =>ipcRenderer.invoke("fileIO:delete-file",id)
export {
    getAllFiles,
    writeFile,
    deleteFile
}