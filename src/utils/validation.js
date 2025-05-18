const validator=require('validator')
const validateSignupData=(req)=>{

    const {firstName,lastName,emailId,password}=req.body

    if(!firstName || !lastName){
        throw new Error("Name is not Valid ")
    }
     if(firstName.length<4 ||firstName.length>50){
        throw new Error("name should be of valid length")
    }
   if(!validator.isEmail(emailId)){
    throw new Error("email is not valid")
   }
    if(!validator.isStrongPassword(password)){
    throw new Error("please enter a strong password ")
   }
}

const validateEditMethods=(req=>{
    const allowedEdit=['emailId','firstName','lastName','skills','about','photoUrl']
    return Object.keys(req).every(edit=>allowedEdit.includes(edit))

})
module.exports={validateSignupData,validateEditMethods}