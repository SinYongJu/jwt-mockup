const URL = 'http://localhost:8080';
  const ajax = async (urlString , option , success, error ) => {
    fetch(URL+urlString ,option)
      .then(res => res.json())
      .then(data =>{
        success(data)
      })
      .catch(err => error(err))
  }
  
  
  export const verify = (token, success, error ) => {
    const url = '/verify'
    const option = {
      method : 'post',
      headers: {
        'Authorization': 'bearer ' + token
      }
    }
    return ajax(url,option ,success, error)
  }

  export const login = async (body, success, error) => {
    const url = '/auth'
    const option = {
      method : 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body : JSON.stringify(body)
    }
    return ajax(url,option,success, error)
  }