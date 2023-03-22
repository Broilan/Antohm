import React, { useState, useEffect, useContext } from 'react'
import { MdTimer } from 'react-icons/md';
import { FaExclamationTriangle } from 'react-icons/fa';
import { BiLinkExternal } from 'react-icons/bi';
import axios from 'axios';
import { DataContext } from '../App';

const Applications = () => {
  const {currentUser} = useContext(DataContext)
  const [currentView, setCurrentView] = useState()
  const [applied, setApplied] = useState([])
  const [responses, setResponses] = useState([])
  const [offers, setOffers] = useState([])
  const [interviews, setInterviews] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:8000/user/jobspopulated/${currentUser.id}`).then(response => {
      console.log(response)
      setApplied(response.data.foundUser.applications)
      setResponses(response.data.foundUser.responses)
      setOffers(response.data.foundUser.offers)
      setInterviews(response.data.foundUser.interviews)
    })
  }, [])
  

  return (
    <>
    <div className='bg-dimWhite w-[60%] h-[80vh] mx-auto rounded-3xl shadow-xl border-2 border-gray-400 overflow-y-scroll'>
    <h1 className='text-[4rem] underline text-center font-bold '>Job Tracking</h1>

    <ul className='flex gap-10 w-[100%] justify-center font-bold mt-4 text-xl'>
        <li onClick={() => setCurrentView(applied)} className='hover:underline font-bold'>Applied</li>
        <li onClick={() => setCurrentView(responses)} className='hover:underline font-bold'>Responses</li>
        <li onClick={() => setCurrentView(interviews)} className='hover:underline font-bold'>Interviews</li>
        <li onClick={() => setCurrentView(offers)} className='hover:underline font-bold'>Offers</li>
      </ul>
      <div className='flex flex-row flex-wrap pl-5'>
      {currentView?currentView.map((i)=> 
        <Views linkedInLinks={i.linkedInLinks} company={i.company} jobType={i.jobType} companyLogo={i.companyLogo} />
      ):
      applied?.map((i)=> 
        <Views linkedInLinks={i.linkedInLinks} company={i.company} jobType={i.jobType} companyLogo={i.companyLogo} />
      )}
      </div>
      </div>
    </>
  )
}

export default Applications

function Views(props){
  const {linkedInLinks, company, jobType, companyLogo} = props
return(
  <div className='w-[30rem] h-[20rem] ml-2 mt-20 border-black border-[1px] rounded-3xl bg-dimWhite'>
  <div className='relative flex flex-col items-center justify-center border-b-[1px] border-l-[1px] border-black bg-tertiary w-24 h-16 top-[-1px] right-[-1px] rounded-bl-lg ml-auto'>  

    <div className='flex gap-2 bg-black items-center justify-center text-white font-bold rounded-full w-[90%] h-12'>   
      <a href={linkedInLinks} target="_blank">View</a>
      <div><BiLinkExternal /></div>
    </div> 
   </div> 

   <div className='ml-6 flex gap-4 mb-4'>
   <img src={companyLogo} className='inline-block rounded-lg border-[1px] w-16 h-16 border-black'/>
   <div>
   <h2>{company}</h2>
   <h5>{jobType}</h5>
   </div>
   </div>

   <div className='flex gap-3 ml-6'>
    <div className='bg-white text-center border-black rounded-[30px] border-[1px] w-24 h-fit p-1'>Entry Level</div>
    <div className='bg-white text-center border-black rounded-[30px] border-[1px] w-24 h-fit p-1'>Remote</div>
    <div className='bg-white text-center border-black rounded-[30px] border-[1px] w-24 h-fit p-1'> full time</div>
   </div>

   <div className='flex gap-3 w-[90%] h-[40%] relative bottom-[0%] items-end justify-end'>

    <div className= 'flex bg-white text-center border-black rounded-[10px] border-[1px] w-24 h-fit p-1'>
    <div className='mt-1 mr-1'><FaExclamationTriangle/></div>
    <div> Priority</div>
    </div>

    <div className= 'text-center w-24 h-fit p-1'>+ Add note</div>

    <div className='flex'>
    <div className='mt-2'><MdTimer/></div>
    <div className= 'text-center  w-24 h-fit p-1'> Elapsed T</div>
    </div>

   </div>
  
  </div>
)
}