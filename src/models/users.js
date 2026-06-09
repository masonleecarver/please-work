import db from './db.js'
import bcrypt from 'bcrypt';

const createUser = async (name, email, passwordHash) => {
    const default_role = 'user';
    const query = `
        INSERT INTO users (name, email, password_hash, role_id) 
        VALUES ($1, $2, $3, (SELECT role_id FROM role WHERE name = $4)) 
        RETURNING user_id
    `;
    const queryParams = [name, email, passwordHash, default_role];
    
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create user');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new user with ID:', result.rows[0].user_id);
    }
    
    return result.rows[0].user_id;
};

//#region volenteers

const addUserToProject = async (project_id, user_id) => {
    const query = `
        INSERT INTO project_volenteers (project_id, user_id)
        VALUES ($1, $2);
    `;

    await db.query(query, [project_id, user_id]);

    };

const leaveProject = async (user_id, project_id) => {
    const query = `
        DELETE FROM project_volenteers
        WHERE user_id = $1 AND project_id = $2;
    `;

    await db.query(query, [user_id, project_id]);
};

const isVolenteered = async (project_id, user_id) => {
    const query = `
        SELECT 1
        FROM project_volenteers
        WHERE project_id = $1
          AND user_id = $2
        LIMIT 1;
    `;

    const result = await db.query(query, [project_id, user_id]);

    return result.rowCount > 0;
};
    
    
const getAllUsers = async () => {

    const query = `
        SELECT
        u.name,
        u.email,
        u.user_id,
        r.name AS role
        FROM users u

        JOIN role r ON r.role_id = u.role_id; 
    `;

    const results = await db.query(query);

    return results.rows;
    
};

const getProjectsByVolenteer = async (user_id) => {
    const query = `
        SELECT
            sp.title,
            sp.service_project_id AS project_id,
            sp.date
        FROM service_project sp

        JOIN project_volenteers pv ON sp.service_project_id = pv.project_id

        JOIN users u ON u.user_id = pv.user_id

        WHERE u.user_id = $1;
    `;

    const result = await db.query(query, [user_id]);

    return result.rows;

};

//#endregion

//#region verify

const findUserByEmail = async (email) => {
    const query = `
        SELECT
        u.name, 
        u.user_id,
        u.email, 
        u.password_hash, 
        r.name AS role 
        FROM users u
        JOIN role r ON u.role_id = r.role_id
        WHERE email = $1
    `;
    const queryParams = [email];
    
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        return null; // User not found
    }
    
    return result.rows[0];
};


const verifyPassword = async (password, passwordHash) => {
    return bcrypt.compare(password, passwordHash);
};

const authenticateUser = async (email, password) => {

    const user = await findUserByEmail(email);

    if (!user) {
        return null
    };

    const passwordMatch = await verifyPassword(
        password, user.password_hash
    );

    if (!passwordMatch) {
        return null;
    }

    const { password_hash, ...userWIthoutPassword} = user;

    return userWIthoutPassword;

};

//#endregion

export { createUser, authenticateUser, getAllUsers, addUserToProject, getProjectsByVolenteer, leaveProject, isVolenteered };