// Import any needed model functions
import { getUpcomingProjects, getProjectDetails, createProject, updateProject } from '../models/projects.js';
import { getAllOrganizations } from '../models/organizations.js';
import { body, validationResult } from 'express-validator';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

//#region show

// Define any controller functions
const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Upcoming Service Projects';

    res.render('projects', { title, projects });
};

const showProjectDetails = async (req, res) => {
    const projectID = req.params.id;
    const projectDetails = await getProjectDetails(projectID);
    const title = 'Project Details';

    res.render('project', {title, projectDetails});
};

const showNewProjectForm = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Add New Service Project';

    res.render('new-project', { title, organizations });
}

const showEditProjectForm = async (req, res) => {
    const projectId = req.params.id;
    const projectDetails = await getProjectDetails(projectId);
    const organizations = await getAllOrganizations();
    const title = "Edit Service Project";
    
    res.render('update-project', {title, projectDetails, organizations});
}

//#endregion

//#region process

const processNewProjectForm = async (req, res) => {
    // Extract form data from req.body
    const { title, description, address, date, organizationId } = req.body;

    try {
        // Create the new project in the database
        const newProjectId = await createProject(title, organizationId, description, address, date);

        req.flash('success', 'New service project created successfully!');
        res.redirect(`/project/${newProjectId}`);
    } catch (error) {
        console.error('Error creating new project:', error);
        req.flash('error', 'There was an error creating the service project.');
        res.redirect('/new-project');
    }

     // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Loop through validation errors and flash them
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the new project form
        return res.redirect('/new-project');
    }
}

const processEditProjectForm = async (req, res) => {
    const {title, description, address, date, organizationId} = req.body;
    const projectId = req.params.id;
    
    try {
        await updateProject(title, organizationId, description, address, date, projectId);

        req.flash('success', 'Service project updated successfully!');
        res.redirect(`/project/${projectId}`);
    } catch (error) {
        console.error ('Error updating project:', error);
        req.flash('error', 'There was an issue updating this project....');
        res.redirect('/update-project');
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Loop through validation errors and flash them
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the new project form
        return res.redirect('/new-project');
    }
}

//#endregion

//#region validation 

const projectValidation = [
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),
    body('description')
        .trim()
        .notEmpty().withMessage('Description is required')
        .isLength({ max: 1000 }).withMessage('Description must be less than 1000 characters'),
    body('address')
        .trim()
        .notEmpty().withMessage('Address is required')
        .isLength({ max: 200 }).withMessage('Address must be less than 200 characters'),
    body('date')
        .notEmpty().withMessage('Date is required')
        .isISO8601().withMessage('Date must be a valid date format'),
    body('organizationId')
        .notEmpty().withMessage('Organization is required')
        .isInt().withMessage('Organization must be a valid integer')
];

//#endregion

// Export any controller functions
export { showProjectsPage, showProjectDetails, showNewProjectForm, processNewProjectForm, projectValidation, showEditProjectForm, processEditProjectForm };