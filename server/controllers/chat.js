const User = require('../models/User')
const Notification = require('../models/Notification')
const DmList = require('../models/DmList')
const Dm = require("../models/Dm")

require('dotenv').config();

const postDM = (req, res) => {
    Dm.create({
        from: req.params.from,
        to: req.params.to,
        message: req.body.message
    }) .then(newDM => {
    User.findById(req.params.from)
    .then(foundUserX => {
        let arr = foundUserX.Dms
        arr.push(newDM)
        User.findByIdAndUpdate(req.params.from, {
            Dms: arr
        }) .then(response => {
        })
         User.findById(req.params.to)
        .then(foundUserY => {
            let arr2 = foundUserY.Dms
            arr2.push(newDM)
            User.findByIdAndUpdate(req.params.to, {
                Dms: arr2
            }).then(response=> {
                if(DmList.find({ $and: [{from: req.params.from}, {to:req.params.to}]}) == false) {
                    console.log('yoooo')
                    DmList.create({
                        from: req.params.from,
                        to: req.params.to,
                        messages: []
                    })
                }
            DmList.findOne({ $and: [{from: req.params.from}, {to:req.params.to}]})
            .then(dmList => {
                console.log(dmList)
                let dmArr = dmList.messages
                dmArr.push(newDM)
                DmList.findOneAndUpdate({ $and: [{from: req.params.from}, {to:req.params.to}]}, {
                    messages: dmArr
                })
                .then(response => {
                    console.log(response)
                })
            })
                
            })
        })
    })                    
res.json({'dmarrrr': newDM})
})

}

module.exports = { 
    postDM,
};
