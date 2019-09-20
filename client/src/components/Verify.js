import React,{useState,useEffect} from 'react'
import {verify} from '../api/auth'

const Verify =  () => {

  const [result, setResult] = useState()

  const seTdata = () => verify().then((data)=> {

    console.log('실행 ',data)
    console.count('실행 1',data)
    setResult(data)
    return data
  })
    
  useEffect(()=>{
    if(!result)seTdata()
      console.log('loaded')
      console.log(result)
  },[result])

  
  return (<h2>Verify {result ? (result.auth ? 'true': 'false')  : 'loading'}</h2>)
}

export default Verify