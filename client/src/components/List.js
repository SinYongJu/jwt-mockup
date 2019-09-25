import React,{useState,useContext} from 'react'
import {AuthContext} from '../context/AuthContext'
import {getUserList} from '../api/common'
import style from './List.scss'
const List =  (props) => {  
  const [list ,setList] = useState([])
  const [toggle, setToggle] = useState(false)
  const {tokenExpiredHandler} = useContext(AuthContext)

  const onHandleToggle = (e) => {
    setListData()
  }

  const setListData = () => {

    getUserList(setListError).then((data)=>{
      console.log('list',data)
      const listUl = data.map(item => {
        return <li key={item.id}> 0{item.id}. name : {item.title} / role : {item.role}</li>
      })
      setList(listUl)
      setToggle(true)
    }).catch((error) => { console.log(error)
      tokenExpiredHandler()
    })
    
  }

  const setListError = () => {
    alert('you must login')
    props.push('/login')
  }

  return (<>
  <h2>Verify</h2>
  <div className="verify">
    <button onClick={e=>onHandleToggle(e)}>Click me</button>
    <ul>
      { toggle ? list : <></>}
    </ul>
  </div>
  </>)
}

export default List