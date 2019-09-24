

const USER_ROLE = ['admin','user','guest']
const ID_REG = /^[A-za-z]/g;

export default class UserInfo {
  constructor(info){
    console.log('UserInfo')
   this.init(info)
  }

  init({name, id ,role}){
    console.log(name)
    this.setName(name);
    this.setId(id);
    this.setRole(role);
  }
  
  validateName(value){
    console.log(value)
    return ID_REG.test(value)
  }

  validateId(value){
    return Number.isInteger(value) && !isNaN(value)
  }

  validateRole(value){
    const find = USER_ROLE.find((item)=>{
      if(item == value ) return true
      return false 
    })
    return (find) ? true : false
  }

  

  getName(){
    return this.name
  } 
  setName(value){
    // if(this.validateName(value)){
      console.log('setName',value)
      return this.name = value
    // }
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

