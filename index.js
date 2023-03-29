//WE are importing express and storing it in a variable

const express = require("express")


//IMPORTING DATA SERVICE

const ds=require('./service/dataservice')

//Import jswt

const jwt=require("jsonwebtoken")



//app creaation

const app = express()

//TO CONVERT ALL DATA  from JSON TO JS FORMAT
app.use(express.json())

//MIDDLEWARE CREATION

const jwtMiddleware=(req,res,next)=>{

    try{
        //access   
    const token = req.headers["access_token"]

    const data=jwt.verify(token,"superkey123")

    console.log(data);

    next()

    }
    catch{
        res.status(422).json({
            status:false,
            message:"please login",
            statusCode :404
        })
    }
   

}





//RESOLVING API
// app.get("/",(req,res)=>{
//     res.send("Get method working...??")
// })

// app.post("/",(req,res)=>{
//     res.send("Post method working...")
// })

// app.put("/",(req,res)=>{
//     res.send("Put method working...")
// })

// app.patch("/",(req,res)=>{
//     res.send("Patch method working...")
// })

// app.delete("/",(req,res)=>{
//     res.send("Delete method working...")
// })


//REGISTER REQ

app.post("/register",(req,res)=>{
   const result=ds.register(req.body.acno,req.body.unname,req.body.pssw)
   res.status(result.statusCode).json(result)
})


// LOGIN REQUEST
//..............

app.post("/login",(req,res)=>{
    const result=ds.login(req.body.acno,req.body.psw)
    res.status(result.statusCode).json(result)
 })


// DEPOSIT REQUEST
//................

app.post("/deposit",jwtMiddleware,(req,res)=>{
    const result=ds.deposit(req.body.acno,req.body.psw,req.body.ant)
    res.status(result.statusCode).json(result)
 })


//WITHDRAW REQUEST
//.................


app.post("/withdraw",jwtMiddleware,(req,res)=>{
    const result=ds.withdraw(req.body.acnu,req.body.psd,req.body.ammt)
    res.status(result.statusCode).json(result)
 })


 //TRANSACTION REQUEST
 //...................

app.get("/transaction",(req,res)=>{
    const result=ds.getTransaction(req.body.acno)
    res.status(result.statusCode).json(result)
})









//setting PORT
app.listen(3000, () => {
    console.log("server started at port 3000");
})