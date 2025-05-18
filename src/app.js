const express=require('express')
const connectDB=require('./config/database')
const app=express()
const cookieParser=require('cookie-parser')
const {userAuth}=require('./middleware/auth')

app.use(express.json())
app.use(cookieParser())

const {authRouter}=require('./router/auth')
const {profileRouter}=require('./router/profile')

app.use('/',authRouter)
app.use('/',profileRouter)

connectDB().then(()=>{
    console.log("Database connected Successfully")
    app.listen(3000,()=>{
        console.log('expresss hai bhai')
    })
}).catch(err=>{
    console.log("database not connected")
})

