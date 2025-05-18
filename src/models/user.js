const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
    },
    emailId:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        trim:true,
    },
    password:{
        type:String,
    },
    age:{
        type:Number ,
        min:18
    },
    gender:{
        type:String,
    },
    photoUrl:{
       type:String,
       default:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKsAAACUCAMAAADbGilTAAAAMFBMVEXh4eGjo6OgoKDk5OTe3t6pqanb29vX19e4uLiwsLC7u7vFxcXn5+fAwMDOzs6cnJx5ftjcAAAD2ElEQVR4nO2c2RajIAxAgbCj9P//dsC2M7WLBQsGz+Q+tW/3xIAQgowRBEEQBEG0BaYJpNZa5h/YMluANNEqfkXZaOSwuiY4LgS/k366YLCl3gHGqwfRu67yZrTYgvQvonddP1YmQFTvTRdbFUeSnfln1STLZ2zBf/gt08XWYyvekO6bapJ1ElszA1+jeo3sCDk7l6gmWfychVhkmkGfDfTGZPUUWKVxVaeiZL3J+glTFUy5apLFfd3aClXOLaIpGPVd8AGFGdjC+eoO5rwliyeBm6vCe3tVjaxFFm3pPVWmQE4CrGkLChYtT64Oa3DJulkgg5awujasKbBY79nqoYU3uCDucEVabJErudYtCG+uWKuXM81ZbMe7AEv1TO/YM61d6hMWL12LqkMrVcxK0Yn2MKfaGzJbVR/A3HNXLgvxdlsLJ6oR1UwFA5SLK2qa2KqMhcJaccAWZeeqwRccw4x0EPP19SVm9HF1B+KXszj0o4IHwGxMXcKNpJrPjsOH0Aoexjo7ToCe31RjhZr1aKYZYMEqkcmSGWUDG9E0A1LH4J3KOB+iHu7pr8hyS2/O7TdBEARBEATxvwFXVr8GBKaJmZiW2ta6jLVpsR0NG6vFPEfPxJCbysWquXj5l/YxyZiNEGJg0uRti/jQAr0Y5w2Nkbj7BEhbbe/4Z8/HCCdfiRZd0LlH/4vlulTgAsIOHJ4vExTaXq8cHOkLLL65TFCqq3w80DbWPfsXXe4OqnHLoC6/mC62FxW6VzmBBbfz4T/ZCte5fgQ/Pv2VLe9Z6wT96dLLTlvhu01hW5dedtqqPoMMPlWDf5LloUdkq46JK2zbHyjLTqpZtvHs1U+1uezUUTXLNjwAh3DpqMr5pd0Aq20Vqadhc0lFQ8M+2h3Xms6mmUbtJVDd3laPmNskAbjuqpw3ajTc0TpaT6PuvR0tuTtc2ySs7LBmeVHlbd5de/qyq12bLbtPNL8y03smcA2790zn9UDLRsMpdHUNbRsNO6Zs896tE+0LEtUN+oWqrrkpA91FVrgeJQIov2Zeoar6VDOgfRqkBOhUeAHdeIAJ27HMLZtOXcL3rWs23CN0vxmx+dWZKtMDvlCz2T5aoeqOuMMBcv65CivEfFCr4fRraFNQD7sWASz8kLVCHdxpavzOwxhx8YdfiwFjd+wZBbcY96Lg7ZfINkWXr5QhXeZlJpTbJtODj2JfdGNZKqSHf+Qp7AdbkHGzh+DaOxDxegdWANMx2KU3QzxrCuVsiBo9pA9A7iWJYbaPFXBl5xBz78hAon+BKcHk0gcvWf4zoiVBEARBECfmD5lwKZoiFNURAAAAAElFTkSuQmCC'
    },
    about:{
        type:String,
        default:"this is the default about of the user",
    },
    skills:{
        type:[String]
    }

})

userSchema.methods.getJWT=async function(){
    const user=this
    const token= await jwt.sign({_id:user._id},'secret@dev',{expiresIn:"6D"})
    return token
}

userSchema.methods.getValidatePassword=async function(passwordByUser){
    const user=this
    const isPasswordValid=await bcrypt.compare(passwordByUser,user.password)
    return isPasswordValid
}

const user=mongoose.model("user",userSchema)

module.exports=user