import { isExpiredToken, checkRefreshToken ,getToken ,ACCESS_TOKEN } from './auth';

const URL = 'http://localhost:8080';


const checkStatus = async (response) => {
  if (response.status >= 200 && response.status < 300) {
    // Success status between 200 to 300
    return response;
  } else {
    const error = new Error(response.statusText); // 에러 처린
    error.response = response;
    throw error;
  }
}

const commonFetch = (url,option) => {
  console.log()
  return fetch(url,option)
    .then(checkStatus)
    .then(res => res.json())
    .catch(error => console.log(error))
}

/**
 * 
 * @param {*} url : request url
 * @param {*} opt : fetch option object
 * @param {*} whenTokenExpired  : expired Token callback
 */

const COMMON_FETCH_OPTION =()=>(
  {
    method : 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + getToken(ACCESS_TOKEN)
    }
  }
)

const commonApiProtocol = (urlString,opt) => {
  const url = URL + urlString

  if(!isExpiredToken(ACCESS_TOKEN)) {
    return apiAceessTokenExpired(url,opt)
  }

  return commonFetch(url,{...COMMON_FETCH_OPTION(),...opt})
}


const apiAceessTokenExpired = async (url,opt) => {
  try{
    const doRefeshSetAccessAndRefreshTokens = await checkRefreshToken()
    if(doRefeshSetAccessAndRefreshTokens){
      console.log('re-signup')
      return commonFetch(url,{...COMMON_FETCH_OPTION(),...opt})
    }else{
      return new Error('do login, expired Referesh token')
    }
  }catch(error){
    throw error
  }
  
}


const getUserList = async (error) => {
  try{
    return await commonApiProtocol('/list');
  }catch(err){
    console.log(err)
    alert('go to Login')
    error(err)
  }
}

export {checkStatus, commonFetch ,getUserList, commonApiProtocol, apiAceessTokenExpired}