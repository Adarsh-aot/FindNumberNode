const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');



let data = [
    {id : 1 , email : 'admin' , password : 'admin'},
    {id : 2 , email : 'user' , password : 'user'}
]

let detail = [
    {id : 1 , userid : 1 , name : 'admin' , detail : 2 },
    {id : 2 , userid : 2 ,  name : 'user' , detail : 6 } 
]

function extractNumbersFromUUID(uuid) {
    return uuid.replace(/\D/g, '');
}



const login = (req , res) => {
    const {email , password} = req.body
    const index = data.findIndex(item => item.email === email && item.password === password)
    if(index !== -1){
        const token = jwt.sign({id : data[index].id , email : email} , 'secret')
        
        res.json({
            token
        })
    }else{
        res.json({
            success : false 
        })
    }   
}

const register = (req , res) => {
    const {email , password} = req.body
    const index = data.findIndex(item => item.email === email && item.password === password)
    if(index !== -1){
        res.json({
            success : false 
        })
        
    }else{
        const id = extractNumbersFromUUID(uuidv4())
        data.push({id  , email , password })
        const token = jwt.sign({id, email } , 'secret')
        
        res.json({
            token
        })
    }   
}


const getdata = (req , res) => {
    res.json(detail)
}

const mydata = (req , res) => {
    const id  = req.decode.id
    const index = detail.findIndex(item => item.userid === id)
    if(index == -1){
        return res.json([])
    }
    res.json(detail[index])
}

const adddata = (req , res) => {
    const id  = req.decode.id
    console.log(id)

    const index = detail.findIndex(item => item.userid === id)
    if(index == -1){
        detail.push({id : extractNumbersFromUUID(uuidv4()) , userid : id , detail : req.body.detail , name : req.decode.email})
        return res.json(detail)
    }else{
        if(req.body.detail <= detail[index].detail){
            detail[index] = {id : detail[index].id  , userid : id , detail : req.body.detail , name : req.decode.email}
        }else{
            return res.json({success : false})
        }
        
        return res.json(detail)
    }
    
    res.json({success : true})
}


module.exports = {
    login ,
    register , 
    getdata , 
    mydata ,
    adddata
}



