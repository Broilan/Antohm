import React, {useContext} from 'react'
import { useParams } from 'react-router-dom'
import { DataContext } from '../App'

const OpsButton = (props) => {
    const {mOpen, setMOpen, currentUser} = useContext(DataContext)
    const {buttonType, otheruser} = props
    const params = useParams().userid

    const buttonFn =() => {
        switch(buttonType) {
            case 'Follow':
                break
            case 'Unfollow':
                break  
            case 'Message':
                setMOpen([true, params, otheruser])
                break
            
        }
    }
    console.log(mOpen)
  return (
    <>
    <div className='bg-blue-300 rounded-3xl text-center w-24 h-12'>
        <p onClick={buttonFn}className='p-2 font-bold text-lg text-white'>{buttonType}</p>
    </div>
    </>
  )
}

export default OpsButton