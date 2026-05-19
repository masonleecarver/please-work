-- ========================================
-- BrightFuture Builders Service Projects
-- ========================================

INSERT INTO service_project 
(organization_id, title, description, address, date)
VALUES
(1, 'Community Playground Build',
 'Build a new playground for local families and children.',
 '125 Oak Street, Denver, CO',
 '2026-06-10'),

(1, 'Habitat Repair Project',
 'Repair damaged homes for low-income residents.',
 '455 Pine Avenue, Denver, CO',
 '2026-07-02'),

(1, 'School Renovation Initiative',
 'Renovate classrooms and paint school facilities.',
 '890 Cedar Road, Denver, CO',
 '2026-08-15'),

(1, 'Veterans Housing Construction',
 'Construct temporary housing units for veterans.',
 '300 Liberty Lane, Denver, CO',
 '2026-09-05'),

(1, 'Neighborhood Bench Installation',
 'Install benches and public seating areas in parks.',
 '75 Elm Park Drive, Denver, CO',
 '2026-10-01');

-- ========================================
-- GreenHarvest Growers Service Projects
-- ========================================

INSERT INTO service_project
(organization_id, title, description, address, date)
VALUES
(2, 'Community Garden Expansion',
 'Expand a local community vegetable garden.',
 '210 Garden Way, Portland, OR',
 '2026-05-20'),

(2, 'Tree Planting Day',
 'Plant trees throughout the neighborhood park.',
 '98 Forest Lane, Portland, OR',
 '2026-06-14'),

(2, 'Urban Farming Workshop',
 'Teach residents how to grow food in urban spaces.',
 '640 Harvest Street, Portland, OR',
 '2026-07-08'),

(2, 'School Greenhouse Project',
 'Build a greenhouse for a local elementary school.',
 '412 Maple Drive, Portland, OR',
 '2026-08-12'),

(2, 'Food Bank Produce Donation',
 'Grow and donate fresh vegetables to food banks.',
 '50 River Road, Portland, OR',
 '2026-09-18');

-- ========================================
-- UnityServe Service Projects
-- ========================================

INSERT INTO service_project
(organization_id, title, description, address, date)
VALUES
(3, 'Senior Assistance Program',
 'Provide yard work and home assistance for seniors.',
 '700 Main Street, Dallas, TX',
 '2026-05-28'),

(3, 'Holiday Food Drive',
 'Collect and distribute food to local families.',
 '89 Hope Avenue, Dallas, TX',
 '2026-11-20'),

(3, 'Community Cleanup Day',
 'Organize volunteers to clean streets and parks.',
 '155 Lakeview Blvd, Dallas, TX',
 '2026-06-30'),

(3, 'Back-to-School Supply Giveaway',
 'Distribute school supplies to children in need.',
 '980 Education Lane, Dallas, TX',
 '2026-08-03'),

(3, 'Emergency Relief Support',
 'Delivere emergency supplies after severe storms.',
 '45 Unity Plaza, Dallas, TX',
 '2026-09-25');

 select * from service_project;

-- ========================================
-- other
-- ========================================

INSERT INTO category (name) VALUES
('Enviromental'),
('Educational'),
('Community Service'),
('Health and Wellness');

INSERT INTO service_project_categories
(project_id, category_id)
VALUES
(1, 3),
(2, 1),(2, 3),
(3, 3),(3, 2),
(4, 3),
(5, 1),(5, 3),
(6, 1),(6, 4),
(7, 1),
(8, 1), (8, 2), (8, 3), (8, 4),
(9, 1), (9, 2),
(10, 3), (10, 4),
(11, 1), (11, 3),
(12, 3), 
(13, 3),
(14, 2),
(15, 4);

