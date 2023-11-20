import React from 'react'

const My2 = ({info,setInfo}) => {

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value })
  }

  
  return (
    <div>My2</div>
  )
}

export default My2