const fs=require('fs')
const yaml = require('js-yaml');


const basePath='../data'
const familyPath=basePath+'/family'
const personPath=basePath+'/person'
const companyPath=basePath+'/company'

var nodes=[]

var categories=[{
    cid:0,
    name:'公司或集团'
}]

//adding people to nodes
var nid=0

people=fs.readdirSync(personPath)

for (x in people){
    let doc=yaml.load(fs.readFileSync(personPath+'/'+people[x]+'/'+ 'brief.yaml'))
    // console.log(doc)
    nodes.push({
        id:nid,
        name:people[x],
        isAlive:!doc.death,
        info:{...doc},
        connections:0
    })
    nid+=1
}

//add category to people
families=fs.readdirSync(familyPath)

var cidCounter=1

for (f in families){
    let doc=yaml.load(fs.readFileSync(familyPath+'/'+families[f]))
    //make categories
    categories.push({
        cid:cidCounter,
        name:doc.name
    })


    for(person in nodes){
        if(nodes[person].name==doc.name){
            nodes[person].category=cidCounter
            nodes[person].isInner=true
        }
    }

    //loop through inner
    if(doc.inner){
        doc.inner.forEach(innerName => {
            for(person in nodes){
                if(nodes[person].name==innerName){
                    if(!nodes[person].category){
                        nodes[person].category=cidCounter
                        nodes[person].isInner=true
                    }
                    break
                }
            }
            
        });
    }
    //loop through outer
    if(doc.outer){
        doc.outer.forEach(outerName => {
            for(person in nodes){
                if(nodes[person].name==outerName){
                    if(!nodes[person].category){
                        nodes[person].category=cidCounter
                        nodes[person].isInner=false

                    }
                    break
                }
            }
            
        });
    }

    //end. Update cidCounter
    cidCounter+=1
}


//add companies to nodes
companies=fs.readdirSync(companyPath)

for (x in companies){
    nodes.push({
        id:nid,
        name:companies[x],
        category:0,
        connections:0
    })
    nid+=1
}

//adding link
var links=[]

for (f in families){
    let doc=yaml.load(fs.readFileSync(familyPath+'/'+families[f]))
    let rel=doc.relations
    rel.forEach(r=>{
        let fromObj=nodes.filter(x=>x.name==r[0])[0]
        let toObj=nodes.filter(x=>x.name==r[1])[0]
        if(fromObj.category==0 || toObj.category==0){
            links.push({
                source:toObj.id,
                target:fromObj.id,
                relationship:r[2]
            })
        }else{
            links.push({
                source:fromObj.id,
                target:toObj.id,
                relationship:r[2]
            })
        }
        nodes[fromObj.id].connections+=1
        nodes[toObj.id].connections+=1
    })

}



var convertJson=JSON.stringify({nodes,links,categories},null,2)
fs.writeFileSync('zhao.json',convertJson)
