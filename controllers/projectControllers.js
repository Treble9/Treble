import mongoose from "mongoose";
import Project  from "../models/PROJECT.js";

export const getProjects = async (req, res) => {
    //to get auth projects, the id of the project owner must be generated
    // find project attached to user
   //if no project attached to user send no project

    try{
        const getUserProject = await Project.find(); //PostMessage.find takes time so we make it asynchronous
        res.status(200).json(getUserProject)
    } catch(err) {
        res.status(404).json({ message: err.message });
    }
}

// export const createPosts = async (req, res) => {
         // when creating project, id of the creator should be added to the model
//     const post = req.body; //post takes in the input passed from the frontend as a request (to create post containing the values gotten from the input) 

//     const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString()}) //the post values maps the PostMessages schema to create a new post in the db
//     try {
//         await newPost.save(); //asynchronous function, saves newPost in db
//         res.status(201).json(newPost);
//     } catch(err) {
//         res.status(409).json({ message: err.message });
//     }
// }

// export const updatePosts = async (req, res) => {
//     const { id: _id} = req.params;
//     const postToUpdate = req.body;

//     if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');
//     const updatedPost = await PostMessage.findByIdAndUpdate(_id, postToUpdate, { new:true });
//     res.status(200).json(updatedPost);
// }

// export const deletePosts = async (req, res) => {
//     const { id } = req.params; 

//     if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

//     await PostMessage.findByIdAndRemove(id);

//     res.status(200).json({message: 'Post Deleted Successfully'});
// }

// export const likePosts = async (req, res) => {
//     const { id } = req.params;

//     if(!req.userId) return res.json({ message: 'Unauthenticated'})

//     if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

//     const post = await PostMessage.findById(id);

//     const index = post.likes.findIndex((id) => id === String(req.userId));

//     if (index === -1) {
//         post.likes.push(req.userId);
//     } else {
//         post.likes = post.likes.filter((id) => id !== String(req.userId))
//     }

//     const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true});
//     console.log(updatedPost)

//     res.status(200).json(updatedPost);

// } 