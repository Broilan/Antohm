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
                resolve(axios.post(`https://thrive-server.herokuapp.com/upload/${userid}`, data))  
        }else if(type == "post") {
            resolve(reader.result)
        }
        }
    })
  }





