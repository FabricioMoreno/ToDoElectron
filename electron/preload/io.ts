const os = require("os")
const path = require("path")
const fs = require("fs")
const { promisify } = require("util")
const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)
const readdirAsync = promisify(fs.readdir)

const appDir = path.resolve(os.homedir(),"toDoElectron")

//Create directory to save all toDos
fs.mkdir(appDir,{recursive:true},(err:Error)=>{
    if(err) throw err
    console.log("Directory created")
})


const getAllFiles = async() =>{
    try{
        const allFilesPaths = await readdirAsync(appDir)

        const allFiles = await Promise.all(
             allFilesPaths.map(async(filePath:string)=>{
            return{
                title: filePath.split(".")[0],
                content:await readFile(filePath)
            }
        })
        )

        console.log(allFiles)
        return allFiles

    }catch(err){
        console.log("Get all files error",err)
    }
}

const readFile = async(fileName="")=>{
    try{
        const filePath = path.resolve(appDir,fileName)
        const fileContent = await readFileAsync(filePath,'utf8')
        console.log(fileContent)
        return fileContent
    }catch(err){
        console.error("Read file error",err)
    }
}

const writeFile = async (fileName="temp.txt", fileContent = "") =>{
    try{
        const filePath = path.resolve(appDir,fileName+".txt")   
        await writeFileAsync(filePath,fileContent.trim(),'utf8')
    }catch(err){
        console.error("Write file error",err)
    }
}


export{
    getAllFiles,
    readFile,
    writeFile

}