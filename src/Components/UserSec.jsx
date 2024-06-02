import React, { useState } from 'react'

const UserSec = () => {
    const[adduser,setadduser]=useState(false)

    const buttonclicked=()=>{
        setadduser(!adduser);
    }
  return (
    <>
        <div className='h-full w-1/4 color1 flex flex-col'>
            <div className='w-full height10 text-center mt-2 poppins-bold text-2xl text-white'>
                Chatting App
            </div>
            <div className='w-full scrollabe height70 overflow-y-scroll '>
                <div className='w-full h-12 hover:bg-black text-white poppins flex items-center text-xl px-5 '>
                    Tejas Gawde
                </div>
                <div className='w-full h-12 hover:bg-black text-white poppins flex items-center text-xl px-5 '>
                    Sahil Malgundkar
                </div>
            </div>
            <div className='w-full height20 flex flex-col items-center justify-center p-4'>
                <div className='w-full h-1/2'>
                    {adduser && (
                        <div className='w-full'>
                            <input type='text' placeholder='Enter username' className='w-full p-2 border rounded-lg'/>
                        </div>
                    )}
                </div>
                <button className='w-full h-1/2 color3 rounded-lg text-white poppins'
                    onClick={buttonclicked}
                    >
                    Add a User
                </button>
            </div>
        </div>
    </>
  )
}

export default UserSec