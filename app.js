const express=require('express')
const app=express()

const PORT=process.env.PORT||4000


app.get('/', async (request,response)=>{
    let result=0
    for(let i=0;i<1000000000;i++){
        result+=i
    }
    return response.json({processId:process.pid,result})

})
app.listen(PORT,(request,response)=>{
    console.log(`Server listening on ${PORT}`)
})