const Job = require('../models/Job')
const PCR = require("puppeteer-chromium-resolver");
require('dotenv').config(); // load environment variables from .env file
const { Configuration, OpenAIApi } = require("openai"); 
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});    

//initializing openai


const seiURL = "https://www.linkedin.com/jobs/search?trk=guest_homepage-basic_guest_nav_menu_jobs&position=1&pageNum=0"
const queries =['Software engineer', "UX designer", "dev ops engineer"]

const getJobs = (req, res) => {
    Job.find().then(response => {
        res.json({allJobs: response})
    })
}

const deleteAllJobs = (req, res) => {
    Job.deleteMany()
    .then(response => res.json({allJobs: response}))
    .catch(err => console.log(err))
}

const postJobs = async (num) => {
    // initializing variable for recursion
    let cleanedJobArr = []
    let iteration;
    if(num <=10 && num>=0) {
        iteration = num   
    } else {
        iteration = 0
    }
    // settings for puppeteer and pcr
    const options = {};
    const stats = await PCR(options);
    const browser = await stats.puppeteer.launch({
        headless: false,
        args: ["--no-sandbox"],
        executablePath: stats.executablePath
    }).catch(function(error) {
        console.log(error);
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1800,
        height: 1000
    });
    // going to linked in, then navigating to the url passed in
    await page.goto(seiURL);
    const searchBar = await page.waitForSelector('#job-search-bar-keywords')
    await searchBar.click();
    await searchBar.type(queries[iteration]);
    await page.keyboard.press('Enter');
    await page.waitForNavigation(); 
    await autoScroll(page)

// this is what gets the data
const jobData = await page.evaluate(() => {
        const arrOfJobs = []  

         class job {
    constructor(company, position, companyLogo, linkedInLinks, location, datePosted) {
       this.savedBy = [], 
       this.company = company,
       this.postion = position,
       this.companyLogo = companyLogo,
       this.linkedInLinks = linkedInLinks,
       this.location = location
       this.datePosted = datePosted,
       this.jobType = 'unknown'
       this.aboutCompany = 'about'
            }
     }

//map through the list items, make an object out of them, push it to an array 
const listItems = Array.from(document.querySelectorAll('li'))
          listItems.forEach(li => {
            try{
            let linkedInLinks = li.querySelector('a').getAttribute('href')
            let position = li.querySelector('h3').innerText
            let companyLogo = li.querySelector("img").getAttribute('src')
            let company = li.querySelector("h4").innerText
            let location = li.querySelector(".job-search-card__location").innerText
            let datePosted = li.querySelector("time").getAttribute('dateTime')
                let jobClass = new job(company, position, companyLogo, linkedInLinks, location, datePosted)
                 arrOfJobs.push(jobClass)
            }catch (err) {
            return err
            }
        }) 
    return arrOfJobs
    })// end of page evaluation

    //map through the new arr of jobs and add the new about to them
   async function cleanJobArr() {
    let res = await jobData
    try {
    res.forEach(async (j) => {
        if(j.companyLogo != null) {
            cleanedJobArr.push(j)
        } else {
            return
        }
    })
    cleanedJobArr.forEach(async(i) => {
        await createAbout(i.company).then((response) => {
        i.aboutCompany = response
        i.jobType = queries[iteration]
        }) 
        Job.create(i) 
    })
    } catch(err){
        console.log(err)
    }
}
    cleanJobArr()
        await browser.close()

    if(iteration !== 2) {
        postJobs(iteration+1)
    }
}

//change company about info with openAI
const createAbout = async (company) => {
try{
const openai = new OpenAIApi(configuration);
const completion = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [{role: "user", content: `Write a brief, objective paragraph on what the company ${company} does.`}],
});
     return completion.data.choices[0].message.content
} catch (err) {
    console.log(err)
    return err
}
}



    //util function to auto scroll the page and open more divs for scraping
    async function autoScroll(page){
        await page.evaluate(async () => {
             let iteration = 0
            await new Promise((resolve) => {
                var totalHeight = 0;
                var distance = 50;
                var timer = setInterval(() => {
                    var scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;
                    if(totalHeight >= scrollHeight - window.innerHeight && iteration >= 350){
                        clearInterval(timer);
                        resolve();
                    } else {
                        iteration++
                    }
                }, 100);
            });
        });
    }


module.exports = {
    getJobs,
    postJobs,
    deleteAllJobs
}