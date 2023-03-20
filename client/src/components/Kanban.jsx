import React from 'react'
import "../styles/kanban.css"
import { useEffect } from 'react';
import {TfiCalendar} from 'react-icons/tfi'

const Kanban = (props) => {

  useEffect(() => {

 
    const draggables = document.querySelectorAll('.kanban-listitem-draggable')
    const containers = document.querySelectorAll('.kanban-inside-containers')
    console.log("containers", containers)

    draggables.forEach(draggable => {
      draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging')
        console.log("dragginx")
      })
      draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging')
      })
    })

    containers.forEach(container => {
      container.addEventListener('dragover', e => {
        e.preventDefault()
        const afterElement = getDragAfterElement(container, e.clientY)
        const draggable = document.querySelector('.dragging')
        if(draggable == null){
          container.appendChild(draggable)
        } else {
          container.insertBefore(draggable, afterElement)
        }
      })
    })

    function getDragAfterElement(container, y) {
     const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

     return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect()
      const offset = y - box.top - box.height / 2
      if(offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child}
      } else {
          return closest
        }
     }, {offset: Number.NEGATIVE_INFINITY}).element
    } 
  }, [])

  return (
    <div className='kanban-container border-gray-400 border-2 shadow-2xl'>
      <h1 className='font-bold text-center pt-4 text-3xl'>Welcome To your Kanban</h1>

      <div className='flex text-4xl mr-4 gap-4 mt-[-2rem] mb-6'>
      <div className='text-[5rem] ml-auto'> + </div>
      </div>

      <div className='kanban-wrapper'>
        <div className='kanban-inside-containers shadow-2xl border-2 border-gray-400'>
            <h1 className='font-bold underline text-3xl text-center'>Todo</h1>
         <div className='kanban-todo-list'>
              <div className='kanban-listitem-draggable'>
                <div className='kanban-listitem-text' draggable="true"> List Item</div>
              </div>
         </div>
        </div>

        <div className='kanban-inside-containers shadow-2xl border-2 border-gray-400'>
        <h1 className='font-bold underline text-3xl text-center'>In progress</h1>
        <div className='kanban-progress-list'>
          <div className='kanban-listitem-draggable'>
          <div className='kanban-listitem-text' draggable="true"> List Itme</div>
            </div>
        </div>
        </div>

        <div className='kanban-inside-containers shadow-2xl border-2 border-gray-400'>
        <h1 className='font-bold underline text-3xl text-center'>Finished</h1>
        <div className='kanban-finished-list'>
          <div className='kanban-listitem-draggable'>
          <div className='kanban-listitem-text' draggable="true"> List Itme</div>
            </div>
        </div>
        </div>
        </div>

    </div>
  )
}

export default Kanban