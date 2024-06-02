import React from 'react'
import "./index.css"
import UserSec from './Components/UserSec'
import MessageSec from './Components/MessageSec'

const App = () => {
  return (
    <>
      <div className='h-screen w-screen flex'>
        <UserSec/>
        <MessageSec/>
      </div>
        
    </>
  )
}

export default App