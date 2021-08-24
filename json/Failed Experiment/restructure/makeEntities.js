const fs=require('fs')

const basePath='../../data'
const familyPath=basePath+'/family'
const personPath=basePath+'/person'
const companyPath=basePath+'/company'

const newPath='个体/'

const imgPath='图片/'

var people=fs.readdirSync(personPath)

people.forEach(p=>{
    fs.copyFileSync(personPath+'/'+p+'/brief.yaml',newPath+p+'.yaml')
    if(fs.existsSync(personPath+'/'+p+'/portrait.png')){
        fs.copyFileSync(personPath+'/'+p+'/portrait.png',imgPath+p+'.png')
    }
})

var biz=fs.readdirSync(companyPath)

biz.forEach(b=>{
    fs.copyFileSync(companyPath+'/'+b+'/brief.yaml',newPath+b+'.yaml')
})