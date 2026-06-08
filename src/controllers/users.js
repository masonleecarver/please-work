import { createUser, authenticateUser, getAllUsers, volenteer, getProjectsByVolenteer, unVolenteer } from "../models/users.js";
import bcrypt from 'bcrypt';

const showUserRegistrationForm = (req, res) => {
    res.render('register', { title: 'Register' });
};

const showLoginForm = async (req, res) => {
    res.render('login', { title: 'Login'});
    
};

const showDashboard = async (req, res) => {
    const user = req.session.user;
    const projects = await getProjectsByVolenteer(user.user_id);
    res.render('dashboard', {
        title: 'Dashboard',
        name: user.name,
        email: user.email,
        projects
    });
    
};

const showUsers = async (req, res) => {
    const users = await getAllUsers();
    res.render('users', {
        title: 'Users',
        users
    });
};


//#region process


const processUserRegistrationForm = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Hash the password before storing it
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Create the user in the database
        const userId = await createUser(name, email, passwordHash);

        // Redirect to the home page after successful registration
        req.flash('success', 'Registration successful! Please log in.');
        res.redirect('/');
    } catch (error) {
        console.error('Error registering user:', error);
        req.flash('error', 'An error occurred during registration. Please try again.');
        res.redirect('/register');
    }
};

const processLoginForm = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await authenticateUser(email, password);
        if (user) {
            // Store user info in session
            req.session.user = user;
            req.flash('success', 'Login successful!');

            if (res.locals.NODE_ENV === 'development') {
                console.log('User logged in:', user);
            }

            res.redirect('/dashboard');
        } else {
            req.flash('error', 'Invalid email or password.');
            res.redirect('/login');
        }
    } catch (error) {
        console.error('Error during login:', error);
        req.flash('error', 'An error occurred during login. Please try again.');
        res.redirect('/login');

    }
    
};

const processLogout = async (req, res) => {
    if (req.session.user) {
        delete req.session.user;
    }

    req.flash('success', 'Logout successful!');
    res.redirect('/login');
};

const processVolenteer = async (req, res) => {
    const user = req.session.user;
    const project_id = req.params.id;

    try {
        await volenteer(user.user_id, project_id);
        req.flash('success', 'Thank you for volenteering!');
        res.redirect(`/project/${project_id}`);
    } catch (error) {
        console.error('Error during volenteering: ', error);
        req.flash('error', 'There was an error. Sorry :(');
        res.redirect('/projects');
    }
    
};

const processUnvolenteer = async (req, res) => {
    const user = req.session.user;
    const project_id = req.params.id;

    try {
        await unVolenteer(user.user_id, project_id);
        req.flash('success', 'We are sorry to see you go!');
        res.redirect(`/project/${project_id}`);
    } catch (error) {
        console.error('There was an error: ', error);
        req.flash('error', 'Error during leaving. It is a sign you should stay :)');
        res.redirect('/projects');
    }
    
};

//#endregion

//#region require

const requireLogin = (req, res, next) => {
    if (!req.session || !req.session.user) {
        req.flash('error', 'You must be logged in to access that page.');
        return res.redirect('/login');
    }
    next();
};

const requireRole = (role) => {
    return (req, res, next) => {
        // Check if user is logged in first
        if (!req.session || !req.session.user) {
            req.flash('error', 'You must be logged in to access this page.');
            return res.redirect('/login');
        }

        // Check if user's role matches the required role
        if (req.session.user.role !== role) {
            req.flash('error', 'You do not have permission to access this page. Sensitive stuff, you know!');
            return res.redirect('/');
        }

        // User has required role, continue
        next();
    };
};

//#endregion

export { showUserRegistrationForm, processUserRegistrationForm, processLoginForm, showLoginForm, processLogout, requireLogin, showDashboard, requireRole, showUsers, processVolenteer, processUnvolenteer };