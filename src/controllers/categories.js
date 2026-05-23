// Import any needed model functions
import { getAllCategories, getProjectsByCategory, getCategoryById } from '../models/categories.js';

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
}

// Export any controller functions
export { showCategoriesPage, showProjectCategories };