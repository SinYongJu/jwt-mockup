// const EXPIRE_DAYS = 0.25;

export const setCookie = (cname, cvalue, cexp) =>{
  const date = new Date();
  console.log('setCookie',date.setTime(cexp + 600))
  
  date.setTime(Date.now()+( 0.25 * 24 * 60 * 60 * 1000) );

  console.log(date)
  document.cookie = `${cname}=${cvalue};expires=${date.toUTCString()}`  
  console.log(getCookie('token'))
}

export const getCookie = (name) =>{
  if(name){
    name = new RegExp(name + '=([^;]*)');
    const value = name.test(document.cookie) ? unescape(RegExp.$1) : '';
    return value  
  }
  return document.cookie
 
}
export const deleteCookie = (name) => {

  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}