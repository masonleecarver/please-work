import db from './db.js'

const getAllCategories = async() => {
    const query = `
        SELECT 
            category_id,
            name
        FROM category;
    `;

    const results = await db.query(query);

    return results.rows;
}

const getProjectsByCategory = async(categoryID) => {

    /*
    const query = `
        SELECT
            sp.service_project_id,
            c.category_id,
            c.name AS category_name, 
            sp.title AS project_name
            
        FROM service_project_categories spc
        
        INNER JOIN category c ON spc.category_id = c.category_id
        
        INNER JOIN service_project sp ON spc.project_id = sp.service_project_id
        
        WHERE spc.category_id = $1;
        
    `;
    */

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

        INNER JOIN category c ON spc.category_id = c.category.id

        WHERE c.category_id = $1;
    
    `;

    const queryParams = [categoryID];
    const result = await db.query(query, queryParams);

    return result.rows;

}


export {getAllCategories, getProjectsByCategory}; 