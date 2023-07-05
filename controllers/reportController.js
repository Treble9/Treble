import Project from "../models/PROJECT";
import Report from "../models/REPORT";
import Task from "../models/TASK";
import User from "../models/USER";



// Controller function to generate a project report
const generateProjectReport = async (req, res) => {
  const { projectId } = req.params;

  try {
    // Find the project by projectId
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Fetch additional information related to the project (e.g., tasks, team members)
    const tasks = await Task.find({ project: projectId });
    const teamMembers = await User.find({ project: projectId });

    // Generate the report based on the project data
    const reportData = {
      project,
      tasks,
      teamMembers
      // Additional data can be added based on your report requirements
    };

    // Save the generated report to the database
    const report = new Report(reportData);
    await report.save();

    // Return the generated report as the response
    res.status(200).json({ report });

  } catch (error) {
    console.error('Error generating project report:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to generate a task report
const generateTaskReport = async (req, res) => {
  const { taskId } = req.params;

  try {
    // Find the task by taskId
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Fetch additional information related to the task (e.g., project, assigned user)
    const project = await Project.findById(task.project);
    const assignedUser = await User.findById(task.assignedUser);

    // Generate the report based on the task data
    const reportData = {
      task,
      project,
      assignedUser
      // Additional data can be added based on your report requirements
    };

    // Save the generated report to the database
    const report = new Report(reportData);
    await report.save();

    // Return the generated report as the response
    res.status(200).json({ report });

  } catch (error) {
    console.error('Error generating task report:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to generate a team performance report
const generateTeamPerformanceReport = async (req, res) => {
  const { projectId } = req.params;

  try {
    // Find the project by projectId
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Fetch the team members associated with the project
    const teamMembers = await User.find({ project: projectId });

    // Generate the report based on the team performance data
    const reportData = {
      project,
      teamMembers
      // Additional data can be added based on your report requirements
    };

    // Save the generated report to the database
    const report = new Report(reportData);
    await report.save();

    // Return the generated report as the response
    res.status(200).json({ report });

  } catch (error) {
    console.error('Error generating team performance report:', error);


// Controller function to generate a project report
const generateProjectReport = async (req, res) => {
    const { projectId } = req.params;

    try {
        // Find the project by projectId
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Fetch additional information related to the project (e.g., tasks, team members)
        const tasks = await Task.find({ project: projectId });
        const teamMembers = await User.find({ project: projectId });

        // Generate the report based on the project data
        const reportData = {
            project,
            tasks,
            teamMembers
            // Additional data can be added based on your report requirements
        };

        // Save the generated report to the database
        const report = new Report(reportData);
        await report.save();

        // Return the generated report as the response
        res.status(200).json({ report });

    } catch (error) {
        console.error('Error generating project report:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to generate a task report
const generateTaskReport = async (req, res) => {
    const { taskId } = req.params;

    try {
        // Find the task by taskId
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // Fetch additional information related to the task (e.g., project, assigned user)
        const project = await Project.findById(task.project);
        const assignedUser = await User.findById(task.assignedUser);

        // Generate the report based on the task data
        const reportData = {
            task,
            project,
            assignedUser
            // Additional data can be added based on your report requirements
        };

        // Save the generated report to the database
        const report = new Report(reportData);
        await report.save();

        // Return the generated report as the response
        res.status(200).json({ report });

    } catch (error) {
        console.error('Error generating task report:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to generate a team performance report
const generateTeamPerformanceReport = async (req, res) => {
    const { projectId } = req.params;

    try {
        // Find the project by projectId
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Fetch the team members associated with the project
        const teamMembers = await User.find({ project: projectId });

        // Generate the report based on the team performance data
        const reportData = {
            project,
            teamMembers
            // Additional data can be added based on your report requirements
        };

        // Save the generated report to the database
        const report = new Report(reportData);
        await report.save();

        // Return the generated report as the response
        res.status(200).json({ report });

    } catch (error) {
        console.error('Error generating team performance report:', error);
