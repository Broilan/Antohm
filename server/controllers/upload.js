require('dotenv').config()
const Upload = require('../models/Upload')
const User = require('../models/User')
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const getPhoto = (async (req, res) => {
    try {
      const posts = await Upload.find({});
      res.status(200).json({ success: true, data: posts });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
    }
  });

  const postPhoto =  async (req, res) => {
      const { photo, postType } = req.body;
      const photoUrl = await cloudinary.uploader.upload(photo)
      Upload.create({
        photo: photoUrl.url,
        postType: postType,
        user: req.params.user || null,
        post: req.params.post || null
      })
      .then(response => {
        if(response.postType == "header") {
          User.findByIdAndUpdate(req.params.user, {
            pfp: response.photo
          }).then(response => { res.json({response:response}), console.log(response)})
        } else {
        User.findByIdAndUpdate(req.params.user, {
          header: response.photo
        }).then(response => { res.json({response:response}), console.log(response)})
        }})}
        
        
      


module.exports = {
    postPhoto,
    getPhoto
};
