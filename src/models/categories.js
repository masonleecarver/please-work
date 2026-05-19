import db from './db.js'

const getAllCategories = async() => {
    const query = `
        SELECT 
            c.category_id,
            c.name AS category_name

        FROM public.category c

        LEFT JOIN public.service_project_categories spc ON c.category_id = spc.category_id

        LEFT JOIN public.service_project sp ON spc.project_id = sp.service_project_id
        ORDER BY c.name;
    `;

    const result = await db.query(query);

    return result.rows;
}

export {getAllCategories} 