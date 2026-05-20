import db from './db.js'

const getAllCategories = async() => {
    const query = `
        SELECT
            c.category_id,
            c.name AS category_name,
            ARRAY_AGG(sp.title) AS projects
        FROM public.category c
        LEFT JOIN public.service_project_categories spc 
            ON c.category_id = spc.category_id
        LEFT JOIN public.service_project sp 
            ON spc.project_id = sp.service_project_id
        GROUP BY c.category_id, c.name;
    `
/*
    const query = `
        SELECT
            spc.project_id,
            spc.category_id,
            c.name AS category_name, 
            sp.title AS project_name
            
        FROM public.service_project_categories spc

        LEFT JOIN public.category c ON spc.category_id = c.category_id

        LEFT JOIN public.service_project sp ON spc.project_id = sp.service_project_id;
        
    `;
*/

    const result = await db.query(query);

    return result.rows;
}

export {getAllCategories} 