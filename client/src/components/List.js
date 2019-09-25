import React,{useState,useContext} from 'react'
import {AuthContext} from '../context/AuthContext'
import {getUserList} from '../api/common'
import style from './List.scss'
const List =  (props) => {  
  const [list ,setList] = useState([])
  const [toggle, setToggle] = useState(false)
  const [nomalToggle, actionNormalToggle] = useState(false)
  const {tokenExpiredHandler} = useContext(AuthContext)

  const onGetListHandleToggle = (e) => {
    setListData()
  }

  const onToggleHandler = (e) => {
    actionNormalToggle(!nomalToggle)
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
    <button onClick={e=>onGetListHandleToggle(e)}>Click me</button>
    <ul>
      { toggle ? list : <></>}
    </ul>
  </div>
  <div>
    <button onClick={e=>onToggleHandler(e)}>Click me</button>
    { nomalToggle ?  <p>
      asldm;alsm;lasmcl;mas;lcmal;smcl;asmcl;asmcl;ams
      asldm;alsm;lasmcl;mas;lcmal;smcl;asmcl;asmcl;ams
      asldm;alsm;lasmcl;mas;lcmal;smcl;asmcl;asmcl;ams
      asldm;alsm;lasmcl;mas;lcmal;smcl;asmcl;asmcl;ams
      asldm;alsm;lasmcl;mas;lcmal;smcl;asmcl;asmcl;ams
      asldm;alsm;lasmcl;mas;lcmal;smcl;asmcl;asmcl;ams
      asldm;alsm;lasmcl;mas;lcmal;smcl;asmcl;asmcl;ams
      asldm;alsm;lasmcl;mas;lcmal;smcl;asmcl;asmcl;ams
      asldm;alsm;lasmcl;mas;lcmal;smcl;asmcl;asmcl;ams
      asldm;alsm;lasmcl;mas;lcmal;smcl;asmcl;asmcl;ams
      asldm;alsm;lasmcl;mas;lcmal;smcl;asmcl;asmcl;ams
      asldm;alsm;lasmcl;mas;lcmal;smcl;asmcl;asmcl;ams
      asldm;alsm;lasmcl;mas;lcmal;smcl;asmcl;asmcl;ams
      asldm;alsm;lasmcl;mas;lcmal;smcl;asmcl;asmcl;ams
      asldm;alsm;lasmcl;mas;lcmal;smcl;asmcl;asmcl;ams
      asldm;alsm;lasmcl;mas;lcmal;smcl;asmcl;asmcl;ams
      asldm;alsm;lasmcl;mas;lcmal;smcl;asmcl;asmcl;ams
      asldm;alsm;lasmcl;mas;lcmal;smcl;asmcl;asmcl;ams
      asldm;alsm;lasmcl;mas;lcmal;smcl;asmcl;asmcl;ams
      asldm;alsm;lasmcl;mas;lcmal;smcl;asmcl;asmcl;ams
    </p> : <></>}
  </div>
  </>)
}

export default List