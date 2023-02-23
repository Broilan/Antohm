import * as React from 'react';
import { useContext } from 'react';
import { DataContext } from '../App';
import { AiFillCloseCircle } from 'react-icons/ai';

export default function Modal(props) {
    const {open, setOpen} = useContext(DataContext)
    const component = props.component


  return (
      <>
      {open==true? 
    <div className='z-10 h-screen w-screen absolute top-0'>
      <div className='flex justify-center items-center h-screen w-screen bg-transBlack'>
        
        <div className='w-[40rem] h-[20rem] bg-white rounded-3xl'>
        <div onClick={() => setOpen(false)} className="cursor-pointer text-[1.8rem] ml-auto mr-4 mt-2 w-fit h-fit  "><AiFillCloseCircle/></div>
        <div>Modal</div>
        </div>

      </div>
    </div>
    : null}
    </>
  );
}