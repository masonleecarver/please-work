import db from './db.js'

const getAllProjects = async() => {
    const query = `
        SELECT service_project_id, organization_id, title, description, address, date
      FROM public.service_project;
    `;

    const result = await db.query(query);

    return result.rows;
}

export {getAllProjects} 