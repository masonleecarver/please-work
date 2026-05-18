-- ========================================
-- Organization Table
-- ========================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);
-- ========================================
-- Service Projects Table
-- ========================================

CREATE TABLE service_project (
	service_project_id SERIAL PRIMARY KEY,
	organization_id INT NOT NULL,
	title VARCHAR(150) NOT NULL,
	description TEXT NOT NULL,
	address TEXT NOT NULL, 
	date date NOT NULL,

	CONSTRAINT fk_service_project_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization(organization_id)
);


