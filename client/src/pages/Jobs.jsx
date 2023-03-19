import React, {useState, useEffect, useContext, useRef} from 'react'
import axios from 'axios';
import {states} from '../data/data'
import { DataContext } from '../App';
import { IoMdBriefcase } from 'react-icons/io';

const Jobs = () => {
const [jobs, setJobs] = useState([])
const [sortedJobs, setSortedJobs] = useState([])
const [stackedFilters, setStackedFilters] = useState({location: false, jobType: false, level: false, salary: false })
const [selected, setSelected] = useState()
const {currentUser, isAuthenticated} = useContext(DataContext)


    
    useEffect(() => {
        axios.get('http://localhost:8000/job/allJobs').then(response => {
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


  return (
    <>

    <div className='flex w-screen h-screen justify-center'>
    <div className='border-gray-400 border-[1px] rounded-tl-xl h-screen bg-white w-[25vw]'>

        <div>
            <div className='bg-blue-400 w-[100%] h-24 outline-blue-500 rounded-tl-xl flex flex-col items-center'>
            <p className='text-white text-center mt-1 text-xl font-bold'>Search our api for one million + jobs. <br />  Updated <p className='underline text-2xl inline'>everyday.</p></p>

           <div className='translate-y-8 flex gap-8'>           
           <select onChange={(e)=> filterJobs(e.target.value, 'location')} className='bg-blue-600 cursor-pointer border-gray-500 border-[1px] w-24 rounded-2xl text-center text-white font-bold'>
            <option hidden selected>Location</option>
                {states.map((s) =>  <option value={s}>{s}</option> )}
           </select>
           <select onChange={(e)=> filterJobs(e.target.value, 'salary')} className='bg-blue-600 cursor-pointer border-gray-500 border-[1px] w-24 rounded-2xl text-center text-white font-bold'>
                <option hidden selected>Salary</option>
                <option value="$0-$25k">$0-$25k</option>
                <option value="$25k-$50k">$25k-$50k</option>
                <option value="$50k-$75k">$50k-$75k</option>
                <option value="$75k-$100k">$75k-$100k</option>
                <option value="$100k-$150k">$100k-$150k</option>
                <option value="$150k-$200k">$150k-$200k</option>
                <option value="$200k+">$200k+</option>
           </select>
           <select onChange={(e)=> filterJobs(e.target.value, 'level')} className='bg-blue-600 cursor-pointer border-gray-500 border-[1px] w-24 rounded-2xl text-center text-white font-bold'>
                <option hidden selected>Level</option>
                <option value="Entry">Entry</option>
                <option value="Mid">Mid</option>
                <option value="Senior">Senior</option>
           </select>
           <select onChange={(e) => filterJobs(e.target.value, "position")} className='bg-blue-600 cursor-pointer border-gray-500 border-[1px] w-24 rounded-2xl text-center text-white font-bold'>
            <option hidden selected>Position</option>
            <option value='Software engineer'>Software Engineer</option>
            <option value="UX designer">UX Engineer</option>
            <option value="dev ops engineer">Dev Ops</option>
           </select>
           <div onClick={() => setSortedJobs(jobs)} className='bg-blue-600 cursor-pointer border-gray-500 border-[1px] w-24 rounded-2xl text-center text-white font-bold'>Reset</div>
           </div>


            </div>
        </div>

        <div className='border-[1px] border-gray-400 w-[100%] h-screen mt-6 flex flex-col overflow-y-scroll'>
            <div className='border-[1px] border-gray-400 w-[100%] h-26  cursor-pointer'>
                
                {sortedJobs.map((j) =>
                <div className={`flex border-gray-300 hover:bg-gray-300 ${j == selected? "bg-gray-300": null} border-[1px]`} onClick={(e) => setSelected(j)}>
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



    <div className='border-gray-400 border-[1px] rounded-tr-xl h-screen bg-white w-[40vw]'>

        <div className='m-2 border-b-gray-400 border-b-[1px]'>

            <div className='flex'>
                <img src={selected? selected.companyLogo: jobs[0]?.companyLogo} alt="" className='rounded-[50%] border-black border-[1px] w-24 h-24'/>
                <h1 className='text-[3.5rem] font-semibold'>{selected? selected.company: jobs[0]?.company}</h1>
                <div className='flex gap-10 ml-auto mr-2 text-[1rem] '>

                <div className='text-xl'>
                    <h1 className='underline font-semibold text-3xl'>Location</h1>
                    <h3 className='font-semibold text-xl'>{selected? selected.location: jobs[0]?.aboutCompany}</h3>
                </div>           
                </div>
            </div>

        <div className='flex items-center ml-2'>
        <div className='text-[5rem] mt-1'><IoMdBriefcase /></div>  
        <h2 className='text-[3rem] font-bold'> {selected? selected.jobType: jobs[0]?.jobType}</h2>
        </div>
        <div className='flex w-[100%] justify-end'>        
        <a href={selected? selected.linkedInLinks: jobs[0]?.linkedInLinks} target="_blank" className='bg-blue-500 rounded-xl text-white text-4xl mt-[-4rem] mb-2 font-bold text-center p-2 cursor-pointer'>Apply</a>
        </div>   
        </div>
        <div className='font-bold text-[5rem] ml-2 underline'>About The Company</div>
        <p className='p-4 font-semibold text-3xl max-w-[750px]'>{selected? selected.aboutCompany: jobs[0]?.aboutCompany}</p>

    </div>
    </div>
    </>
  )
}

export default Jobs