import React from 'react'
import { GiCircle } from 'react-icons/gi'
import {HiCheckCircle} from 'react-icons/hi'


export default function CheckBox({checked= false, onClick}) {
    
    
 
  return (
    <div><div className="icon" onClick={onClick}>
        {!checked &&(
            <div className='checkbox unchecked'> <GiCircle/></div>
        )}
      {checked &&(
  <div className='checkbox checked'><HiCheckCircle/></div>
      )}
  
    </div></div>
  )
}
