const os = require("os")
const path = require("path")
const fs = require("fs")
const { promisify } = require("util")
const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)
const readdirAsync = promisify(fs.readdir)
const getStatAsync = promisify(fs.stat)
const deleteFileAsync = promisify(fs.unlink)

const appDir = path.resolve(os.homedir(),"toDoElectron")

//Create directory to save all toDos
fs.mkdir(appDir,{recursive:true},(err:Error)=>{
    if(err) throw err
    console.log("Directory created")
})

const getSpecificStatFromFile = async(statInfo:string,filePath:string): Promise<string|null|undefined|Date>=>{
    try{
        const info = await getStatAsync(path.join(appDir,filePath))
        const {[statInfo]:statFile}= info
        
        return statFile
    }catch(err){
        console.error("Get all stat file error",err)
    }
}


const getAllFiles = async() =>{
    try{
        const allFilesPaths = await readdirAsync(appDir)

        const allFiles = await Promise.all(
             allFilesPaths.map(async(filePath:string)=>{
            return{
                id: await getSpecificStatFromFile("birthtime",filePath)+"|"+filePath,
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

const deleteFile = async (idFile:String) =>{
    try{
        const [dateTimeFile,nameFile]= idFile.split("|")
        const dateTimeFileOriginal = await getSpecificStatFromFile("birthtime",nameFile)

        if(new Date(dateTimeFile).toString() == dateTimeFileOriginal?.toString()){

           await deleteFileAsync(path.join(appDir,nameFile))

        }

    }catch(err){
        console.error("Delete file error",err)
    }
}


export{
    getAllFiles,
    readFile,
    writeFile,
    deleteFile

}