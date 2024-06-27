# Antohm

Antohm is a fullstack social media geared towards helping job seekers in STEM find a job, and a supportive community. Presently, Antohm operates just like any other social media. It allows users to post, comment, like, bookmark, DM, view other users profiles, and so on and so forth. What makes Antohm unique, though, is that it comes with a job board and a 'quantitative dashboard'.

## Technologies

MongoDB, React, Javascript, Socket.IO, Cloudinary, Puppeteer, OpenAI, Express, Node, Tailwind, & Vite

## Job Board

As of 04/04/2023, the job board makes use of Puppeteer to scrape job data, (currently only scrapes Software Engineer, Dev Ops, and UX design positions) from LinkedIns job board every 3 days. Post scraping, the about sections are generated using OPEN AI's API, and then the scraped jobs are posted to my database. When you hit apply, you'll be redirected to LinkedIns application page. I'd like to use my own data in the future for the sake of user experience and responsiveness, but for now I don't have access to the resources necessary. Below, you'll find photos of the job board in action.

## Quantitative Dashboard

The quantitative dashboard makes use of a calendar, Kanban board, job tracker, a task/to-do list, and a saved dates lists in order to help the user organize and hasten their job search. Below, you'll find photos of the quantitative board in action.

## Site

https://thrivestem.netlify.app/

