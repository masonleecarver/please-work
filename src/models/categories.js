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



export {getAllCategories, getProjectsByCategory, getCategoryById, updateCategoryAssignment}; 