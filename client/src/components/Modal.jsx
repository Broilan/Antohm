import * as React from 'react';
import { useContext, useEffect } from 'react';
import { DataContext } from '../App';
import { AiFillCloseCircle } from 'react-icons/ai';

export default function Modal(props) {
    const {open, setOpen} = useContext(DataContext)
    const component = props.component
    

    //   useEffect(() => {
    //     console.log('opennnn', open)
    //         let modalHTML = document.querySelector('#modal')
    //   let modalRect = modalHTML?.getBoundingClientRect()
    //   console.log(modalRect)
    //   document.addEventListener('click', (e)=> {
    //     document.addEventListener('click', (e) => {
    //              if(e.clientY < modalRect.top - 200 || e.clientY > modalRect.bottom + 250 || e.clientX > modalRect.right + 200 || e.clientX < modalRect.left - 200){  
    //       setOpen(false)
    //       document.removeEventListener('click', null)
    //     }
    //     })

    //   })
    // }, [])

  return (
      <>
      {open==true? 
    <div className='z-10 h-screen w-screen absolute top-0' >
      <div className='flex justify-center items-center h-screen w-screen bg-transBlack'>
        
        <div className='w-fit h-fit p-5 bg-white ' >
        <div onClick={() => setOpen(false)} className="cursor-pointer text-[1.8rem] ml-auto mr-2 mb-3 w-fit h-fit  "><AiFillCloseCircle/></div>
        <div id='modal'>{component}</div>
        </div>

      </div>
    </div>
    : null}
    </>
  );
}