const fs=require('fs')
const yaml = require('js-yaml');


const basePath='../../data'
const familyPath=basePath+'/family'
const personPath=basePath+'/person'
const companyPath=basePath+'/company'


var xi=[
    {
        谁:["习仲勋"],
        是谁:["习正宁", "习近平", "习远平", "习桥桥", "习安安"],
        的谁:["父"]
    },
    {
        谁:["习近平"],
        是谁:["习明泽"],
        的谁:["父"]
    },
]

var families=fs.readdirSync(familyPath)
var relationship=[]

var childrenRelations=['子',
'女',
'长子',
'次子',
'三子',
'长女',
'次女',
'四子',
'三女',
'独女',
'独子',
'四女',
'五子',
'五女',
'二子',
'六子',
'七子',
'遗腹子',
'嗣子']

var parentRelations=['父','母']

var siblingRelations=['兄','弟','姐','妹','三弟','二弟']

var marriageRelations=['夫','妻']

var companies=fs.readdirSync(companyPath)

families.forEach(f=>{
    var fyaml=yaml.load(fs.readFileSync(familyPath+'/'+f))
    var rel= fyaml.relations

    rel.forEach(r => {
        var shui=r[1]
        var shishui=r[0]
        var deshui=r[2]
        
        if(companies.includes(shui) || companies.includes(shishui)){
            [shui,shishui]=[shishui,shui]
        }

        if(childrenRelations.includes(deshui)){
            [shui,shishui]=[shishui,shui]
            deshui='父母'
        }else if(parentRelations.includes(deshui)){
            deshui='父母'
        }else if(siblingRelations.includes(deshui)){
            deshui='兄弟姐妹'
            if(shui-shishui>0){
                [shui,shishui]=[shishui,shui]
            }
        }

        if(marriageRelations.includes(deshui)){
            deshui='夫妻'
            if(shui-shishui>0){
                [shui,shishui]=[shishui,shui]
            }
        }

        

        if(deshui.includes('、')){
            deshui=deshui.split('、')
        }

        relationship.push({
            谁:[shui],
            是谁:[shishui],
            的谁:Array.isArray(deshui)?deshui:[deshui]
        })
    });
})


var compactRelations=[]

relationship.forEach(rObj=>{
    var shui=rObj.谁[0]
    var shishui=rObj.是谁[0]
    var deshui=rObj.的谁
    //check contains
    var exist=compactRelations.filter(r=>r.谁.includes(shui)).filter(r=>r.是谁.includes(shishui)).filter(r=>r.的谁.includes(deshui[0]))
    if(exist.length>0){
        return//already exist. check next one
    }

    if (deshui.length!=1){
        compactRelations.push(rObj)
        return //not compacting complicated relationship
    }
    var sameRelations=relationship.filter(r=>{
        if(r.的谁.length!=1){
            return false //not compacting complicated relationship
        }
        return r.的谁[0]==deshui[0]
    })



    if(sameRelations.length<=1){
        compactRelations.push(rObj)
        return //no other entries has the same relationship
    }

    var sameShui=sameRelations.filter(r=>{
        return r.谁[0]==shui
    })

    //problem!! when sameshui.length>1, it may also works if we find other shui instead of shishui
    //not doing so causes problem with for example 邓毅生
    if(sameShui.length>1){
        var shishuiArr=[]
        sameShui.forEach(s=>{
            shishuiArr.push(s.是谁[0])
        })

        compactRelations.push({
            谁:[shui],
            是谁:shishuiArr,
            的谁:deshui
        })

        return
    }

    var sameShiShui=sameRelations.filter(r=>{
        return r.是谁[0]==shishui
    })

    if(sameShiShui.length>1){
        var shuiArr=[]
        sameShiShui.forEach(s=>{
            shuiArr.push(s.谁[0])
        })

        compactRelations.push({
            谁:shuiArr,
            是谁:[shishui],
            的谁:deshui
        })

        return
    }

    compactRelations.push(rObj)

})



var output=yaml.dump(compactRelations)

output='#善用Ctrl+F搜索（苹果电脑请用CMD+F）\n'+output

fs.writeFileSync('关系.yaml',output)
