const fs=require('fs')
const yaml = require('js-yaml');


const basePath='../数据/'
const entitiesPath=basePath+'个体/'
const relationsPath=basePath+'关系.yaml'


// var entities=fs.readdirSync(entitiesPath)

//the baseline is now relations. entities are now optional (or lets say an entity appears in the relations no longer require a dedicated yaml file)
var relations=yaml.load(fs.readFileSync(relationsPath))

var nodes={}
var links=[]

function addNodeOrAddConnections(name){
    if(!nodes[name]){
        var ya=null
        if(fs.existsSync(entitiesPath+name+'.yaml')){
            var file=fs.readFileSync(entitiesPath+name+'.yaml',"utf-8")
            ya=yaml.load(file)
        }
        nodes[name]={
            name:name,
            connections:1,
            data:ya
        }
    }else{
        nodes[name].connections+=1
    }

    // if(name=='邓子恢'){
    //     console.log(nodes[name].connections)
    // }
}

relations.forEach(r => {
    var shui=r.谁
    var shishui=r.是谁

    if(shui.includes('邓子恢')||shishui.includes('邓子恢')){
        console.log(r)
    }

    shui.forEach(sourceEntity=>{
        addNodeOrAddConnections(sourceEntity)
        shishui.forEach(targetEntity=>{
            addNodeOrAddConnections(targetEntity)
            links.push({
                source:sourceEntity,
                target:targetEntity,
                value:r.的谁.join()
            })
        })
    })
    
});

// console.log(nodes)

// console.log(links)

const data=Object.values(nodes)

var converted=JSON.stringify({data,links})

fs.writeFileSync('zhao.json',converted)
