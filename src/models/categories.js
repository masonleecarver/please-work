import db from './db.js'

//#region get

const getAllCategories = async() => {
    const query = `
        SELECT 
            category_id,
            name
        FROM category;
    `;

    const results = await db.query(query);

    return results.rows;
};

const getCategoryById = async (categoryID) => {
    const query = `
        SELECT
            category_id,
            name
        FROM category
        WHERE category_id = $1;
    `;

    const queryParams = [categoryID];
    const result = await db.query(query, queryParams);

    return result.rows.length > 0 ? result.rows[0] : null;

};

const getProjectsByCategory = async(categoryID) => {

    const query = `
        SELECT
            sp.service_project_id,
            sp.title,
            sp.description,
            sp.address,
            sp.date,
            c.category_id AS category_id,
            c.name AS category_name
        FROM service_project sp

        INNER JOIN service_project_categories spc ON sp.service_project_id = spc.project_id

        INNER JOIN category c ON spc.category_id = c.category_id

        WHERE c.category_id = $1;
    
    `;

    const queryParams = [categoryID];
    const result = await db.query(query, queryParams);

    return result.rows;

};

const getCategoriesByProject = async (projectID) => {
    
    const query = `
        SELECT 
            c.name,
            c.category_id,
            sp.service_project_id AS project_id,
            sp.title AS project_title
        FROM category c

        INNER JOIN service_project_categories spc ON c.category_id = spc.category_id

        INNER JOIN service_project sp ON spc.project_id = sp.service_project_id

        WHERE sp.service_project_id = $1;
    `;

    const result = await db.query(query, [projectID]);

    return result.rows;
}

//#endregion

//#region assign

const assignCategoryToProject = async (projectID, categoryID) => {
    const query = `
        INSERT INTO service_project_categories
        (project_id, category_id)
        VALUES
        ($1, $2);
    `;

    const queryParams = [projectID, categoryID];
    await db.query(query, queryParams);
}

const updateCategoryAssignment = async (projectID, categoryIDs) => {
    const deleteQuery = `
        DELETE FROM service_project_categories
        WHERE project_id = $1;
    `;

    await db.query(deleteQuery, [projectID]);

    for (const categoryID of categoryIDs) {
        await assignCategoryToProject(projectID, categoryID);
    }
}

//#endregion

//#region create and edit

const createCategory = async (name) => {

    const query = `
        INSERT INTO category 
        (name)
        VALUES
        ($1)

        RETURNING category_id;
    `;

    const result = await db.query(query, [name]);

    if (result.rows.length === 0) {
        throw new Error('Failed to create category');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new category with ID:', result.rows[0].category_id);
    }

    return result.rows[0].category_id;    
};

const editCategory = async (name, catId) => {

    const query = `
        UPDATE category
        SET name = $1
        WHERE category_id = $2

        RETURNING category_id;
    `;

    const result = await db.query(query, [name, catId]);

    if (result.rows.length === 0) {
        throw new Error('Category not found');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Updated category with ID:', projectId);
    }

    return result.rows[0].category_id;
    
}

//#endregion


export {getAllCategories, getProjectsByCategory, getCategoryById, getCategoriesByProject, updateCategoryAssignment, createCategory, editCategory}; 