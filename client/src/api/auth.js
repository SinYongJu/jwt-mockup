
import {setCookie, getCookie ,deleteCookie} from '../util/cookie';
import decode from "jwt-decode";

const URL = 'http://localhost:8080';

/**
 * 로그인 기능의 분리
 * 토큰만 날려서 알 수 있개 
 * 시크릿 키로의 비교의 신회로 진행 
 */

// task
// 디코드
// 가져 온거 프로바이드에 
// 모든 서버와 통신은 토큰을 가지고 

const commonFetch = (url,option) => {
  return fetch(url,option)
    .then(checkStatus)
    .then(res => res.json())
}

const commonApiProtocol = (urlString ,method , success, error , whenTokenExpired ) => {
  if(isTokenExpired) {
    whenTokenExpired()
  }
  const option = {
    method : method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + getToken()
    }
  }
  const url = URL+urlString;

  return commonFetch(url,option)
}
  

// const commonApiProtocol = ( url,method ,success, error,  ) => {
  
 
  // return ajax(url, option ,success, error)
  // <= option 추가
// }

  
/**
 * 
 * jwtwebtoken의  verify 는 토큰의 유효성을 검사하기 위한 메서드 이다
 * 따라서 클라이언트 사이드에서는 jwt를 헤더에 실어서 보내주기만 하고 
 * jwtwebtoken.verify는 서버에서 유효함만을 검사한다 
 * 
 */
// 요건 예시로 그냥 써둔거 항상 commonApiProtocol을 거쳐가가 통신한다

export const verify = (token, success, error ) => {
  commonApiProtocol()
}


export const login = (body) => {
  const url = URL + '/auth'
  const option = {
    method : 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body : JSON.stringify(body)
  }  
  return commonFetch(url, option)
          .then((res)=>{
            console.log(res)
            setToken(res.token); // Setting the token in cookie
            return res
          })
}

export const logout = () =>{
  deleteCookie('token')
}

export const isLogIn = (callback) => {
  const token = getToken()
  return !(!token && !isTokenExpired(token))
}

export const isTokenExpired= (token) => {
  if(token){
    return !(token.exp < Date.now() / 1000)
  }else{
    console.log("expired failed");
    return false
  }
}

export const setToken = (token) =>{
  return setCookie('token',token,decode(token).exp)
}


export const getToken = () =>{
  return getCookie('token')
}

const checkStatus = response => {
  // raises an error in case response status is not a success
  if (response.status >= 200 && response.status < 300) {
    // Success status lies between 200 to 300
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}