-- ============================================
-- Atideto Technologies ERP Seed Data
-- ============================================

-- Roles
INSERT OR IGNORE INTO roles (id, name, description) VALUES
(1, 'super_admin', 'Super Administrator with full access'),
(2, 'admin', 'Administrator'),
(3, 'student', 'Student'),
(4, 'trainer', 'Trainer / Instructor');

-- Permissions
INSERT OR IGNORE INTO permissions (name, description, module) VALUES
('users.view', 'View users', 'users'),
('users.create', 'Create users', 'users'),
('users.edit', 'Edit users', 'users'),
('users.delete', 'Delete users', 'users'),
('students.view', 'View students', 'students'),
('students.create', 'Create students', 'students'),
('students.edit', 'Edit students', 'students'),
('students.delete', 'Delete students', 'students'),
('courses.view', 'View courses', 'courses'),
('courses.create', 'Create courses', 'courses'),
('courses.edit', 'Edit courses', 'courses'),
('courses.delete', 'Delete courses', 'courses'),
('payments.view', 'View payments', 'payments'),
('payments.create', 'Create payments', 'payments'),
('attendance.view', 'View attendance', 'attendance'),
('attendance.mark', 'Mark attendance', 'attendance'),
('certificates.view', 'View certificates', 'certificates'),
('certificates.generate', 'Generate certificates', 'certificates'),
('reports.view', 'View reports', 'reports'),
('settings.manage', 'Manage settings', 'settings');

-- Admin & Demo Users
-- admin@atidetotech.com (Admin@123), admin@atideto.com (admin123), student@atideto.com (student123), employee@atideto.com (employee123)
INSERT OR IGNORE INTO users (id, email, password_hash, role_id, first_name, last_name, status, email_verified) VALUES
(1, 'admin@atidetotech.com', '$2a$10$AxHIJzhzADAM5Fg1YVOUoul5YXAEyWGyrzMHjMQTCBqxLOSaCAx5O', 1, 'Atideto', 'Admin', 'active', 1),
(2, 'admin@atideto.com', '$2a$10$tZ2RzVv8qTf7U78Z7F7Q..P534qB3s4dDk9B1F2H3J4K5L6M7N8O9', 1, 'ATIDETO', 'Admin', 'active', 1),
(3, 'student@atideto.com', '$2a$10$tZ2RzVv8qTf7U78Z7F7Q..P534qB3s4dDk9B1F2H3J4K5L6M7N8O9', 3, 'Aarav', 'Sharma', 'active', 1),
(4, 'employee@atideto.com', '$2a$10$tZ2RzVv8qTf7U78Z7F7Q..P534qB3s4dDk9B1F2H3J4K5L6M7N8O9', 4, 'Rajesh', 'Kumar', 'active', 1);

-- Demo Student Profile
INSERT OR IGNORE INTO students (id, user_id, student_id, first_name, last_name, email, phone, gender, college, university, degree, department, year_of_study, graduation_year, status) VALUES
(1, 3, 'ATIDETO-STU-1001', 'Aarav', 'Sharma', 'student@atideto.com', '9876543210', 'male', 'Anna University', 'Anna University', 'B.Tech', 'Computer Science', '3', '2026', 'active');

-- Sample Courses
INSERT OR IGNORE INTO courses (id, slug, title, short_description, description, category, duration, duration_weeks, price, discounted_price, mode, level, has_certificate, rating, total_reviews, total_enrolled, max_students, curriculum, skills, projects, faqs, trainer_name, trainer_title, trainer_bio, is_active, is_featured, sort_order, start_date, end_date, batch_name) VALUES
(1, 'full-stack-web-development', 'Full Stack Web Development',
'Master modern web development with HTML, CSS, JavaScript, React, Node.js, and databases. Build real-world projects.',
'Become a professional full-stack web developer with our comprehensive program. Learn front-end technologies like HTML5, CSS3, JavaScript ES6+, and React.js alongside back-end technologies including Node.js, Express.js, and databases like MongoDB and PostgreSQL. Work on 5+ real-world projects with industry mentors.',
'internship', '8 Weeks', 8, 9999, 6999, 'online', 'beginner', 1, 4.8, 234, 1520, 50,
'[{"module":"Module 1: Web Foundations","lessons":["HTML5 Semantic Structure","CSS3 Flexbox & Grid","Responsive Design","CSS Animations"]},{"module":"Module 2: JavaScript Mastery","lessons":["ES6+ Features","DOM Manipulation","Async Programming","API Integration"]},{"module":"Module 3: React.js","lessons":["Components & Props","State Management","React Router","Hooks & Context"]},{"module":"Module 4: Backend Development","lessons":["Node.js Fundamentals","Express.js Framework","REST API Design","Authentication & Security"]},{"module":"Module 5: Database & Deployment","lessons":["MongoDB & Mongoose","PostgreSQL","Cloud Deployment","CI/CD Basics"]}]',
'["HTML5","CSS3","JavaScript","React.js","Node.js","Express.js","MongoDB","PostgreSQL","Git","REST APIs","Responsive Design","Deployment"]',
'[{"title":"Portfolio Website","description":"Build a stunning personal portfolio with animations"},{"title":"E-Commerce Platform","description":"Full-featured online store with payment integration"},{"title":"Social Media Dashboard","description":"Real-time dashboard with charts and analytics"},{"title":"Task Management App","description":"Collaborative project management tool"},{"title":"Chat Application","description":"Real-time messaging with WebSocket"}]',
'[{"question":"What are the prerequisites?","answer":"Basic computer knowledge is sufficient. We start from scratch and build up your skills progressively."},{"question":"Will I get a certificate?","answer":"Yes! You will receive an industry-recognized internship completion certificate with a unique verification QR code."},{"question":"Is there placement support?","answer":"Yes, we provide resume building, mock interviews, and connect you with our hiring partners."},{"question":"Can I pay in installments?","answer":"Yes, you can choose to pay an advance amount and the balance before the end of the program."},{"question":"What is the class schedule?","answer":"Classes are held Monday to Friday, 7 PM to 9 PM IST. All sessions are recorded for later viewing."}]',
'Rajesh Kumar', 'Senior Full Stack Developer', 'Rajesh has 8+ years of experience in web development, having worked at top tech companies. He specializes in React, Node.js, and cloud technologies. He has trained 2000+ students.',
1, 1, 1, '2026-09-01', '2026-10-26', 'Batch FSW-2026-09'),

(2, 'python-ai-machine-learning', 'Python & AI / Machine Learning',
'Learn Python programming, data science, and artificial intelligence. Work on real AI projects.',
'Dive into the world of Artificial Intelligence and Machine Learning with Python. This comprehensive program covers Python fundamentals, data analysis with Pandas and NumPy, machine learning algorithms with Scikit-learn, deep learning with TensorFlow and PyTorch, and natural language processing. Build 4+ AI projects with real datasets.',
'internship', '10 Weeks', 10, 12999, 8999, 'online', 'intermediate', 1, 4.7, 189, 980, 40,
'[{"module":"Module 1: Python Fundamentals","lessons":["Python Basics & Data Types","Control Flow & Functions","OOP in Python","File Handling & Modules"]},{"module":"Module 2: Data Science","lessons":["NumPy & Pandas","Data Cleaning & EDA","Data Visualization","Statistical Analysis"]},{"module":"Module 3: Machine Learning","lessons":["Supervised Learning","Unsupervised Learning","Model Evaluation","Feature Engineering"]},{"module":"Module 4: Deep Learning","lessons":["Neural Networks","CNNs for Image Processing","RNNs & LSTMs","Transfer Learning"]},{"module":"Module 5: AI Applications","lessons":["NLP & Text Processing","Computer Vision","Recommendation Systems","Model Deployment"]}]',
'["Python","NumPy","Pandas","Matplotlib","Scikit-learn","TensorFlow","PyTorch","NLP","Computer Vision","Data Visualization","SQL","Jupyter"]',
'[{"title":"Sentiment Analyzer","description":"NLP-based sentiment analysis of product reviews"},{"title":"Image Classifier","description":"CNN-based image classification system"},{"title":"Recommendation Engine","description":"Collaborative filtering recommendation system"},{"title":"Chatbot","description":"AI-powered conversational chatbot"}]',
'[{"question":"Do I need prior programming experience?","answer":"Basic programming knowledge is helpful but not required. We cover Python from the basics."},{"question":"What tools will I use?","answer":"Jupyter Notebook, Google Colab, VS Code, GitHub, and various Python libraries."},{"question":"Are the projects based on real data?","answer":"Yes! All projects use real-world datasets from Kaggle and other open data sources."},{"question":"Will I get GPU access for deep learning?","answer":"Yes, we provide Google Colab Pro access for GPU-accelerated training."}]',
'Dr. Priya Sharma', 'AI Research Lead', 'Dr. Priya holds a PhD in Computer Science with specialization in Machine Learning. She has published 15+ research papers and has 6 years of industry experience at leading AI companies.',
1, 1, 2, '2026-09-15', '2026-11-23', 'Batch PAI-2026-09'),

(3, 'mobile-app-development', 'Mobile App Development',
'Build cross-platform mobile apps with React Native and Flutter. From zero to app store.',
'Create beautiful, high-performance mobile applications for both iOS and Android. Learn React Native and Flutter frameworks, state management, native device features, API integration, and app store deployment. Build 3+ complete mobile apps that you can publish.',
'training', '6 Weeks', 6, 7999, 5499, 'hybrid', 'beginner', 1, 4.6, 156, 750, 35,
'[{"module":"Module 1: Mobile Fundamentals","lessons":["Mobile UI/UX Principles","React Native Setup","Components & Navigation","Styling & Layouts"]},{"module":"Module 2: React Native Deep Dive","lessons":["State Management","API Integration","Native Modules","Push Notifications"]},{"module":"Module 3: Flutter","lessons":["Dart Language","Flutter Widgets","State Management with Provider","Platform Channels"]},{"module":"Module 4: Advanced Topics","lessons":["Authentication & Storage","Maps & Location","Camera & Media","Animations"]},{"module":"Module 5: Deployment","lessons":["Testing & Debugging","App Store Submission","Google Play Deployment","Performance Optimization"]}]',
'["React Native","Flutter","Dart","JavaScript","REST APIs","Firebase","SQLite","UI/UX Design","Git","App Store Deployment"]',
'[{"title":"Food Delivery App","description":"Complete food ordering app with real-time tracking"},{"title":"Fitness Tracker","description":"Health & fitness app with charts and device sensors"},{"title":"Social Media App","description":"Instagram-like social media application"}]',
'[{"question":"Do I need a Mac for iOS development?","answer":"For React Native, you can use Windows/Linux for Android development. For iOS testing, we provide cloud-based Mac access."},{"question":"Will my apps work on both platforms?","answer":"Yes! Both React Native and Flutter create cross-platform apps that run on iOS and Android."},{"question":"What about the hybrid mode?","answer":"Hybrid mode includes both online classes and weekend in-person workshops at our Chennai center."}]',
'Arun Prakash', 'Mobile Tech Lead', 'Arun is a mobile development expert with 7+ years of experience. He has published 20+ apps on App Store and Google Play with millions of downloads.',
1, 1, 3, '2026-09-01', '2026-10-12', 'Batch MAD-2026-09');

-- Internships
INSERT OR IGNORE INTO internships (id, course_id, slug, title, company, description, domain, duration, mode, has_certificate, has_letter, rating, total_enrolled, is_active, is_featured, sort_order) VALUES
(1, 1, 'web-development-internship', 'Web Development Internship', 'Atideto Technologies',
'Join our Web Development internship program and gain hands-on experience building real-world web applications. Work with industry mentors on live projects.',
'Web Development', '8 Weeks', 'online', 1, 1, 4.8, 1520, 1, 1, 1),

(2, 2, 'ai-ml-internship', 'AI & Machine Learning Internship', 'Atideto Technologies',
'Explore the cutting edge of AI and Machine Learning. Build intelligent systems, train models on real datasets, and deploy AI solutions.',
'Artificial Intelligence', '10 Weeks', 'online', 1, 1, 4.7, 980, 1, 1, 2),

(3, 3, 'mobile-development-internship', 'Mobile App Development Internship', 'Atideto Technologies',
'Build beautiful mobile applications for iOS and Android. Learn React Native and Flutter while working on real app projects.',
'Mobile Development', '6 Weeks', 'hybrid', 1, 1, 4.6, 750, 1, 1, 3);

-- Coupons
INSERT OR IGNORE INTO coupons (code, description, discount_type, discount_value, min_amount, max_discount, usage_limit, used_count, valid_from, valid_until, is_active) VALUES
('ATIDETO10', '10% off on any course', 'percentage', 10, 5000, 1500, 100, 0, '2026-01-01', '2026-12-31', 1),
('EARLY20', '20% early bird discount', 'percentage', 20, 5000, 3000, 50, 0, '2026-01-01', '2026-09-30', 1),
('FLAT500', 'Flat ₹500 off', 'fixed', 500, 3000, 500, 200, 0, '2026-01-01', '2026-12-31', 1),
('STUDENT15', '15% student special', 'percentage', 15, 4000, 2000, 150, 0, '2026-01-01', '2026-12-31', 1),
('WELCOME', '₹1000 welcome discount', 'fixed', 1000, 5000, 1000, 500, 0, '2026-01-01', '2026-12-31', 1);

-- Clients Seed Data
INSERT OR IGNORE INTO clients (id, client_code, company_name, contact_person, email, phone, industry, location, company_size, website, requirements, status, assigned_to) VALUES
(1, 'CLI-1001', 'Nexus Digital Solutions', 'Vikram Malhotra', 'vikram@nexusdigital.io', '9840123456', 'IT & Software', 'Chennai', '51-200', 'https://nexusdigital.io', 'Seeking 15 MERN stack interns for Q4 development cycle.', 'partner', 4),
(2, 'CLI-1002', 'St. Joseph Engineering College', 'Dr. Radhakrishnan', 'placement@stjoseph.edu', '9444198765', 'Education & Colleges', 'Chennai', '500+', 'https://stjoseph.edu', 'Annual corporate training MOU for 120 final-year CSE students.', 'partner', 4),
(3, 'CLI-1003', 'Apex Cloud Systems', 'Pooja Hegde', 'pooja.h@apexcloud.com', '9884561230', 'IT & Software', 'Bangalore', '201-500', 'https://apexcloud.com', 'Python & Cloud DevOps training for fresh campus recruits.', 'contacted', 4),
(4, 'CLI-1004', 'MedPulse Technologies', 'Dr. Karthik S.', 'hr@medpulse.in', '9790852314', 'Healthcare Tech', 'Hyderabad', '11-50', 'https://medpulse.in', 'Full stack React application developers internship.', 'prospect', 4),
(5, 'CLI-1005', 'FinEdge Analytics', 'Suresh Menon', 'suresh@finedge.co', '9841029384', 'Financial Services', 'Mumbai', '51-200', 'https://finedge.co', 'AI & Data Science internship batch for financial modeling.', 'contacted', 4),
(6, 'CLI-1006', 'Vellore Tech Institute', 'Prof. Balasubramanian', 'dean.industry@vitac.edu', '9443210987', 'Education & Colleges', 'Vellore', '500+', 'https://vitac.edu', 'Campus recruitment training program and internship partner drive.', 'prospect', 4);

-- Leads Seed Data
INSERT OR IGNORE INTO leads (id, lead_id, client_id, title, contact_name, company_name, email, phone, source, stage, priority, deal_value, expected_close_date, assigned_to, notes, next_followup_date) VALUES
(1, 'LEAD-2026-001', 1, 'Full-Stack Corporate Batch (15 Interns)', 'Vikram Malhotra', 'Nexus Digital Solutions', 'vikram@nexusdigital.io', '9840123456', 'referral', 'won', 'high', 105000, '2026-10-15', 4, 'Signed contract for 15 interns. Initial advance received.', '2026-10-14 11:00:00'),
(2, 'LEAD-2026-002', 2, 'College Campus Training MOU (120 Students)', 'Dr. Radhakrishnan', 'St. Joseph Engineering College', 'placement@stjoseph.edu', '9444198765', 'event', 'proposal', 'high', 360000, '2026-10-25', 4, 'Proposal sent. Awaiting board approval meeting on Wednesday.', '2026-10-13 14:30:00'),
(3, 'LEAD-2026-003', 3, 'DevOps & Python Training Program', 'Pooja Hegde', 'Apex Cloud Systems', 'pooja.h@apexcloud.com', '9884561230', 'linkedin', 'discussion', 'medium', 85000, '2026-11-05', 4, 'Discussing curriculum custom modules for containerization.', '2026-10-15 16:00:00'),
(4, 'LEAD-2026-004', 4, 'React Native Mobile App Batch', 'Dr. Karthik S.', 'MedPulse Technologies', 'hr@medpulse.in', '9790852314', 'inbound', 'contacted', 'medium', 55000, '2026-11-12', 4, 'Initial inquiry through website. First demo call completed.', '2026-10-16 10:30:00'),
(5, 'LEAD-2026-005', 5, 'AI Machine Learning Cohort', 'Suresh Menon', 'FinEdge Analytics', 'suresh@finedge.co', '9841029384', 'cold_outreach', 'new', 'low', 75000, '2026-11-20', 4, 'Outreach email opened twice. Need to schedule intro call.', '2026-10-17 15:00:00');

-- Follow-ups Seed Data
INSERT OR IGNORE INTO follow_ups (id, lead_id, client_id, employee_id, title, type, scheduled_at, status, notes, outcome, completed_at) VALUES
(1, 2, 2, 4, 'MOU Final Review with Placement Director', 'video_meeting', '2026-10-13 14:30:00', 'scheduled', 'Review pricing tiers and syllabus schedule for 120 students batch.', NULL, NULL),
(2, 1, 1, 4, 'Kickoff Onboarding & Student List Handover', 'phone_call', '2026-10-14 11:00:00', 'scheduled', 'Confirm joining dates and mentor allocation for 15 interns.', NULL, NULL),
(3, 3, 3, 4, 'Curriculum Customization Walkthrough', 'video_meeting', '2026-10-15 16:00:00', 'scheduled', 'Demonstrate practical lab platform and project guidelines.', NULL, NULL),
(4, 4, 4, 4, 'Product Demo and Internship Scope Discussion', 'phone_call', '2026-10-10 10:00:00', 'completed', 'Discussed React Native batch syllabus and 6-week timeline.', 'interested', '2026-10-10 10:45:00'),
(5, 5, 5, 4, 'Follow-up Email regarding AI syllabus', 'email', '2026-10-09 15:00:00', 'completed', 'Sent course brochure and success stories from previous batch.', 'callback_requested', '2026-10-09 15:20:00');

-- Employee Tasks Seed Data
INSERT OR IGNORE INTO employee_tasks (id, title, description, assigned_to, assigned_by, lead_id, priority, status, category, due_date) VALUES
(1, 'Finalize MOU draft for St. Joseph College', 'Include revised discount slabs for CSE & IT departments before the call.', 4, 1, 2, 'high', 'in_progress', 'documentation', '2026-10-13'),
(2, 'Send onboarding welcome kit to Nexus Digital', 'Dispatch mentor guides, project templates, and student credentials.', 4, 1, 1, 'high', 'todo', 'client_outreach', '2026-10-14'),
(3, 'Prepare custom Cloud syllabus for Apex Systems', 'Draft 4-week Docker & Kubernetes module overview for Pooja Hegde.', 4, 1, 3, 'medium', 'todo', 'documentation', '2026-10-15'),
(4, 'Update Lead pipeline records for Q4', 'Ensure all deals close dates and notes are synchronized in ERP.', 4, 1, NULL, 'medium', 'completed', 'other', '2026-10-11'),
(5, 'Verify certificate requests for completed batch', 'Review 18 completion certificates pending trainer approval.', 4, 1, NULL, 'low', 'completed', 'documentation', '2026-10-09');

-- Employee Performance Targets & KPIs Seed Data
INSERT OR IGNORE INTO employee_targets (id, employee_id, month, year, leads_target, revenue_target, followups_target, rating, manager_feedback) VALUES
(1, 4, 10, 2026, 35, 250000, 80, 4.8, 'Outstanding client outreach performance! Excellent conversion on Nexus Digital.');

