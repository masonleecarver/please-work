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

const getProjectsByOrganizationId = async (organizationId) => {
      const query = `
        SELECT
          service_project_id,
          organization_id,
          title,
          description,
          address,
          date
        FROM service_project
        WHERE organization_id = $1
        ORDER BY date;
      `;
      
      const queryParams = [organizationId];
      const result = await db.query(query, queryParams);

      return result.rows;
};

export {getAllProjects, getProjectsByOrganizationId }; 