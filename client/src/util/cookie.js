export const setCookie = (cname, cvalue, cexp) =>{
  const date = new Date();
  date.setTime(cexp);
  document.cookie = `${cname}=${cvalue};expires=${date.toUTCString()}`  
}

export const getCookie = (name) =>{
  if(name){
    const cname = new RegExp(name + '=([^;]*)');
    const value = cname.test(document.cookie) ? unescape(RegExp.$1) : '';
    return value  
  }
  return document.cookie
 
}
export const deleteCookie = (name) => {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}