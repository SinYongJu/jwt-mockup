

const USER_ROLE = ['admin','user','guest']
const ID_REG = /(^[ a-z ]+)/g
const ID_REG_INVALID =  /[~!@#$%^&*()_+|<>?:{}]/gi

export default class UserInfo {
  constructor(info){
   this.init(info)
  }

  init({name, id ,role}){
    this.setName(name);
    this.setId(id);
    this.setRole(role);
  }
  
  validateName(value){
   if(value.match(ID_REG_INVALID)){
    return false
   }
  return value.match(ID_REG)
  }

  validateId(value){
    
    return Number.isInteger(value) && !isNaN(value)
  }

  validateRole(value){
    const find = USER_ROLE.find((item)=>{
      if(item === value ) return true
      return false 
    })
    return (find) ? true : false
  }

  

  getName(){
    return this.name
  } 
  setName(value){
    if(this.validateName(value)){
      return this.name = value
    }
  }
  
  getId(){
    return this.id
  } 
  
  setId(value){
    if(this.validateId(value)){
      return this.id = value
    }
    return false
  } 

  getRole(){
    return this.role
  } 
  
  setRole(value){
    if(this.validateRole(value)){
      return this.role = value
    }
    return false
   
  } 
}

