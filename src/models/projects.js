import db from './db.js'

const getAllProjects = async() => {
    const query = `
        SELECT 
          sp.service_project_id,
          sp.organization_id, 
          sp.title, 
          sp.description, 
          sp.address, 
          sp.date
      FROM public.service_project sp
      
      LEFT JOIN public.organization o ON sp.organization_id = o.organization_id;
    `;

    const result = await db.query(query);

    return result.rows;
}

export {getAllProjects} 