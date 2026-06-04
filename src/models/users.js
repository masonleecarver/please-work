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

const getAllUsers = async () => {

    const query = `
        SELECT
        u.name,
        u.email,
        r.name AS role
        FROM users u

        JOIN role r ON r.role_id = u.role_id; 
    `;

    const results = await db.query(query);

    return results.rows;
    
}

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

export { createUser, authenticateUser, getAllUsers };