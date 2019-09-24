import { commonApiProtocol } from './auth';
import { callbackify } from 'util';


export const getList = async (error) => {
  try{
    const list =  await commonApiProtocol('/list').then(data => console.log(data));

  }catch(err){
    console.log(err)
     alert('go to Login')
    error(err)
  }

  
}