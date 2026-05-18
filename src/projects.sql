-- ========================================
-- BrightFuture Builders Service Projects
-- ========================================

INSERT INTO service_project 
(organization_id, title, description, address, date)
VALUES
(1, 'Community Playground Build',
 'Built a new playground for local families and children.',
 '125 Oak Street, Denver, CO',
 '2026-06-10'),

(1, 'Habitat Repair Project',
 'Repaired damaged homes for low-income residents.',
 '455 Pine Avenue, Denver, CO',
 '2026-07-02'),

(1, 'School Renovation Initiative',
 'Renovated classrooms and painted school facilities.',
 '890 Cedar Road, Denver, CO',
 '2026-08-15'),

(1, 'Veterans Housing Construction',
 'Constructed temporary housing units for veterans.',
 '300 Liberty Lane, Denver, CO',
 '2026-09-05'),

(1, 'Neighborhood Bench Installation',
 'Installed benches and public seating areas in parks.',
 '75 Elm Park Drive, Denver, CO',
 '2026-10-01');

-- ========================================
-- GreenHarvest Growers Service Projects
-- ========================================

INSERT INTO service_project
(organization_id, title, description, address, date)
VALUES
(2, 'Community Garden Expansion',
 'Expanded a local community vegetable garden.',
 '210 Garden Way, Portland, OR',
 '2026-05-20'),

(2, 'Tree Planting Day',
 'Planted trees throughout the neighborhood park.',
 '98 Forest Lane, Portland, OR',
 '2026-06-14'),

(2, 'Urban Farming Workshop',
 'Taught residents how to grow food in urban spaces.',
 '640 Harvest Street, Portland, OR',
 '2026-07-08'),

(2, 'School Greenhouse Project',
 'Built a greenhouse for a local elementary school.',
 '412 Maple Drive, Portland, OR',
 '2026-08-12'),

(2, 'Food Bank Produce Donation',
 'Grew and donated fresh vegetables to food banks.',
 '50 River Road, Portland, OR',
 '2026-09-18');

-- ========================================
-- UnityServe Service Projects
-- ========================================

INSERT INTO service_project
(organization_id, title, description, address, date)
VALUES
(3, 'Senior Assistance Program',
 'Provided yard work and home assistance for seniors.',
 '700 Main Street, Dallas, TX',
 '2026-05-28'),

(3, 'Holiday Food Drive',
 'Collected and distributed food to local families.',
 '89 Hope Avenue, Dallas, TX',
 '2026-11-20'),

(3, 'Community Cleanup Day',
 'Organized volunteers to clean streets and parks.',
 '155 Lakeview Blvd, Dallas, TX',
 '2026-06-30'),

(3, 'Back-to-School Supply Giveaway',
 'Distributed school supplies to children in need.',
 '980 Education Lane, Dallas, TX',
 '2026-08-03'),

(3, 'Emergency Relief Support',
 'Delivered emergency supplies after severe storms.',
 '45 Unity Plaza, Dallas, TX',
 '2026-09-25');

 select * from service_project;