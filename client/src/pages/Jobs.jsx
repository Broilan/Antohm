import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {states} from '../data/data'
import { IoMdBriefcase } from 'react-icons/io';

const Jobs = () => {
const [jobs, setJobs] = useState([])
const [sortedJobs, setSortedJobs] = useState([])
const [stackedFilters, setStackedFilters] = useState({location: false, jobType: false, level: false, salary: false })
const [jobModal, setJobModal] = useState(true)
const [selected, setSelected] = useState()


    
    useEffect(() => {
        axios.get('https://thrive-server.herokuapp.com/job/allJobs').then(response => {
            setJobs(response.data.allJobs.reverse())
            setSortedJobs(response.data.allJobs.reverse())
        })
    }, [])

    useEffect(() => {
    let arr = []
    let nonNullKeys = new Map()
        Object.keys(stackedFilters).forEach((key, index) => {
            if(stackedFilters[key]) {
                let filteredArr = jobs.filter((job) => job[key].includes(stackedFilters[key]))  
                nonNullKeys.set(Object.keys(stackedFilters)[index], stackedFilters[key] )
                arr.push(filteredArr)
            }
        })
        let newArr = Array.from(new Set(arr.flat()))
        if(nonNullKeys.size == 1) {
            setSortedJobs(newArr.filter((job) => job.location.includes(nonNullKeys.get('location')) || job.jobType.includes(nonNullKeys.get('jobType'))))
        } else {
            setSortedJobs(newArr.filter((job) => job.location.includes(nonNullKeys.get('location')) && job.jobType.includes(nonNullKeys.get('jobType'))))
        }
        }, [stackedFilters])

     function filterJobs(filter, filterType) {
                   switch (filterType){
            case "position":
             setStackedFilters({...stackedFilters, jobType: filter})
            break;

            case 'location': 
                setStackedFilters({...stackedFilters, location: filter})
            break;

            case 'salary': 
            setStackedFilters({...stackedFilters, salary: filter})
            break;

            case 'level': 
            setStackedFilters({...stackedFilters, level: filter})
            break;
        }  
    }    

    function openJob(j) {
        setSelected(j)
        setJobModal(true)
    }


  return (
    <>

    <div className='flex w-screen h-screen justify-center overflow-y-hidden'>
    <div className='border-gray-400 border-[1px] rounded-tl-xl h-screen  bg-white w-[25vw] lg:w-[50vw] sm:w-screen'>

        <div>
            <div className='bg-blue-400 w-[100%] h-24 outline-blue-500 rounded-tl-xl flex flex-col items-center sm:rounded-none'>
            <div className='text-white text-center mt-1 text-xl font-bold 1.5xl:text-sm sm:text-xl'>Search our api for thousands of jobs. <br />  Updated <p className='underline text-2xl inline'>everyday.</p></div>

           <div className='translate-y-8 z-10 flex gap-8 1.5xl:translate-y-10 sm:translate-y-8 1.5xl:gap-3 lg:gap-16 md:gap-8 sm:gap-32 xs:gap-20 2xs:gap-12'>           
           <select onChange={(e)=> filterJobs(e.target.value, 'location')} className=' bg-blue-600 cursor-pointer h-6 border-gray-500 border-[1px] w-24 rounded-2xl text-center text-white font-bold'>
            <option hidden defaultValue>Location</option>
                {states.map((s) =>  <option value={s}>{s}</option> )}
           </select>
           {/* <select onChange={(e)=> filterJobs(e.target.value, 'salary')} className='bg-blue-600 cursor-pointer h-6 border-gray-500 border-[1px] w-24 rounded-2xl text-center text-white font-bold'>
                <option hidden defaultValue>Salary</option>
                <option value="$0-$25k">$0-$25k</option>
                <option value="$25k-$50k">$25k-$50k</option>
                <option value="$50k-$75k">$50k-$75k</option>
                <option value="$75k-$100k">$75k-$100k</option>
                <option value="$100k-$150k">$100k-$150k</option>
                <option value="$150k-$200k">$150k-$200k</option>
                <option value="$200k+">$200k+</option>
           </select> */}
           {/* <select onChange={(e)=> filterJobs(e.target.value, 'level')} className='bg-blue-600 cursor-pointer border-gray-500 h-6 border-[1px] w-24 rounded-2xl text-center text-white font-bold'>
                <option hidden defaultValue>Level</option>
                <option value="Entry">Entry</option>
                <option value="Mid">Mid</option>
                <option value="Senior">Senior</option>
           </select> */}
           <select onChange={(e) => filterJobs(e.target.value, "position")} className='bg-blue-600 cursor-pointer h-6 border-gray-500 border-[1px] w-24 rounded-2xl text-center text-white font-bold'>
            <option hidden value>Position</option>
            <option value='Software engineer'>Software Engineer</option>
            <option value="UX designer">UX Engineer</option>
            <option value="dev ops engineer">Dev Ops</option>
           </select>
           <div onClick={() => setSortedJobs(jobs)} className='bg-blue-600 cursor-pointer border-gray-500 border-[1px] w-24 h-6 rounded-2xl text-center text-white font-bold'>Reset</div>
           </div>


            </div>
        </div>

        <div className='border-[1px] border-gray-400 w-[100%] h-screen mt-6 flex flex-col overflow-y-scroll'>
            <div className='border-[1px] border-gray-400 w-[100%] h-26  cursor-pointer'>
                
                {sortedJobs.map((j) => 
                <div className={`flex border-gray-300 hover:bg-gray-300 ${j == selected? "bg-gray-300": null} border-[1px]`} onClick={() => openJob(j)}>
                <img src={j.companyLogo} alt="xx" className='w-16 h-16 rounded-xl border-black border-[1px] m-1'/>
                <div>
                <p className='font-bold px-1 mb-1'>{j.jobType}</p>
                <p className='font-bold px-1'>{j.company}</p>
                <p className='px-1'>{j.datePosted}</p>
                </div>
                </div> 
                )}


            </div>
        </div>

    </div>



    <div className='border-gray-400 border-[1px] rounded-tr-xl h-screen bg-white w-[40vw] lg:w-[50vw] sm:hidden'>

        <div className='m-2 border-b-gray-400 border-b-[1px]'>

            <div className='flex'>
                <img src={selected? selected.companyLogo: jobs[0]?.companyLogo} alt="" className='rounded-[50%] lg:w-16 lg:h-16 border-black border-[1px] w-24 h-24'/>
                <h1 className='text-[3.5rem] lg:text-4xl lg:mt-3 font-semibold'>{selected? selected.company: jobs[0]?.company}</h1>
                <div className='flex gap-10 ml-auto mr-2 text-[1rem] '>

                <div className='text-xl'>
                    <h1 className='underline font-semibold text-3xl'>Location</h1>
                    <h3 className='font-semibold text-xl'>{selected? selected.location: jobs[0]?.location}</h3>
                </div>           
                </div>
            </div>

        <div className='flex mt-3 items-center ml-2'>
        <div className='text-4xl'><IoMdBriefcase /></div>  
        <h2 className='text-4xl font-bold lg:text-2xl'> {selected? selected.jobType: jobs[0]?.jobType}</h2>
        </div>
        <div className='flex w-[100%] justify-end'>        
        <a href={selected? selected.linkedInLinks: jobs[0]?.linkedInLinks} target="_blank" className='bg-blue-500 rounded-xl text-white text-xl mt-[-3rem] h-fit shadow-xl mb-1 font-bold text-center p-2 cursor-pointer'>Apply</a>
        </div>   
        </div>
        <div className='font-bold text-[3rem] ml-2 underline'>About The Company</div>
        <p className='p-4 font-semibold text-3xl'>{selected? selected.aboutCompany: jobs[0]?.aboutCompany}</p>

    </div>

        {/* ////////////////////////////MOBILE////////////////////////// */}
    {jobModal?
    <div className='z-[100] absolute h-screen w-screen items-center justify-center bg-transBlack hidden md:flex'>
    <div className='border-gray-400 border-[1px] rounded-2xl w-[20rem] h-fit bg-white lg:w-[50vw] absolute z-[100] 2xs:w-screen 3xs:h-screen 3xs:mb-32 3xs:rounded-none'>

<div className='m-2 border-b-gray-400 border-b-[1px]'>

    <div className='flex'>
        <img src={selected? selected.companyLogo: jobs[0]?.companyLogo} className='rounded-[50%] lg:w-16 lg:h-16 border-black border-[1px] w-24 h-24'/>
        <div className='flex flex-col'>
        <h1 className='text-xl ml-1 mr-1 font-semibold underline'>{selected? selected.company: jobs[0]?.company}</h1>
            <h3 className='font-semibold text-xl'>{selected? selected.location: jobs[0]?.location}</h3>
        </div>
            <div onClick={() => setJobModal(false)} className='bg-black rounded-[50%] cursor-pointer h-4 w-4 ml-auto flex items-center justify-center text-white'>x</div>
    </div>

<div className='flex mt-3 items-center ml-2'>
<div className='text-4xl'><IoMdBriefcase /></div>  
<h2 className='text-4xl font-bold lg:text-2xl'> {selected? selected.jobType: jobs[0]?.jobType}</h2>
</div>
<div className='flex w-[100%] justify-end'>        
<a href={selected? selected.linkedInLinks: jobs[0]?.linkedInLinks} target="_blank" className='bg-blue-500 rounded-xl text-white text-xl mt-[-3rem] h-fit shadow-xl mb-1 font-bold text-center p-2 cursor-pointer'>Apply</a>
</div>   
</div>
<div className='font-bold text-3xl text-center ml-2 underline'>About The Company</div>
<p className='p-4 font-semibold text-xl max-w-[750px] 3xs:text-lg text-center'>{selected? selected.aboutCompany: jobs[0]?.aboutCompany}</p>

    </div>
    </div>
      :null  }
    </div>
    </>
  )
}

export default Jobs