// Import any needed model functions
import { getAllCategories, getProjectsByCategory, getCategoryById, updateCategoryAssignment, getCategoriesByProject, createCategory, editCategory } from '../models/categories.js';
import { getProjectDetails } from '../models/projects.js';
import { body, validationResult } from 'express-validator';
import flash from '../middleware/flash.js';

//#region show

// Define any controller functions
const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';

    res.render('categories', { title, categories });
};

const showProjectCategories = async (req, res) => {
    const categoryID = req.params.id;
    const catDetails = await getCategoryById(categoryID);
    const projects = await getProjectsByCategory(categoryID);
    const title = "Category Projects";

    res.render('category', {title, catDetails, projects});
};

const showAssignCategoriesForm = async (req, res) => {
    const projectID = req.params.id;

    const projectDetails = await getProjectDetails(projectID);
    console.log(projectID);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesByProject(projectID);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', {title, projectID, projectDetails, categories, assignedCategories});
};

const showNewCategoryPage = async (req, res) => {
    const title = "New Category";

    res.render('new-category', {title});    
};

const showEditCategoryPage = async (req, res) => {
    const categoryID = req.params.id;
    const title = 'Edit Category';
    const categoryDetails = await getCategoryById(categoryID);

    res.render('edit-category', {title, categoryDetails});
    
}

//#endregion

//#region process

const processAssignCategoriesForm = async (req, res) => {
    const projectID = req.params.id;
    const selectedCategoryIds = req.body.categoryIds || [];

    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignment(projectID, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectID}`);
};

const processNewCategoryPage = async (req, res) => {

    const {name} = req.body;

    try {
        const newCategoryId = await createCategory(name);

        req.flash('success', 'Category created successfully!');
        res.redirect(`/category/${newCategoryId}`);
    } catch (error) {
        console.error('Error creating new category:', error);
        req.flash('error', 'There was an error creating the category.');
        res.redirect('/new-category');
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

};

const processEditCategoryPage = async (req, res) => {
    const categoryID = req.params.id;
    const {name} = req.body;

    try {
        await editCategory(name, categoryID);

        req.flash('success', 'Category updated successfully!');
        res.redirect(`/category/${categoryID}`);
    } catch (error) {
        console.error('Error updating category:', error);
        req.flash('error', 'There was an error updating the category.');
        res.redirect('/edit-category');
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

const categoryValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required.')
        .isLength({min: 3, max: 100}).withMessage("Name must be between 3 and 100 characters.")
];

//#endregion

// Export any controller functions
export { showCategoriesPage, showProjectCategories, showAssignCategoriesForm, processAssignCategoriesForm, showNewCategoryPage, processNewCategoryPage, categoryValidation, showEditCategoryPage, processEditCategoryPage };