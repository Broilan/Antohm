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
            DmList.findOne({ $and: [
                { $or: [{from: req.params.from}, {from: req.params.to}]},
                { $or: [{to: req.params.to}, {to: req.params.from}]},
            ]})
            .then(dmList => {
                if(dmList == null) {
                    DmList.create({
                        from: req.params.from,
                        to: req.params.to,
                        messages: [newDM]
                    }) .then(response => {
                        res.json({'newDmArr': response})
                    })
                } else { 
                let dmArr = dmList.messages
                dmArr.push(newDM)
                DmList.findOneAndUpdate(({ $and: [
                    { $or: [{from: req.params.from}, {from: req.params.to}]},
                    { $or: [{to: req.params.to}, {to: req.params.from}]}
                ]}), {
                    messages: dmArr
                }).then(response => {
                     DmList.findOne({ $and: [
                    { $or: [{from: req.params.from}, {from: req.params.to}]},
                    { $or: [{to: req.params.to}, {to: req.params.from}]}
                ]}).populate('messages').then(response=>{res.json({"newDmArr": response})})
                })
            }

            })
                
            })
        })
    })                    
})

}

module.exports = { 
    postDM,
};
