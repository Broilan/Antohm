import React from 'react';
import axios from 'axios'

export default function handleFile({type, e, userid}) {
    return new Promise ((resolve, reject) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
        const data = {"postType": type, "photo": reader.result }
        if(type == "pfp") {
                resolve(axios.post(`http://localhost:8000/upload/${userid}`, data))  
        }else if(type == "post") {
            console.log(reader)    
            resolve(reader.result)
        }
        }
    })
  }





