import * as React from 'react';
import { useContext } from 'react';
import { DataContext } from '../App';
import { AiFillCloseCircle } from 'react-icons/ai';

export default function MaterialModal(props) {
    const {open, setOpen} = useContext(DataContext)
    const component = props.component


  return (

    <div>

    </div>
  );
}