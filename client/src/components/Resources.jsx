import React, {useEffect, useContext, useState} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { DataContext } from '../App';
import { BiLinkExternal } from 'react-icons/bi';


const Resources = () => {
  const {currentUser} = useContext(DataContext)
  const [error, setError] = useState(false)
  const [makeSureModal, setMakeSureModal] = useState(false)
  const [current, setCurrent] = useState([])
  const [currentStyle, setCurrentStyle] = useState('All')
  const [success, setSuccess] = useState(false)
  const [resources, setResources] = useState()

  useEffect(() => {
    axios.get(`http://localhost:8000/user/resources/${currentUser.id}`)
    .then(response => {
      setCurrent(response.data.resources)
      setResources(response.data.resources)
    }).catch(err => console.log(err))
  }, [success])

  function changeType(resourceId, newType) {
    console.log(resourceId, newType)
    axios.put(`http://localhost:8000/user/updateresourcetype/${resourceId}`, {"type": newType})
    .then(() => setSuccess(true))
    .catch(() => setError(true))
  }

  function filterResources(type) {
    let filtered = resources.filter((r) => r.resourceType === type)
    setCurrent(filtered)
    setCurrentStyle(type)
  }

  return (
    <>
    <SuccessModal success={success} setSuccess={setSuccess}/>
    <ErrorModal error={error} setError={setError}/>
    <MakeSure makeSureModal={makeSureModal} setMakeSureModal={setMakeSureModal} setSuccess={setSuccess} setError={setError}/>

    <div className='bg-dimWhite w-[60%] h-[80vh] mx-auto rounded-3xl shadow-xl border-2 border-gray-400'>
    <h1 className='text-[4rem] underline text-center font-bold '>My resources</h1>

                <ul className='flex gap-10 w-[100%] justify-center font-bold mt-4 text-xl'>
                <li onClick={() => setCurrent(resources)} className={`hover:underline cursor-pointer ${current==resources? 'underline': null} `}>All</li>
                <li onClick={() => filterResources('Skill-Upkeep')} className={`hover:underline cursor-pointer ${currentStyle=='Skill-Upkeep' && current != resources? 'underline': null} `}>Skill-Upkeep</li>
                <li onClick={() => filterResources('Job Search')} className={`hover:underline cursor-pointer ${currentStyle=='Job Search' && current != resources? 'underline': null} `}>Job Search</li>
                </ul>
                 
                <div className='flex flex-wrap h-fit ml-2 mt-8 gap-10 w-[100%]'>
                {current?.map((r) =>
                <div className='w-[30rem] h-[12rem] bg-dimWhite rounded-3xl border-black border-[1.5px]'>
                <div className='ml-auto mr-[-1.5px] mt-[-0.1rem] rounded-tl-none rounded-br-none bg-tertiary border-black border-t-0 border-r-0 border-[1px] w-20 h-12 rounded-3xl p-1 text-center'> 
                <Link to={r.linkTo} className='bg-black text-white font-bold rounded-3xl h-10 p-2 flex gap-1'>
                <div>view</div>
                <div className='pt-1'><BiLinkExternal /></div>
                </Link>
                </div>

                <div className='ml-2 mt-[-2rem]'>  
                <div className='flex gap-4'>
                    <img src={r.resourceBy.pfp} className='rounded-lg border-[1px] w-16 h-16 border-black'/>
                    <div>
                    <div className='font-bold'>{r.resourceBy.name}</div>
                    <div className='font-bold text-sm'>@{r.resourceBy.displayName}</div>
                    </div>
                </div>

                <div>
                    <p className='truncate mt-4'>{r.post[0].content}</p>
                </div>

                <div className='flex gap-4 mt-4 '>
                  <select onChange={(e) => changeType(r._id, e.target.value)} className='border-black border-[0.5px] rounded-3xl p-1 bg-white font-semibold'>
                  <option value={r.resourceType} selected hidden>{r.resourceType}</option>
                  <option value="Skill-Upkeep">Skill-Upkeep</option>
                  <option value="Job Search">Job Search</option>  
                  </select>   
                    <div className='font-semibold p-1'>{new Intl.DateTimeFormat('en-us').format(new Date(r.date))}</div>
                    <div onClick={() => setMakeSureModal(r._id)} className='mr-2 ml-auto cursor-pointer border-black border-[0.5px] rounded-3xl p-1 bg-red-500 text-white font-semibold'>Delete</div>
                </div> 

                </div>
                </div>   
                  )}
                </div>
                </div>
               
    </>
  )
}

export default Resources

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

//error modal
const ErrorModal = ({setError, error}) => {
    useEffect(() => {
      setTimeout(() => {
        setError(false)
      }, 3000)
    }, [error])
  
    return (
      <>
      {error?
      <div className='w-screen h-screen flex items-center justify-center absolute z-[100]'>
      <div className='flex-col text-center mb-52 bg-red-300 p-2 rounded-xl scale-[1.5]'>
      <div className='flex justify-center'>
      <h1 className='font-bold text-xl ml-auto'>Error!</h1>
      <div onClick={() => setError(false)} className='ml-auto mb-2 font-bold mr-2 cursor-pointer'>x</div>
      </div>
      <p className='font-bold'>Something went wrong.</p>
      </div>
      </div>
      :null}
      </>
    )
  }

  const MakeSure = ({setMakeSureModal, makeSureModal, setSuccess, setError}) => {    
    const {currentUser} = useContext(DataContext)

    function deleteResource() {
      axios.delete(`http://localhost:8000/user/deleteresource/${currentUser.id}/${makeSureModal}`)
      .then(() => {
        setSuccess(true)
        setMakeSureModal(false)
      }).catch(() => setError(true))
    }
  
    return (
  
      <>
      {makeSureModal?
      <div className='w-screen h-screen flex items-center justify-center absolute z-[100]'>
      <div className='flex-col text-center mb-52 bg-red-300 p-2 rounded-xl scale-[1.5]'>
      <div className='flex justify-center'>
      <h1 className='font-bold text-xl ml-auto'>Are you sure?</h1>
      <div onClick={() => setMakeSureModal(false)} className='ml-auto mb-2 font-bold mr-2 cursor-pointer'>x</div>
      </div>
      <p className='font-bold'>If you delete this note, you can't recover it.</p>
      <div className='flex justify-evenly'>
      <button onClick={() => setMakeSureModal(false)} className='bg-blue-300 p-1 font-bold rounded-lg'>Nevermind</button>
      <button onClick={deleteResource} className='bg-red-400 p-1 font-bold rounded-lg'>Delete</button>
      </div>
      </div>
      </div>
      :null}
      </>
    )
  }