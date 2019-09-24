import { commonApiProtocol } from './auth';


const getVerifyList = async () => {
  const verifyList =  await commonApiProtocol('/verify').then(data => console.log(data))
  
}