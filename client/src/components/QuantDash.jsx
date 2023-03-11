import React, {useContext} from 'react';
import { DataContext } from '../App';
import '../styles/dashboardapps.css'
import TodoList from './TodoList';

export default function QuantDash(props){ 
  const {currentUser} = props

  return (

    <div id="container">
      

 <div className='applications-container'>

  <div className='applications-wrapper'>
  <div className='applications-amount'>
    <h3 className='app-title'>applications sent</h3>
    <p className='text-[5rem]'>0</p>
  </div>

  <div className='applications-responses'>
  <h3 className='app-title'>responses</h3>
  <p className='text-[5rem]'>0</p>
  </div>

  <div className='tamagatchi'>
  <h3 className='app-title'>tamagatchi</h3>
  <p>dinosaur</p>
  </div>

 </div>
  </div>
  
  <TodoList currentUser={currentUser.id}/>
</div>


  );
}