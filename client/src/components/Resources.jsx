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
    axios.get(`https://thrive-server.herokuapp.com/user/resources/${currentUser.id}`)
    .then(response => {
      setCurrent(response.data.resources)
      setResources(response.data.resources)
    }).catch(err => console.log(err))
  }, [success])

  function changeType(resourceId, newType) {
    axios.put(`https://thrive-server.herokuapp.com/user/updateresourcetype/${resourceId}`, {"type": newType})
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

    <div className='flex flex-col justify-start bg-dimWhite w-[60%] h-[80vh] mx-auto rounded-3xl shadow-xl border-2 border-gray-400'>
    <h1 className='text-[3rem] underline text-center font-bold '>My resources</h1>

                <ul className='flex gap-8 w-[100%] justify-center font-bold mt-4 text-lg'>
                <li onClick={() => setCurrent(resources)} className={`hover:underline cursor-pointer ${current==resources? 'underline': null} `}>All</li>
                <li onClick={() => filterResources('Skill-Upkeep')} className={`hover:underline cursor-pointer ${currentStyle=='Skill-Upkeep' && current != resources? 'underline': null} `}>Skill-Upkeep</li>
                <li onClick={() => filterResources('Job Search')} className={`hover:underline cursor-pointer ${currentStyle=='Job Search' && current != resources? 'underline': null} `}>Job Search</li>
                </ul>
                 
                <div className='flex flex-wrap gap-4 ml-2 h-fit mt-8 w-[100%] 1.25xl:gap-2'>
                {current?.map((r) =>
                <div className='w-[32%] py-1 h-fit bg-dimWhite rounded-3xl border-black border-[1.5px]'>
                <div className='ml-auto rounded-tl-none rounded-br-none bg-dimWhite border-black border-t-0 border-r-0 border-[1px] w-fit h-fit p-1 rounded-3xl text-center'> 
                <Link to={r.linkTo} className='bg-black text-white text-sm font-bold rounded-3xl h-fit w-fit p-2 flex gap-1'>
                <div>view</div>
                <div className='pt-1'><BiLinkExternal /></div>
                </Link>
                </div>

                <div className='ml-2 mt-[-2rem]'>  
                <div className='flex gap-4'>
                    <img src={r.resourceBy.pfp} className='rounded-lg border-[1px] w-12 h-12 border-black'/>
                    <div>
                    <div className='font-bold'>{r.resourceBy.name}</div>
                    <div className='font-bold text-sm'>@{r.resourceBy.displayName}</div>
                    </div>
                </div>

                <div>
                    <p className='truncate mt-4'>{r.post.content}</p>
                </div>

                <div className='flex gap-4 mt-4 '>
                  <select onChange={(e) => changeType(r._id, e.target.value)} className='border-black border-[0.5px] rounded-3xl p-1 bg-white font-semibold h-fit mt-auto '>
                  <option value={r.resourceType} selected hidden>{r.resourceType}</option>
                  <option value="Skill-Upkeep">Skill-Upkeep</option>
                  <option value="Job Search">Job Search</option>  
                  </select>   
                  <div className='flex 1.25xl:flex-col 1.25xl:ml-auto'>
                    <div className='font-semibold p-1'>{new Intl.DateTimeFormat('en-us').format(new Date(r.date))}</div>
                    <div onClick={() => setMakeSureModal(r._id)} className='mr-2 ml-auto cursor-pointer border-black border-[0.5px] rounded-3xl p-1 bg-red-500 text-white font-semibold'>Delete</div>
                  </div>
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
    <div className='flex-col text-center mb-52 bg-green-300 p-2 rounded-xl scale-[1.2]'>
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
      <div className='flex-col text-center mb-52 bg-red-300 p-2 rounded-xl scale-[1.2]'>
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
      axios.delete(`https://thrive-server.herokuapp.com/user/deleteresource/${currentUser.id}/${makeSureModal}`)
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