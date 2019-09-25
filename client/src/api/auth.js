import {setCookie, getCookie ,deleteCookie} from '../util/cookie';
import {commonFetch} from './common'
import decode from "jwt-decode";

export const URL = 'http://localhost:8080';
export const ACCESS_TOKEN = 'ACCESS_TOKEN'
export const REFRESH_TOKEN = 'REFRESH_TOKEN'


/**
 * 로그인 기능의 분리
 * 서버 통신 , 쿠키 세팅 , 토큰 파싱을 하는 모듈
 * 토큰만 날려서 알 수 있개 
 * 시크릿 키로의 비교의 신회로 진행 
 * jwtwebtoken의  verify 는 토큰의 유효성을 검사하기 위한 메서드 이다
 * 따라서 클라이언트 사이드에서는 jwt를 헤더에 실어서 보내주기만 하고 
 * jwtwebtoken.verify는 서버에서 유효함만을 검사한다 
 * 
 */
// 요건 예시로 그냥 써둔거 항상 commonApiProtocol을 거쳐가가 통신한다


export const login = (body) => {
  const url = URL + '/auth/sign'
  const option = {
    method : 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body : JSON.stringify(body)
  }  
  return commonFetch(url, option)
          .then((res)=>{
            console.log('login Fetch')
            setAccessToken(res.accessToken) // Setting the token in cookie
            setRefreshToken(res.refreshToken,REFRESH_TOKEN)
            return res
          })
}

export const logout = () =>{
  deleteCookie(ACCESS_TOKEN)
  deleteCookie(REFRESH_TOKEN)
}



export const isExpiredToken = (token_name,callback) => {
  const token = getToken(token_name)
  return !(!token && !defineExpired(token))
}

export const defineExpired= (token) => {
  if(token){
    return !(token.exp < Date.now() / 1000)
  }else{
    console.log("expired failed");
    return false
  }
}

const setToken = (token, cname) =>{
  return setCookie(cname, token, decode(token).exp)
}

const setAccessToken = (token) =>{
  return setToken(token,ACCESS_TOKEN)
}


const setRefreshToken = (token) =>{
  return setToken(token,REFRESH_TOKEN)
}

export const getToken = (token_name) =>{
  return getCookie(token_name)
}

export const getDecodedToken = () =>{
  return decode(getCookie(ACCESS_TOKEN))
}




const refresh = async () => {
  const result = await fetch(
    URL + '/auth/refresh',
    {
      method : 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + getToken(REFRESH_TOKEN)
      }
    }
  )
  return result.json()
}
export const checkAccessToken = () => {
  return isExpiredToken(ACCESS_TOKEN)
}

export const checkRefreshToken = () => {
  return getToken(REFRESH_TOKEN) && refresh(REFRESH_TOKEN).then((data)=>{     
    if(data.auth){
      setAccessToken(data.accessToken, ACCESS_TOKEN) // Setting the token in cookie
      setRefreshToken(data.refreshToken)
      return data
    }else{
      return false
    }
  }) 
}
