import React, { useState, useEffect, useContext } from 'react'
import { BiLinkExternal } from 'react-icons/bi';
import axios from 'axios';
import { DataContext } from '../App';

const Applications = () => {
  const {currentUser} = useContext(DataContext)
  const [currentView, setCurrentView] = useState()
  const [applied, setApplied] = useState([])
  const [responses, setResponses] = useState([])
  const [success, setSuccess] = useState(false)
  const [offers, setOffers] = useState([])
  const [interviews, setInterviews] = useState([])

  useEffect(() => {
    axios.get(`https://thrive-server.herokuapp.com/user/jobspopulated/${currentUser.id}`).then(response => {
      setApplied(response.data.foundUser.applications)
      setResponses(response.data.foundUser.responses)
      setOffers(response.data.foundUser.offers)
      setInterviews(response.data.foundUser.interviews)
      if(success) {
        success[1] == 'Applications Sent' ? setCurrentView(response.data.foundUser.applications) : success[1] == 'Responses' ? setCurrentView(response.data.foundUser.responses) : success[1] == 'Interviews' ? setCurrentView(response.data.foundUser.interviews) : setCurrentView(response.data.foundUser.offers)
      }
    })
  }, [success])
  

  return (
    <>
    <SuccessModal success={success} setSuccess={setSuccess}/>
    <div className='bg-dimWhite w-[60%] h-[80vh] mx-auto rounded-3xl shadow-xl border-2 border-gray-400 overflow-y-scroll scrollbar-remove'>
    <h1 className='text-[4rem] underline text-center font-bold '>Job Tracking</h1>

    <ul className='flex gap-10 w-[100%] justify-center font-bold mt-4 text-xl'>
        <li onClick={() => setCurrentView(applied)} className='hover:underline font-bold'>Applied</li>
        <li onClick={() => setCurrentView(responses)} className='hover:underline font-bold'>Responses</li>
        <li onClick={() => setCurrentView(interviews)} className='hover:underline font-bold'>Interviews</li>
        <li onClick={() => setCurrentView(offers)} className='hover:underline font-bold'>Offers</li>
      </ul>
      <div className='flex flex-row flex-wrap pl-5'>
      {currentView?currentView.map((i)=> 
        <Views linkedInLinks={i.linkedInLinks} id={i._id} setSuccess={setSuccess} currentView={currentView == responses? "Responses" : currentView == interviews? "Interviews": "Offers"} company={i.company} jobType={i.jobType} companyLogo={i.companyLogo} />
      ):
      applied?.map((i)=> 
        <Views linkedInLinks={i.linkedInLinks} id={i._id} setSuccess={setSuccess} currentView={"Applications Sent"} company={i.company} jobType={i.jobType} companyLogo={i.companyLogo} />
      )}
      </div>
      </div>
    </>
  )
}

export default Applications

function Views(props){
  const {linkedInLinks, company, jobType, id, currentView, setSuccess, companyLogo} = props
  const {currentUser} = useContext(DataContext)

  const removeCompany = () => {
    axios.put(`https://thrive-server.herokuapp.com/user/updatejobs/${currentUser.id}/${id}`, {
      'removeOrAdd': "remove", "type": currentView})
      .then(() => {
        setSuccess([true, currentView])
      })
  }
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

    <div className= 'text-center w-24 h-fit p-1'>+ Add note</div>
    <div className='text-center w-24 h-fit p-1 bg-red-300 rounded-xl font-bold cursor-pointer' onClick={removeCompany}>Remove</div>
   </div>
  
  </div>
)
}

//success modal
const SuccessModal = ({setSuccess, success}) => {

  useEffect(() => {
    setTimeout(() => {
      setSuccess(false)
    }, 3000)
  }, [success])

  return (
    <>
    {success?
    <div className='w-screen h-screen flex items-center justify-center absolute z-[100]'>
    <div className='flex-col text-center mb-52 bg-green-300 p-2 rounded-xl scale-[1.5]'>
    <div className='flex justify-center'>
    <h1 className='font-bold text-xl ml-auto'>Success!</h1>
    <div onClick={() => setSuccess(false)} className='ml-auto mb-2 font-bold mr-2 cursor-pointer'>x</div>
    </div>
    <p className='font-bold'>Your changes have been saved.</p>
    </div>
    </div>
    :null}
    </>
  )
}