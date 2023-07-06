import mongoose from "mongoose";
import Project from "../models/PROJECT.js";
import User from "../models/USER.js";

export const getProjects = async (req, res) => {

    try {
        const creator = req.user.email //logged in user email
        const getUserProject = await User.find(creator).populate('projects');
        res.status(200).json({ status: 'Success', data: getUserProject })
    } catch (err) {
        res.status(404).json({ status: 'Error', message: err.message });
    }
}

export const createProject = async (req, res) => {
    //when creating project, id of the creator should be added to the model
    const project = req.body;

    const newProject = new Project({ ...project, creator: req.email, createdAt: new Date().toISOString() })
    try {
        await newProject.save();
        res.status(201).json({ status: 'Success', data: newProject });
    } catch (err) {
        res.status(409).json({ status: 'Error', message: err.message });
    }
}

export const getProjectDetails = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ status: 'Error', message: 'No project with that id' });
    const project = await Project.find();
    res.status(200).json({ status: 'Success', data: project });
}

export const updateProject = async (req, res) => {
    const { id: _id } = req.params;
    const projectToUpdate = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({ status: 'Error', message: 'No project with that id' });
    const updatedProject = await Project.findByIdAndUpdate(_id, projectToUpdate, { new: true });
    res.status(200).json({ status: 'Success', data: updateProject });
}

export const deleteProjects = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ status: 'Error', message: 'No project with that id' });

    await Project.findByIdAndRemove(id);

    res.status(200).json({ status: 'Success', message: 'Project deleted successfully' });
}