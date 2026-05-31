//#region imports

import express from 'express';

import { showHomePage } from './controllers/index.js';

// import from organization 

import { showOrganizationsPage, showOrganizationDetailsPage, showNewOrganizationForm, processNewOrganizationForm, organizationValidation, showEditOrganizationForm, processEditOrganizationForm } from './controllers/organizations.js';

// import from projects

import { showProjectsPage, showProjectDetails, showNewProjectForm, processNewProjectForm, projectValidation,showEditProjectForm, processEditProjectForm } from './controllers/projects.js';

// import from categories

import { showCategoriesPage, showProjectCategories, showAssignCategoriesForm, processAssignCategoriesForm, showNewCategoryPage, processNewCategoryPage, categoryValidation, showEditCategoryPage, processEditCategoryForm } from './controllers/categories.js';

import { testErrorPage } from './controllers/errors.js';

//#endregion


const router = express.Router();

router.get('/', showHomePage);

//#region organization routes

router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/new-organization', showNewOrganizationForm);
router.post('/new-organization', organizationValidation, processNewOrganizationForm);
router.get('/edit-organization/:id', showEditOrganizationForm);
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);

//#endregion

//#region project routes

router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetails);
// Route for new project page
router.get('/new-project', showNewProjectForm);
// Route to handle new project form submission
router.post('/new-project', projectValidation, processNewProjectForm);
router.get('/update-project/:id', showEditProjectForm);
router.post('/update-project/:id', projectValidation, processEditProjectForm);

//#endregion

//#region categories routes

router.get('/categories', showCategoriesPage);
router.get('/category/:id', showProjectCategories);
// Routes to handle the assign categories to project form
router.get('/assign-categories/:id', showAssignCategoriesForm);
router.post('/assign-categories/:id', processAssignCategoriesForm);
router.get('/new-category', showNewCategoryPage);
router.post('/new-category', categoryValidation, processNewCategoryPage);
router.get('/edit-category/:id', showEditCategoryPage);
router.post('/edit-category/:id', categoryValidation, processEditCategoryForm);

//#endregion

// error-handling routes
router.get('/test-error', testErrorPage);

export default router;