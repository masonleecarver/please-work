// Import any needed model functions
import { getAllCategories, getProjectsByCategory, getCategoryById, updateCategoryAssignment } from '../models/categories.js';
import { getProjectDetails } from '../models/projects.js';

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

    const title = 'Assign Categories to Project';

    res.render('assign-categories', {title, projectID, projectDetails, categories});
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
}

//#endregion

// Export any controller functions
export { showCategoriesPage, showProjectCategories, showAssignCategoriesForm, processAssignCategoriesForm };