import React from 'react'
import "/Users/Tanner/Desktop/ThriverFolder/Thriver/client/src/styles/profile.css"
import { useContext, useState } from 'react';
import { DataContext } from '../../App';
import { PageContext } from '../../pages/Profile';
import { MdOutlineDashboardCustomize } from 'react-icons/md';
import { BsKanban } from 'react-icons/bs';
import { AiOutlineCalendar } from 'react-icons/ai';
import { BiNotepad } from 'react-icons/bi';
import { BsPen } from 'react-icons/bs';
import { GrResources } from 'react-icons/gr';
import { AiFillFileExcel } from 'react-icons/ai';
import { VscSettingsGear } from 'react-icons/vsc';
import { BiLogOut } from 'react-icons/bi';
import {Kanban, Applications, QuantDash, SocialDash, Settings, Calendar, Resources, Report} from '../';



const ProfileSideBar = () => {
    const {open, setOpen, setModalType, handleLogout} = useContext(DataContext)
    const {dash, setDash} = useContext(PageContext)
    
    // function settingsModal() {
    //     setOpen(true)
    //     setModalType(<Settings />)

    // }

  return (
    <div className='sidebar-container'>
        <div className="nav-list-container">

            <h4 className='titles'>basic</h4>
            <div className='basic-wrapper'>
           
            <div onClick={()=> setDash(<QuantDash/>)} className="cursor-pointer" ><MdOutlineDashboardCustomize/> Quant Dash</div>
            <div onClick={()=> setDash(<SocialDash/>)} className="cursor-pointer"><MdOutlineDashboardCustomize/> Social Dash</div>
            </div>
            
            <h4 className='titles'>tools</h4>

            <div className='tools-wrapper'>
            <div className="cursor-pointer" onClick={()=> setDash(<Kanban/>)}><BsKanban/> Kanban</div>
            <div className="cursor-pointer" onClick={()=> setDash(<Calendar/>)}><AiOutlineCalendar /> Calendar</div>
            <div className="cursor-pointer" onClick={()=> setDash(<Applications/>)}><BiNotepad /> Applications</div>
            <div className="cursor-pointer" onClick={()=> setDash(<Resources/>)}><GrResources /> Resources</div>
            </div>

            <h4 className='titles'>other</h4>
            <div className='other-wrapper'>
            <div className="cursor-pointer" onClick={()=> setDash(<Report/>)}><AiFillFileExcel /> Report an issue</div>
            <div  onClick={()=> setDash(<Settings/>)} className="cursor-pointer" ><VscSettingsGear/> Settings</div>
            <div onClick={handleLogout} className="cursor-pointer"><BiLogOut /> Sign out</div>
            </div>
        </div>
    </div>
  )
}

export default ProfileSideBar