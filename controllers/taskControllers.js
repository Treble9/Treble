import mongoose from "mongoose";
import Project from "../models/PROJECT.js";
import Task from "../models/TASK.js";

export const getTasks = async (req, res) => {

    try {
        const projectId = req.projects.id //projectId
        const getAllTasks = await Project.find(projectId).populate('tasks');
        res.status(200).json({ status: 'Success', data: getAllTasks })
    } catch (err) {
        res.status(404).json({ status: 'Error', message: err.message });
    }
}

export const createTask = async (req, res) => {
    //when creating project, id of the creator should be added to the model
    const task = req.body;

    const newTask = new Task({ ...task, projectId: req.projects.id, createdAt: new Date().toISOString() }) //projectTitle: req.title
    try {
        await newTask.save();
        res.status(201).json({ status: 'Success', data: newTask });
    } catch (err) {
        res.status(409).json({ status: 'Error', message: err.message });
    }
}

export const getTaskDetails = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ status: 'Error', message: 'No task with that id' });
    const task = await Task.find();
    res.status(200).json({ status: 'Success', data: task });
}

export const updateTask = async (req, res) => {
    const { id: _id } = req.params;
    const taskToUpdate = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({ status: 'Error', message: 'No task with that id' });
    const updatedTask = await Task.findByIdAndUpdate(_id, taskToUpdate, { new: true });
    res.status(200).json({ status: 'Success', data: updatedTask });
}

export const deleteTask = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ status: 'Error', message: 'No task with that id' });

    await Task.findByIdAndRemove(id);

    res.status(200).json({ status: 'Success', message: 'Task deleted successfully' });
}

// Controller function to assign a task to a team member
export const assignTask = async (req, res) => {
    const { projectId, taskName, taskDescription, responsibleTeamMember } = req.body;

    try {
        // Check if the project exists
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Create a new task and assign it to the responsible team member
        const task = new Task({
            name: taskName,
            description: taskDescription,
            project: projectId,
            responsible: responsibleTeamMember
        });

        // Save the task to the database
        await task.save();

        // Update the project's tasks array with the new task
        project.tasks.push(task);
        await project.save();

        // Return the assigned task as the response
        res.status(201).json({ task });

    } catch (error) {
        console.error('Error assigning task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const setTaskDeadline = async (req, res) => {
    const { taskId, deadline } = req.body;

    try {
        // Find the task by taskId
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // Set the deadline for the task
        task.deadline = deadline;

        // Save the updated task to the database
        await task.save();

        // Return the updated task as the response
        res.status(200).json({ task });

    } catch (error) {
        console.error('Error setting task deadline:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateTaskProgress = async (req, res) => {
    const { taskId, status, completionPercentage } = req.body;

    try {
        // Find the task by taskId
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // Update the task progress
        task.status = status;
        task.completionPercentage = completionPercentage;

        // Save the updated task to the database
        await task.save();

        // Return the updated task as the response
        res.status(200).json({ task });

    } catch (error) {
        console.error('Error updating task progress:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to add a comment to a task
export const addCommentToTask = async (req, res) => {
    const { taskId, commentText, userId } = req.body;

    try {
        // Find the task by taskId
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // Create a new comment
        const comment = new Comment({
            text: commentText,
            task: taskId,
            user: userId
        });

        // Save the comment to the database
        await comment.save();

        // Update the task's comments array with the new comment
        task.comments.push(comment);
        await task.save();

        // Return the added comment as the response
        res.status(201).json({ comment });

    } catch (error) {
        console.error('Error adding comment to task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to upload a file and associate it with a task
export const uploadFileForTask = async (req, res) => {
    const { taskId, filename, userId } = req.body;

    // Assuming you're using a file storage solution like AWS S3 or similar
    // You would need to handle the file upload logic here

    try {
        // Create a new file entry
        const file = new File({
            filename,
            task: taskId,
            user: userId
            // Additional file-related fields can be added as per your requirements
        });

        // Save the file to the database
        await file.save();

        // Return the uploaded file as the response
        res.status(201).json({ file });

    } catch (error) {
        console.error('Error uploading file for task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to send a notification to a user
export const sendNotification = async (req, res) => {
    const { userId, message } = req.body;

    try {
        // Create a new notification
        const notification = new Notification({
            user: userId,
            message
        });

        // Save the notification to the database
        await notification.save();

        // Return the sent notification as the response
        res.status(201).json({ notification });

    } catch (error) {
        console.error('Error sending notification:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to add a team member to a project
export const addTeamMemberToProject = async (req, res) => {
    const { projectId, memberId } = req.body;

    try {
        // Find the project by projectId
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Find the user by memberId
        const user = await User.findById(memberId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Add the user to the project's team members
        project.teamMembers.push(memberId);
        await project.save();

        // Return the updated project as the response
        res.status(200).json({ project });

    } catch (error) {
        console.error('Error adding team member to project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to remove a team member from a project
export const removeTeamMemberFromProject = async (req, res) => {
    const { projectId, memberId } = req.body;

    try {
        // Find the project by projectId
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Find the user by memberId
        const user = await User.findById(memberId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Remove the user from the project's team members
        const memberIndex = project.teamMembers.indexOf(memberId);
        if (memberIndex > -1) {
            project.teamMembers.splice(memberIndex, 1);
        }
        await project.save();

        // Return the updated project as the response
        res.status(200).json({ project });

    } catch (error) {
        console.error('Error removing team member from project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to assign a role to a team member
export const assignRoleToTeamMember = async (req, res) => {
    const { memberId, roleId } = req.body;

    try {
        // Find the user by memberId
        const user = await User.findById(memberId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Assign the role to the user
        user.role = roleId;
        await user.save();

        // Return the updated user as the response
        res.status(200).json({ user });

    } catch (error) {
        console.error('Error assigning role to team member:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};