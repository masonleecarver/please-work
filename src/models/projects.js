import db from './db.js'

//#region get

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
};

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

const getUpcomingProjects = async(number_of_projects) => {
  const query = `
    SELECT
      sp.service_project_id,
      sp.organization_id,
      sp.title,
      sp.description,
      sp.address,
      sp.date,
      o.name AS organization_name
    FROM service_project sp

    LEFT JOIN organization o ON sp.organization_id = o.organization_id

    WHERE date >= CURRENT_DATE
    ORDER BY date ASC
    LIMIT $1;  
  `;

  const queryParams = [number_of_projects];
  const result = await db.query(query, queryParams);

  return result.rows;

};

const getProjectDetails = async (projectId) => {
  const query = `
    SELECT
      sp.service_project_id,
      sp.organization_id,
      sp.title,
      sp.address,
      sp.date,
      sp.description,
      o.name AS organization_name
    FROM service_project sp
    
    INNER JOIN organization o ON sp.organization_id = o.organization_id
    
    WHERE service_project_id = $1;
  `;

  const queryParams = [projectId];
  const result = await db.query(query, queryParams);

  return result.rows.length > 0 ? result.rows[0] : null;

};

//#endregion

const createProject = async (title, organizationId, description, address, date) => {

  const query = `
    INSERT INTO service_project (title, organization_id, description, address, date)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING service_project_id;
  `;

  const queryParams = [title, organizationId, description, address, date];
  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
        throw new Error('Failed to create project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new project with ID:', result.rows[0].project_id);
    }

    return result.rows[0].service_project_id;
  
};

export {getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails, createProject }; 