'use strict'
const jwt=require('jwt-simple')
const moment=require('moment')
const config=require('../config')
function createToken(userId){
    const payload={
        sub:userId,
        iat:moment().unix(),
        exp: moment().add(1,'year').unix(),
    }
   return  jwt.encode(payload,config.SECRET_TOKEN)
}

function decodeToken(token){
    const decoded=new Promise((resolve,reject)=>{
        try{
  const payload=jwt.decode(token,config.SECRET_TOKEN)
  if(payload.exp <=moment().unix()){
    reject({status:401,message:'El Token Ha Expirado'})

}
resolve(payload.sub)


        }catch(err){
            reject({status:500,mesagge:'invalid Token'})
        }
    })
    return decoded

}
module.exports={
    createToken,decodeToken
}