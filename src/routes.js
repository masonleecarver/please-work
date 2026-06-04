//#region imports

import express from 'express';

import { showHomePage } from './controllers/index.js';

// import from organization 

import { showOrganizationsPage, showOrganizationDetailsPage, showNewOrganizationForm, processNewOrganizationForm, organizationValidation, showEditOrganizationForm, processEditOrganizationForm } from './controllers/organizations.js';

// import from projects

import { showProjectsPage, showProjectDetails, showNewProjectForm, processNewProjectForm, projectValidation,showEditProjectForm, processEditProjectForm } from './controllers/projects.js';

// import from categories

import { showCategoriesPage, showProjectCategories, showAssignCategoriesForm, processAssignCategoriesForm, showNewCategoryPage, processNewCategoryPage, categoryValidation, showEditCategoryPage, processEditCategoryForm } from './controllers/categories.js';

// import from user

import { showUserRegistrationForm, processUserRegistrationForm, processLoginForm, processLogout, showLoginForm, requireLogin, showDashboard, requireRole } from './controllers/users.js';

import { testErrorPage } from './controllers/errors.js';

//#endregion


const router = express.Router();

router.get('/', showHomePage);

//#region organization routes

router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/new-organization', requireRole('admin'), showNewOrganizationForm);
router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganizationForm);
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);
router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm);

//#endregion

//#region project routes

router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetails);
// Route for new project page
router.get('/new-project', requireRole('admin'), showNewProjectForm);
// Route to handle new project form submission
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);
router.get('/update-project/:id', requireRole('admin'), showEditProjectForm);
router.post('/update-project/:id', requireRole('admin'), projectValidation, processEditProjectForm);

//#endregion

//#region categories routes

router.get('/categories', showCategoriesPage);
router.get('/category/:id', showProjectCategories);
// Routes to handle the assign categories to project form
router.get('/assign-categories/:id', requireRole('admin'), showAssignCategoriesForm);
router.post('/assign-categories/:id', requireRole('admin'), processAssignCategoriesForm);
router.get('/new-category', requireRole('admin'), showNewCategoryPage);
router.post('/new-category', requireRole('admin'), categoryValidation, processNewCategoryPage);
router.get('/edit-category/:id', requireRole('admin'), showEditCategoryPage);
router.post('/edit-category/:id', requireRole('admin'), categoryValidation, processEditCategoryForm);

//#endregion

//#region user routes

router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);
router.get('/dashboard', requireLogin, showDashboard);

//#endregion

// error-handling routes
router.get('/test-error', testErrorPage);

export default router;