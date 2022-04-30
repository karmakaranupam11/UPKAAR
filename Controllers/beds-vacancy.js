const mongoose = require("mongoose");

const { Posts } = require("../Models/posts");
const User  = require("../Models/users");


const addBedVacancy = async (req, res) => {
     
    console.log(req.body);
    try {
    const newPost =  await Posts.create({
        name: req.body.username,
        author: req.user._id,
        organizationname : req.body.organization,
        address : req.body.address,
        city: req.body.city,
        usercontact: req.body.contact,
        postalcode: req.body.postalcode,
        state: req.body.state,
        noOfBeds: req.body.noOfBeds,
        hospitalName: req.body.hospitalName,

    })

    const user = await User.findById(req.user._id);
    
    user.posts.push(newPost._id);
    
    await user.save();

    res.status(201).json({
        success: true,
        message: newPost
    });
    } catch(error) {
        res.status(500).json({
            success : true,
            message : error.message
        });
    }

}

const removePost = async (req, res) =>{
   
    console.log("this is the post id before :",req.params.id);
    console.log("current user id : ",req.user._id);
    try{

        const post = await Posts.findById(req.params.id);
        
        console.log("the author id : ",post.author.toString());


        // check if the post is not found
        if(!post){
            return res.status(404).json({
                success : false,
                message : "Post not found"
            })
        }
       
        // if the user is not authorized then
        if(post.author.toString() !== req.user._id.toString()){
           return res.status(401).json({
               success : false,
               message : "unauthorized"
           })
        }
        
        await post.remove();
        
        // get the user document
        const user = await User.findById(req.user._id);
        

        // remove the post id from teh user
        const index = user.posts.indexOf(req.params.id);
        
        user.posts.splice(index,1);

        await user.save();

        res.status(200).json({
            success : true,
            message : "post deleted successfully"
        });

    }
    catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}



const findAllBedVacncy = async () => {
    return await Posts.find({}, (err, data) => {
        if(err) {
            console.log("Error: retrieving data from database");
            return;
        }
        // console.log("data : ", data);
        return data;
    });
}

const findBedVacancyByPostalcode = async (zipcode) => {
    return await Posts.find({postalcode: zipcode}, (err, data) => {
        if(err) {
            console.log("Error: retrieving data from database");
            return;
        }
        // console.log("filtered data : ", data);
        return data;
    });
}


module.exports =  {
    addBedVacancy,
    removePost,
    findAllBedVacncy,
    findBedVacancyByPostalcode
}