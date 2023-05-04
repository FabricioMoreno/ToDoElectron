import { ipcRenderer } from "electron"

const getAllFiles = ()=> ipcRenderer.invoke("fileIO:get-all-files")


export {
    getAllFiles
}