--
-- PostgreSQL database dump
--

\restrict tcHMW1vN0FwyZN52FxK0aqVrrazEftw0MmEiarWfvmvz6Ob3Gmg6DvxpXQ2cCtC

-- Dumped from database version 18.0 (Debian 18.0-1.pgdg13+3)
-- Dumped by pg_dump version 18.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: Admin; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Admin" (id, username) VALUES ('admin2', 'admin2') ON CONFLICT DO NOTHING;
INSERT INTO public."Admin" (id, username) VALUES ('user_34ANaNGeQOKAo1CMvwDRIwIG8qE', 'admin1') ON CONFLICT DO NOTHING;


--
-- Data for Name: Grade; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Grade" (id, level) VALUES (1, 1) ON CONFLICT DO NOTHING;
INSERT INTO public."Grade" (id, level) VALUES (2, 2) ON CONFLICT DO NOTHING;
INSERT INTO public."Grade" (id, level) VALUES (3, 3) ON CONFLICT DO NOTHING;
INSERT INTO public."Grade" (id, level) VALUES (4, 4) ON CONFLICT DO NOTHING;
INSERT INTO public."Grade" (id, level) VALUES (5, 5) ON CONFLICT DO NOTHING;
INSERT INTO public."Grade" (id, level) VALUES (6, 6) ON CONFLICT DO NOTHING;


--
-- Data for Name: Teacher; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Teacher" (id, username, name, surname, email, phone, address, img, "bloodType", sex, "createdAt", birthday, "clerkUserId") VALUES ('user_34s0dqxzS2WUU2BQs0wJHKQPcnp', 'emma', 'Emma', 'Bennett', 'emma.bennett@email.com', '+1-206-555-7814', '304 Cedar Lane, Seattle, WA', 'https://res.cloudinary.com/ddhwtpjcf/image/upload/v1761993177/nm0jlsksyganzjpw89ao.jpg', 'AB-', 'FEMALE', '2025-11-01 08:51:01.652', '2025-10-26 00:00:00', 'user_34s0dqxzS2WUU2BQs0wJHKQPcnp') ON CONFLICT DO NOTHING;
INSERT INTO public."Teacher" (id, username, name, surname, email, phone, address, img, "bloodType", sex, "createdAt", birthday, "clerkUserId") VALUES ('user_34s0FsMbyGKiX3w5SunzzB6XRQb', 'mason', 'Mason', 'Clark', 'mason.clark@email.com', '+1-415-555-6711', '92 Pine Street, San Francisco, CA', 'https://res.cloudinary.com/ddhwtpjcf/image/upload/v1761993205/aid7qp3smrku20evnrfo.jpg', 'O-', 'MALE', '2025-11-01 08:47:51.968', '2025-10-26 00:00:00', 'user_34s0FsMbyGKiX3w5SunzzB6XRQb') ON CONFLICT DO NOTHING;
INSERT INTO public."Teacher" (id, username, name, surname, email, phone, address, img, "bloodType", sex, "createdAt", birthday, "clerkUserId") VALUES ('user_34s0kuEJbL3NNep5fIfxejZRO5q', 'lucas', 'Lucas', 'Hughes', 'lucas.hughes@email.com', '+1-214-555-1297', '88 Elm Street, Dallas, TX', 'https://res.cloudinary.com/ddhwtpjcf/image/upload/v1761993375/pvapvee1d8fjptofbedz.jpg', 'O+', 'MALE', '2025-11-01 08:51:58.527', '2025-10-26 00:00:00', 'user_34s0kuEJbL3NNep5fIfxejZRO5q') ON CONFLICT DO NOTHING;
INSERT INTO public."Teacher" (id, username, name, surname, email, phone, address, img, "bloodType", sex, "createdAt", birthday, "clerkUserId") VALUES ('user_34rxQFAsJMzL2bSj4z9ZoZq8RU9', 'ethan', 'Ethan', 'Harris', 'ethan.harris@email.com', '+1-202-555-0182', '128 Maple Avenue, Boston, MA', 'https://res.cloudinary.com/ddhwtpjcf/image/upload/v1761993103/coikgw13jjmxj0pjs8zi.jpg', 'O+', 'MALE', '2025-11-01 08:24:34.027', '2025-10-27 00:00:00', 'user_34rxQFAsJMzL2bSj4z9ZoZq8RU9') ON CONFLICT DO NOTHING;
INSERT INTO public."Teacher" (id, username, name, surname, email, phone, address, img, "bloodType", sex, "createdAt", birthday, "clerkUserId") VALUES ('user_34s0Ws21yPuukibVKY3kM953BBz', 'noah', 'Noah', 'Turner', 'noah.turner@email.com', '+1-602-555-9983', '210 Desert Ridge Rd, Phoenix, AZ', 'https://res.cloudinary.com/ddhwtpjcf/image/upload/v1762050058/gikqpdsf5w4zbsnhuzxk.jpg', 'B-', 'MALE', '2025-11-01 08:50:06.731', '2025-10-26 00:00:00', 'user_34s0Ws21yPuukibVKY3kM953BBz') ON CONFLICT DO NOTHING;
INSERT INTO public."Teacher" (id, username, name, surname, email, phone, address, img, "bloodType", sex, "createdAt", birthday, "clerkUserId") VALUES ('user_34rxZLM6CVfsMp0YUWtcIXobJGO', 'sophia', 'Sophia', 'Roberts', 'sophia.roberts@email.com', '+1-213-555-9014', '452 Hillcrest Rd, Los Angeles, CA', 'https://res.cloudinary.com/ddhwtpjcf/image/upload/v1761993143/xvmwfm3qzfrkkicvpgyn.jpg', 'A-', 'FEMALE', '2025-11-01 08:25:45.568', '2025-11-06 00:00:00', 'user_34rxZLM6CVfsMp0YUWtcIXobJGO') ON CONFLICT DO NOTHING;
INSERT INTO public."Teacher" (id, username, name, surname, email, phone, address, img, "bloodType", sex, "createdAt", birthday, "clerkUserId") VALUES ('user_34rzT89RSOeFUi5vVbBRj8Pcs3G', 'ava_walker', 'Ava', 'Walker', 'ava.walker@email.com', '+1-646-555-2890', '77 Riverside Dr, New York, NY', 'https://res.cloudinary.com/ddhwtpjcf/image/upload/v1761993160/gwj6xlxqykxiok2nlabd.jpg', 'AB+', 'MALE', '2025-11-01 08:41:23.467', '2025-10-26 00:00:00', 'user_34rzT89RSOeFUi5vVbBRj8Pcs3G') ON CONFLICT DO NOTHING;
INSERT INTO public."Teacher" (id, username, name, surname, email, phone, address, img, "bloodType", sex, "createdAt", birthday, "clerkUserId") VALUES ('user_34s0OFiSjtdH2RdDb9TmJAa8eak', 'olivia', 'Olivia', 'Morgan', 'olivia.morgan@email.com', '+1-305-555-4432', '15 Ocean View Blvd, Miami, FL', 'https://res.cloudinary.com/ddhwtpjcf/image/upload/v1762050295/gl8bzikv2wercwscdpjs.jpg', 'A+', 'FEMALE', '2025-11-01 08:48:57.654', '2025-10-26 00:00:00', 'user_34s0OFiSjtdH2RdDb9TmJAa8eak') ON CONFLICT DO NOTHING;
INSERT INTO public."Teacher" (id, username, name, surname, email, phone, address, img, "bloodType", sex, "createdAt", birthday, "clerkUserId") VALUES ('user_34s11USrHhZE36LtsPd1Unpt8ZV', 'mia_carter', 'Mia', 'Carter', 'mia.carter@email.com', '+1-404-555-9123', '501 Peachtree Ave, Atlanta, GA', 'https://res.cloudinary.com/ddhwtpjcf/image/upload/v1762050322/rzpmek9gr1bhxnmeilds.jpg', 'A+', 'FEMALE', '2025-11-01 08:54:10.546', '2025-10-26 00:00:00', 'user_34s11USrHhZE36LtsPd1Unpt8ZV') ON CONFLICT DO NOTHING;
INSERT INTO public."Teacher" (id, username, name, surname, email, phone, address, img, "bloodType", sex, "createdAt", birthday, "clerkUserId") VALUES ('user_34rljaX6wrnrgkR5Y87KFMFwaLX', 'Handsome', 'Hans', 'Sama', 'hands@example.com', '5879389662', '10800 74 Ave NW', NULL, 'A+', 'FEMALE', '2025-11-01 06:48:27.52', '2025-10-26 00:00:00', 'user_34rljaX6wrnrgkR5Y87KFMFwaLX') ON CONFLICT DO NOTHING;
INSERT INTO public."Teacher" (id, username, name, surname, email, phone, address, img, "bloodType", sex, "createdAt", birthday, "clerkUserId") VALUES ('user_34rxk4yz32nzSGuO1IACy8bOLSy', 'liam', 'Liam', 'Thompson', 'liam.thompson@email.com', '+1-312-555-7452', '33 Oakwood St, Chicago, IL', NULL, 'B+', 'MALE', '2025-11-01 08:27:11.116', '2025-11-03 00:00:00', 'user_34rxk4yz32nzSGuO1IACy8bOLSy') ON CONFLICT DO NOTHING;


--
-- Data for Name: Class; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Class" (id, name, capacity, "supervisorId", "gradeId") VALUES (16, '5A', 5, 'user_34rzT89RSOeFUi5vVbBRj8Pcs3G', 5) ON CONFLICT DO NOTHING;
INSERT INTO public."Class" (id, name, capacity, "supervisorId", "gradeId") VALUES (17, '6A', 5, 'user_34s0FsMbyGKiX3w5SunzzB6XRQb', 6) ON CONFLICT DO NOTHING;
INSERT INTO public."Class" (id, name, capacity, "supervisorId", "gradeId") VALUES (13, '1A', 5, 'user_34rxQFAsJMzL2bSj4z9ZoZq8RU9', 1) ON CONFLICT DO NOTHING;
INSERT INTO public."Class" (id, name, capacity, "supervisorId", "gradeId") VALUES (14, '3A', 5, 'user_34rxZLM6CVfsMp0YUWtcIXobJGO', 3) ON CONFLICT DO NOTHING;
INSERT INTO public."Class" (id, name, capacity, "supervisorId", "gradeId") VALUES (12, '2A', 5, 'user_34rljaX6wrnrgkR5Y87KFMFwaLX', 2) ON CONFLICT DO NOTHING;
INSERT INTO public."Class" (id, name, capacity, "supervisorId", "gradeId") VALUES (15, '4A', 5, 'user_34rxk4yz32nzSGuO1IACy8bOLSy', 4) ON CONFLICT DO NOTHING;


--
-- Data for Name: Announcement; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Announcement" (id, title, date, description, "classId") VALUES (7, 'General ', '2025-11-01 06:43:00', 'for all', NULL) ON CONFLICT DO NOTHING;
INSERT INTO public."Announcement" (id, title, date, description, "classId") VALUES (1, 'Announcement 1', '2025-10-23 18:31:00', 'Description for Announcement 1', 13) ON CONFLICT DO NOTHING;
INSERT INTO public."Announcement" (id, title, date, description, "classId") VALUES (2, 'Announcement 2', '2025-10-23 06:31:00', 'Description for Announcement 2', 12) ON CONFLICT DO NOTHING;
INSERT INTO public."Announcement" (id, title, date, description, "classId") VALUES (3, 'Announcement 3', '2025-10-23 06:31:00', 'Description for Announcement 3', 14) ON CONFLICT DO NOTHING;
INSERT INTO public."Announcement" (id, title, date, description, "classId") VALUES (4, 'Announcement 4', '2025-10-23 06:31:00', 'Description for Announcement 4', 15) ON CONFLICT DO NOTHING;
INSERT INTO public."Announcement" (id, title, date, description, "classId") VALUES (5, 'Announcement 5', '2025-10-23 06:31:00', 'Description for Announcement 5', 16) ON CONFLICT DO NOTHING;
INSERT INTO public."Announcement" (id, title, date, description, "classId") VALUES (8, 'Announcement 6', '2025-11-20 10:55:00', 'Description for Announcement 6', 17) ON CONFLICT DO NOTHING;


--
-- Data for Name: Subject; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Subject" (id, name) VALUES (1, 'Mathematics') ON CONFLICT DO NOTHING;
INSERT INTO public."Subject" (id, name) VALUES (2, 'Science') ON CONFLICT DO NOTHING;
INSERT INTO public."Subject" (id, name) VALUES (3, 'English') ON CONFLICT DO NOTHING;
INSERT INTO public."Subject" (id, name) VALUES (4, 'History') ON CONFLICT DO NOTHING;
INSERT INTO public."Subject" (id, name) VALUES (5, 'Geography') ON CONFLICT DO NOTHING;
INSERT INTO public."Subject" (id, name) VALUES (6, 'Physics') ON CONFLICT DO NOTHING;
INSERT INTO public."Subject" (id, name) VALUES (7, 'Chemistry') ON CONFLICT DO NOTHING;
INSERT INTO public."Subject" (id, name) VALUES (8, 'Biology') ON CONFLICT DO NOTHING;
INSERT INTO public."Subject" (id, name) VALUES (9, 'Computer Science') ON CONFLICT DO NOTHING;
INSERT INTO public."Subject" (id, name) VALUES (10, 'Art') ON CONFLICT DO NOTHING;
INSERT INTO public."Subject" (id, name) VALUES (44, 'Society Activity') ON CONFLICT DO NOTHING;


--
-- Data for Name: Lesson; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Lesson" (id, name, day, "startTime", "endTime", "subjectId", "classId", "teacherId") VALUES (9, 'ART-2A', 'TUESDAY', '2025-10-23 20:00:00', '2025-10-23 21:00:00', 10, 12, 'user_34s11USrHhZE36LtsPd1Unpt8ZV') ON CONFLICT DO NOTHING;
INSERT INTO public."Lesson" (id, name, day, "startTime", "endTime", "subjectId", "classId", "teacherId") VALUES (7, 'BIO-2A', 'MONDAY', '2025-10-24 21:00:00', '2025-10-24 22:00:00', 8, 12, 'user_34s0Ws21yPuukibVKY3kM953BBz') ON CONFLICT DO NOTHING;
INSERT INTO public."Lesson" (id, name, day, "startTime", "endTime", "subjectId", "classId", "teacherId") VALUES (8, 'CS-2A', 'THURSDAY', '2025-10-22 16:00:00', '2025-10-22 17:00:00', 9, 12, 'user_34s0dqxzS2WUU2BQs0wJHKQPcnp') ON CONFLICT DO NOTHING;
INSERT INTO public."Lesson" (id, name, day, "startTime", "endTime", "subjectId", "classId", "teacherId") VALUES (11, 'SCI-1A', 'MONDAY', '2025-10-22 14:00:00', '2025-10-22 15:00:00', 2, 13, 'user_34s0dqxzS2WUU2BQs0wJHKQPcnp') ON CONFLICT DO NOTHING;
INSERT INTO public."Lesson" (id, name, day, "startTime", "endTime", "subjectId", "classId", "teacherId") VALUES (12, 'ENG-1A', 'MONDAY', '2025-10-22 15:00:00', '2025-10-22 17:00:00', 3, 13, 'user_34s0FsMbyGKiX3w5SunzzB6XRQb') ON CONFLICT DO NOTHING;
INSERT INTO public."Lesson" (id, name, day, "startTime", "endTime", "subjectId", "classId", "teacherId") VALUES (13, 'HIS-1A', 'THURSDAY', '2025-10-22 20:00:00', '2025-10-22 21:00:00', 4, 13, 'user_34s0dqxzS2WUU2BQs0wJHKQPcnp') ON CONFLICT DO NOTHING;
INSERT INTO public."Lesson" (id, name, day, "startTime", "endTime", "subjectId", "classId", "teacherId") VALUES (14, 'GEO-1A', 'FRIDAY', '2025-10-22 21:00:00', '2025-10-22 23:00:00', 5, 13, 'user_34s0kuEJbL3NNep5fIfxejZRO5q') ON CONFLICT DO NOTHING;
INSERT INTO public."Lesson" (id, name, day, "startTime", "endTime", "subjectId", "classId", "teacherId") VALUES (15, 'PHY-1A', 'FRIDAY', '2025-10-22 14:00:00', '2025-10-22 15:00:00', 6, 13, 'user_34s11USrHhZE36LtsPd1Unpt8ZV') ON CONFLICT DO NOTHING;
INSERT INTO public."Lesson" (id, name, day, "startTime", "endTime", "subjectId", "classId", "teacherId") VALUES (16, 'CHE-1A', 'MONDAY', '2025-10-22 22:00:00', '2025-10-22 23:00:00', 7, 13, 'user_34s0Ws21yPuukibVKY3kM953BBz') ON CONFLICT DO NOTHING;
INSERT INTO public."Lesson" (id, name, day, "startTime", "endTime", "subjectId", "classId", "teacherId") VALUES (17, 'BIO-1A', 'WEDNESDAY', '2025-10-22 22:00:00', '2025-10-22 23:00:00', 8, 13, 'user_34s0OFiSjtdH2RdDb9TmJAa8eak') ON CONFLICT DO NOTHING;
INSERT INTO public."Lesson" (id, name, day, "startTime", "endTime", "subjectId", "classId", "teacherId") VALUES (18, 'CS-1A', 'MONDAY', '2025-10-22 14:00:00', '2025-10-22 15:00:00', 9, 13, 'user_34rxQFAsJMzL2bSj4z9ZoZq8RU9') ON CONFLICT DO NOTHING;
INSERT INTO public."Lesson" (id, name, day, "startTime", "endTime", "subjectId", "classId", "teacherId") VALUES (19, 'ART-1A', 'FRIDAY', '2025-10-22 16:00:00', '2025-10-22 17:00:00', 10, 13, 'user_34rzT89RSOeFUi5vVbBRj8Pcs3G') ON CONFLICT DO NOTHING;
INSERT INTO public."Lesson" (id, name, day, "startTime", "endTime", "subjectId", "classId", "teacherId") VALUES (20, 'MATH-1A', 'TUESDAY', '2025-10-22 20:00:00', '2025-10-22 22:00:00', 1, 13, 'user_34rzT89RSOeFUi5vVbBRj8Pcs3G') ON CONFLICT DO NOTHING;
INSERT INTO public."Lesson" (id, name, day, "startTime", "endTime", "subjectId", "classId", "teacherId") VALUES (21, 'SCI-3A', 'MONDAY', '2025-10-22 14:00:00', '2025-10-22 15:00:00', 2, 14, 'user_34s0dqxzS2WUU2BQs0wJHKQPcnp') ON CONFLICT DO NOTHING;
INSERT INTO public."Lesson" (id, name, day, "startTime", "endTime", "subjectId", "classId", "teacherId") VALUES (22, 'ENG-3A', 'TUESDAY', '2025-10-22 15:00:00', '2025-10-22 16:00:00', 3, 14, 'user_34s0FsMbyGKiX3w5SunzzB6XRQb') ON CONFLICT DO NOTHING;
INSERT INTO public."Lesson" (id, name, day, "startTime", "endTime", "subjectId", "classId", "teacherId") VALUES (23, 'HIS-3A', 'TUESDAY', '2025-10-22 22:00:00', '2025-10-22 23:00:00', 4, 14, 'user_34s0kuEJbL3NNep5fIfxejZRO5q') ON CONFLICT DO NOTHING;
INSERT INTO public."Lesson" (id, name, day, "startTime", "endTime", "subjectId", "classId", "teacherId") VALUES (24, 'GEO-3A', 'WEDNESDAY', '2025-10-22 15:00:00', '2025-10-22 16:00:00', 5, 14, 'user_34rxk4yz32nzSGuO1IACy8bOLSy') ON CONFLICT DO NOTHING;
INSERT INTO public."Lesson" (id, name, day, "startTime", "endTime", "subjectId", "classId", "teacherId") VALUES (25, 'PHY-3A', 'THURSDAY', '2025-10-22 20:00:00', '2025-10-22 22:00:00', 6, 14, 'user_34rxQFAsJMzL2bSj4z9ZoZq8RU9') ON CONFLICT DO NOTHING;
INSERT INTO public."Lesson" (id, name, day, "startTime", "endTime", "subjectId", "classId", "teacherId") VALUES (26, 'CHE-3A', 'FRIDAY', '2025-10-22 14:00:00', '2025-10-22 15:00:00', 7, 14, 'user_34rxZLM6CVfsMp0YUWtcIXobJGO') ON CONFLICT DO NOTHING;
INSERT INTO public."Lesson" (id, name, day, "startTime", "endTime", "subjectId", "classId", "teacherId") VALUES (27, 'BIO-3A', 'FRIDAY', '2025-10-22 15:00:00', '2025-10-22 16:00:00', 8, 14, 'user_34rzT89RSOeFUi5vVbBRj8Pcs3G') ON CONFLICT DO NOTHING;
INSERT INTO public."Lesson" (id, name, day, "startTime", "endTime", "subjectId", "classId", "teacherId") VALUES (28, 'CS-3A', 'MONDAY', '2025-10-22 17:00:00', '2025-10-22 06:00:00', 9, 14, 'user_34s0OFiSjtdH2RdDb9TmJAa8eak') ON CONFLICT DO NOTHING;
INSERT INTO public."Lesson" (id, name, day, "startTime", "endTime", "subjectId", "classId", "teacherId") VALUES (29, 'ART-3A', 'TUESDAY', '2025-10-22 19:00:00', '2025-10-22 20:00:00', 10, 14, 'user_34s0Ws21yPuukibVKY3kM953BBz') ON CONFLICT DO NOTHING;
INSERT INTO public."Lesson" (id, name, day, "startTime", "endTime", "subjectId", "classId", "teacherId") VALUES (30, 'MATH-3A', 'WEDNESDAY', '2025-10-22 06:00:00', '2025-10-22 19:00:00', 1, 14, 'user_34s11USrHhZE36LtsPd1Unpt8ZV') ON CONFLICT DO NOTHING;
INSERT INTO public."Lesson" (id, name, day, "startTime", "endTime", "subjectId", "classId", "teacherId") VALUES (1, 'SCI-2A', 'MONDAY', '2025-10-24 14:00:00', '2025-10-24 15:00:00', 2, 12, 'user_34rxQFAsJMzL2bSj4z9ZoZq8RU9') ON CONFLICT DO NOTHING;
INSERT INTO public."Lesson" (id, name, day, "startTime", "endTime", "subjectId", "classId", "teacherId") VALUES (2, 'ENG-2A', 'TUESDAY', '2025-10-24 14:00:00', '2025-10-24 16:00:00', 3, 12, 'user_34rxZLM6CVfsMp0YUWtcIXobJGO') ON CONFLICT DO NOTHING;
INSERT INTO public."Lesson" (id, name, day, "startTime", "endTime", "subjectId", "classId", "teacherId") VALUES (3, 'HIS-2A', 'THURSDAY', '2025-10-24 20:00:00', '2025-10-24 21:00:00', 4, 12, 'user_34rzT89RSOeFUi5vVbBRj8Pcs3G') ON CONFLICT DO NOTHING;
INSERT INTO public."Lesson" (id, name, day, "startTime", "endTime", "subjectId", "classId", "teacherId") VALUES (4, 'GEO-2A', 'MONDAY', '2025-10-23 20:00:00', '2025-10-23 21:00:00', 5, 12, 'user_34s0FsMbyGKiX3w5SunzzB6XRQb') ON CONFLICT DO NOTHING;
INSERT INTO public."Lesson" (id, name, day, "startTime", "endTime", "subjectId", "classId", "teacherId") VALUES (5, 'PHY-2A', 'THURSDAY', '2025-10-23 15:00:00', '2025-10-23 16:00:00', 6, 12, 'user_34s0OFiSjtdH2RdDb9TmJAa8eak') ON CONFLICT DO NOTHING;
INSERT INTO public."Lesson" (id, name, day, "startTime", "endTime", "subjectId", "classId", "teacherId") VALUES (6, 'CHE-2A', 'MONDAY', '2025-10-23 15:00:00', '2025-10-24 16:00:00', 7, 12, 'user_34s0OFiSjtdH2RdDb9TmJAa8eak') ON CONFLICT DO NOTHING;
INSERT INTO public."Lesson" (id, name, day, "startTime", "endTime", "subjectId", "classId", "teacherId") VALUES (10, 'MATH-2A', 'FRIDAY', '2025-10-24 14:00:00', '2025-10-25 15:00:00', 1, 12, 'user_34rljaX6wrnrgkR5Y87KFMFwaLX') ON CONFLICT DO NOTHING;


--
-- Data for Name: Assignment; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Assignment" (id, title, "startDate", "dueDate", "lessonId") VALUES (2, 'Assignment 2', '2025-10-23 01:31:09.424', '2025-10-24 00:31:09.424', 3) ON CONFLICT DO NOTHING;
INSERT INTO public."Assignment" (id, title, "startDate", "dueDate", "lessonId") VALUES (3, 'Assignment 3', '2025-10-23 01:31:09.425', '2025-10-24 00:31:09.425', 4) ON CONFLICT DO NOTHING;
INSERT INTO public."Assignment" (id, title, "startDate", "dueDate", "lessonId") VALUES (4, 'Assignment 4', '2025-10-23 01:31:09.425', '2025-10-24 00:31:09.425', 5) ON CONFLICT DO NOTHING;
INSERT INTO public."Assignment" (id, title, "startDate", "dueDate", "lessonId") VALUES (5, 'Assignment 5', '2025-10-23 01:31:09.426', '2025-10-24 00:31:09.426', 6) ON CONFLICT DO NOTHING;
INSERT INTO public."Assignment" (id, title, "startDate", "dueDate", "lessonId") VALUES (6, 'Assignment 6', '2025-10-23 01:31:09.427', '2025-10-24 00:31:09.427', 7) ON CONFLICT DO NOTHING;
INSERT INTO public."Assignment" (id, title, "startDate", "dueDate", "lessonId") VALUES (7, 'Assignment 7', '2025-10-23 01:31:09.427', '2025-10-24 00:31:09.427', 8) ON CONFLICT DO NOTHING;
INSERT INTO public."Assignment" (id, title, "startDate", "dueDate", "lessonId") VALUES (8, 'Assignment 8', '2025-10-23 01:31:09.428', '2025-10-24 00:31:09.428', 9) ON CONFLICT DO NOTHING;
INSERT INTO public."Assignment" (id, title, "startDate", "dueDate", "lessonId") VALUES (9, 'Assignment 9', '2025-10-23 01:31:09.428', '2025-10-24 00:31:09.428', 10) ON CONFLICT DO NOTHING;
INSERT INTO public."Assignment" (id, title, "startDate", "dueDate", "lessonId") VALUES (10, 'Assignment 10', '2025-10-23 01:31:09.429', '2025-10-24 00:31:09.429', 11) ON CONFLICT DO NOTHING;
INSERT INTO public."Assignment" (id, title, "startDate", "dueDate", "lessonId") VALUES (1, 'Assignment 1', '2025-10-23 07:31:00', '2025-10-24 06:31:00', 1) ON CONFLICT DO NOTHING;


--
-- Data for Name: Parent; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Parent" (id, username, name, surname, email, phone, address, "createdAt") VALUES ('user_34sAmCg47BLKTrtBMU16itInjTS', 'emma_parent', 'emma_parent', 'emma_parent', 'emma.johnson@email.com', '+1-206-555-7814', '304 Cedar Lane, Seattle, WA', '2025-11-01 10:14:22.103') ON CONFLICT DO NOTHING;
INSERT INTO public."Parent" (id, username, name, surname, email, phone, address, "createdAt") VALUES ('user_34sAaJuSVl50KfJAbWMsY2BF3qX', 'noah_parent', 'noah_parent', 'noah_parent', 'noah.bennett@email.com', '+1-404-555-9123', '501 Peachtree Ave, Atlanta, GA', '2025-11-01 10:12:47.122') ON CONFLICT DO NOTHING;
INSERT INTO public."Parent" (id, username, name, surname, email, phone, address, "createdAt") VALUES ('user_34sAur3SNJ9d4HF6PV5FLvwnDva', 'lucas_parent', 'lucas_parent', 'lucas_parent', 'lucas.hughe@email.com', '+1-214-555-1297', '88 Elm Street, Dallas, TX', '2025-11-01 10:15:29.988') ON CONFLICT DO NOTHING;
INSERT INTO public."Parent" (id, username, name, surname, email, phone, address, "createdAt") VALUES ('user_34sB1991dqz7UfolRAdyOOcwouP', 'mia_parent', 'mia_parent', 'mia_parent', 'mia.carters@email.com', '+1-602-555-9983', '210 Desert Ridge Rd, Phoenix, AZ', '2025-11-01 10:16:20.457') ON CONFLICT DO NOTHING;
INSERT INTO public."Parent" (id, username, name, surname, email, phone, address, "createdAt") VALUES ('user_34sB75o0ta1fjetBqakUkmFTtgL', 'william_parent', 'william_parent', 'william_parent', 'william.morris@email.com', '+1-512-555-3349', '19 Sunset Blvd, Austin, TX', '2025-11-01 10:17:09.013') ON CONFLICT DO NOTHING;
INSERT INTO public."Parent" (id, username, name, surname, email, phone, address, "createdAt") VALUES ('user_34sBC7FI4Qu9hUfotqczzmISsU7', 'charlotte_parent', 'charlotte_parent', 'charlotte_parent', 'charlotte.adams@email.com', '+1-720-555-2271', '66 Aspen Grove Ct, Denver, CO', '2025-11-01 10:17:48.531') ON CONFLICT DO NOTHING;
INSERT INTO public."Parent" (id, username, name, surname, email, phone, address, "createdAt") VALUES ('user_34xbQcz1ZrcedngoA4JCFVBtmbK', 'alex_parent', 'alex_parent', 'alex_parent', 'alex_parent@example.com', '123-456-7891', 'alex_parent address', '2025-10-23 00:31:09.34') ON CONFLICT DO NOTHING;


--
-- Data for Name: Student; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Student" (id, username, name, surname, email, phone, address, img, "bloodType", sex, "createdAt", "parentId", "classId", "gradeId", birthday) VALUES ('user_34sBQsAGb31S1ddxcOXj2TRMXPf', 'emmaj', 'Emma', 'Johnson', 'emma.johnsons@email.com', '+1-206-555-7814', '304 Cedar Lane, Seattle, WA', NULL, 'A+', 'FEMALE', '2025-11-01 10:19:45.203', 'user_34sAmCg47BLKTrtBMU16itInjTS', 13, 1, '2025-11-02 00:00:00') ON CONFLICT DO NOTHING;
INSERT INTO public."Student" (id, username, name, surname, email, phone, address, img, "bloodType", sex, "createdAt", "parentId", "classId", "gradeId", birthday) VALUES ('user_34sBciaCUfZPoB9PPrKGHJzlwTu', 'lucas_student', 'Lucas', 'Hughes', 'lucas.hughess@email.com', '+1-214-555-1297', '88 Elm Street, Dallas, TX', NULL, 'O+', 'MALE', '2025-11-01 10:21:19.103', 'user_34sAur3SNJ9d4HF6PV5FLvwnDva', 14, 3, '2025-11-09 00:00:00') ON CONFLICT DO NOTHING;
INSERT INTO public."Student" (id, username, name, surname, email, phone, address, img, "bloodType", sex, "createdAt", "parentId", "classId", "gradeId", birthday) VALUES ('user_34sBm1pjcKIKpeSWI6klFKsrgOD', 'mia_student', 'Mia', 'Carter', 'mia.carter_student@email.com', '+1-602-555-9983', '210 Desert Ridge Rd, Phoenix, AZ', NULL, 'AB-', 'MALE', '2025-11-01 10:22:34.627', 'user_34sB1991dqz7UfolRAdyOOcwouP', 15, 4, '2025-11-02 00:00:00') ON CONFLICT DO NOTHING;
INSERT INTO public."Student" (id, username, name, surname, email, phone, address, img, "bloodType", sex, "createdAt", "parentId", "classId", "gradeId", birthday) VALUES ('user_34sBvLtEHMEiULedZccLca6wCMq', 'william', 'William', 'Morris', 'william.morris_student@email.com', '+1-512-555-3349', '19 Sunset Blvd, Austin, TX', NULL, 'O-', 'MALE', '2025-11-01 10:23:48.386', 'user_34sB75o0ta1fjetBqakUkmFTtgL', 16, 5, '2025-11-09 00:00:00') ON CONFLICT DO NOTHING;
INSERT INTO public."Student" (id, username, name, surname, email, phone, address, img, "bloodType", sex, "createdAt", "parentId", "classId", "gradeId", birthday) VALUES ('user_34u5Vm44b0Wj70sEPRSDxW2dC87', 'noah_student', 'Noah', 'Wilson', 'noah.wilson@email.com', '+1-587-555-9034', '12 Prairie Ct, Calgary, AB', NULL, 'B-', 'MALE', '2025-11-02 02:30:41.42', 'user_34sAaJuSVl50KfJAbWMsY2BF3qX', 13, 2, '2025-11-02 00:00:00') ON CONFLICT DO NOTHING;
INSERT INTO public."Student" (id, username, name, surname, email, phone, address, img, "bloodType", sex, "createdAt", "parentId", "classId", "gradeId", birthday) VALUES ('user_34sC5YeLNvKZZy2gpPJa5l0qMQg', 'charlotte', 'Charlotte', 'Adams', 'charlotte.adams_student@email.com', '+1-720-555-2271', '66 Aspen Grove Ct, Denver, CO', NULL, 'B+', 'MALE', '2025-11-01 10:25:09.366', 'user_34sBC7FI4Qu9hUfotqczzmISsU7', 17, 6, '2025-11-24 00:00:00') ON CONFLICT DO NOTHING;
INSERT INTO public."Student" (id, username, name, surname, email, phone, address, img, "bloodType", sex, "createdAt", "parentId", "classId", "gradeId", birthday) VALUES ('user_34rnocmZj75FCDLLmLTCDC8rLfM', 'alex', 'Alex', 'Johnson', 'alex.johnson@email.com', '+1-403-555-2145', '742 Evergreen Terrace, Calgary, AB', 'https://res.cloudinary.com/ddhwtpjcf/image/upload/v1761980705/qzkvfxwiuhtjmawh913w.jpg', 'O+', 'FEMALE', '2025-11-01 07:05:33.433', 'user_34xbQcz1ZrcedngoA4JCFVBtmbK', 12, 2, '2025-11-02 00:00:00') ON CONFLICT DO NOTHING;


--
-- Data for Name: Attendance; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Attendance" (id, date, present, "studentId", "lessonId") VALUES (11, '2025-11-02 06:00:00', false, 'user_34rnocmZj75FCDLLmLTCDC8rLfM', 10) ON CONFLICT DO NOTHING;


--
-- Data for Name: Event; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Event" (id, title, description, "startTime", "endTime", "classId") VALUES (9, 'General Event', 'for all', '2025-11-27 07:41:00', '2025-11-28 07:41:00', NULL) ON CONFLICT DO NOTHING;
INSERT INTO public."Event" (id, title, description, "startTime", "endTime", "classId") VALUES (1, 'Event 1', 'Description for Event 1', '2025-10-23 13:31:00', '2025-10-23 14:31:00', 13) ON CONFLICT DO NOTHING;
INSERT INTO public."Event" (id, title, description, "startTime", "endTime", "classId") VALUES (2, 'Event 2', 'Description for Event 2', '2025-10-23 07:31:00', '2025-10-23 08:31:00', 12) ON CONFLICT DO NOTHING;
INSERT INTO public."Event" (id, title, description, "startTime", "endTime", "classId") VALUES (3, 'Event 3', 'Description for Event 3', '2025-10-23 07:31:00', '2025-10-23 08:31:00', 14) ON CONFLICT DO NOTHING;
INSERT INTO public."Event" (id, title, description, "startTime", "endTime", "classId") VALUES (4, 'Event 4', 'Description for Event 4', '2025-10-23 07:31:00', '2025-10-23 08:31:00', 15) ON CONFLICT DO NOTHING;
INSERT INTO public."Event" (id, title, description, "startTime", "endTime", "classId") VALUES (5, 'Event 5', 'Description for Event 5', '2025-10-23 07:31:00', '2025-10-23 08:31:00', 16) ON CONFLICT DO NOTHING;
INSERT INTO public."Event" (id, title, description, "startTime", "endTime", "classId") VALUES (6, 'Event 6', 'desc for event 6', '2025-10-29 07:52:00', '2025-10-30 07:52:00', 17) ON CONFLICT DO NOTHING;


--
-- Data for Name: Exam; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Exam" (id, title, "startTime", "endTime", "lessonId") VALUES (2, 'Exam 2', '2025-10-23 01:31:09.414', '2025-10-23 02:31:09.414', 3) ON CONFLICT DO NOTHING;
INSERT INTO public."Exam" (id, title, "startTime", "endTime", "lessonId") VALUES (3, 'Exam 3', '2025-10-23 01:31:09.416', '2025-10-23 02:31:09.416', 4) ON CONFLICT DO NOTHING;
INSERT INTO public."Exam" (id, title, "startTime", "endTime", "lessonId") VALUES (4, 'Exam 4', '2025-10-23 01:31:09.417', '2025-10-23 02:31:09.417', 5) ON CONFLICT DO NOTHING;
INSERT INTO public."Exam" (id, title, "startTime", "endTime", "lessonId") VALUES (5, 'Exam 5', '2025-10-23 01:31:09.418', '2025-10-23 02:31:09.418', 6) ON CONFLICT DO NOTHING;
INSERT INTO public."Exam" (id, title, "startTime", "endTime", "lessonId") VALUES (6, 'Exam 6', '2025-10-23 01:31:09.418', '2025-10-23 02:31:09.418', 7) ON CONFLICT DO NOTHING;
INSERT INTO public."Exam" (id, title, "startTime", "endTime", "lessonId") VALUES (7, 'Exam 7', '2025-10-23 01:31:09.419', '2025-10-23 02:31:09.419', 8) ON CONFLICT DO NOTHING;
INSERT INTO public."Exam" (id, title, "startTime", "endTime", "lessonId") VALUES (8, 'Exam 8', '2025-10-23 01:31:09.42', '2025-10-23 02:31:09.42', 9) ON CONFLICT DO NOTHING;
INSERT INTO public."Exam" (id, title, "startTime", "endTime", "lessonId") VALUES (9, 'Exam 9', '2025-10-23 01:31:09.421', '2025-10-23 02:31:09.421', 10) ON CONFLICT DO NOTHING;
INSERT INTO public."Exam" (id, title, "startTime", "endTime", "lessonId") VALUES (11, 'Exam 10', '2025-10-21 03:50:00', '2025-10-21 05:50:00', 1) ON CONFLICT DO NOTHING;
INSERT INTO public."Exam" (id, title, "startTime", "endTime", "lessonId") VALUES (1, 'Exam 1', '2025-10-23 07:31:00', '2025-10-23 08:31:00', 1) ON CONFLICT DO NOTHING;


--
-- Data for Name: Result; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Result" (id, score, "examId", "assignmentId", "studentId") VALUES (12, 100, 1, NULL, 'user_34rnocmZj75FCDLLmLTCDC8rLfM') ON CONFLICT DO NOTHING;
INSERT INTO public."Result" (id, score, "examId", "assignmentId", "studentId") VALUES (13, 100, NULL, 1, 'user_34rnocmZj75FCDLLmLTCDC8rLfM') ON CONFLICT DO NOTHING;


--
-- Data for Name: _SubjectToTeacher; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."_SubjectToTeacher" ("A", "B") VALUES (2, 'user_34s0dqxzS2WUU2BQs0wJHKQPcnp') ON CONFLICT DO NOTHING;
INSERT INTO public."_SubjectToTeacher" ("A", "B") VALUES (3, 'user_34s0FsMbyGKiX3w5SunzzB6XRQb') ON CONFLICT DO NOTHING;
INSERT INTO public."_SubjectToTeacher" ("A", "B") VALUES (5, 'user_34rxQFAsJMzL2bSj4z9ZoZq8RU9') ON CONFLICT DO NOTHING;
INSERT INTO public."_SubjectToTeacher" ("A", "B") VALUES (6, 'user_34s0kuEJbL3NNep5fIfxejZRO5q') ON CONFLICT DO NOTHING;
INSERT INTO public."_SubjectToTeacher" ("A", "B") VALUES (7, 'user_34s11USrHhZE36LtsPd1Unpt8ZV') ON CONFLICT DO NOTHING;
INSERT INTO public."_SubjectToTeacher" ("A", "B") VALUES (8, 'user_34s0OFiSjtdH2RdDb9TmJAa8eak') ON CONFLICT DO NOTHING;
INSERT INTO public."_SubjectToTeacher" ("A", "B") VALUES (9, 'user_34s11USrHhZE36LtsPd1Unpt8ZV') ON CONFLICT DO NOTHING;
INSERT INTO public."_SubjectToTeacher" ("A", "B") VALUES (10, 'user_34rxZLM6CVfsMp0YUWtcIXobJGO') ON CONFLICT DO NOTHING;
INSERT INTO public."_SubjectToTeacher" ("A", "B") VALUES (44, 'user_34s0FsMbyGKiX3w5SunzzB6XRQb') ON CONFLICT DO NOTHING;


--
-- Name: Announcement_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Announcement_id_seq"', 8, true);


--
-- Name: Assignment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Assignment_id_seq"', 11, true);


--
-- Name: Attendance_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Attendance_id_seq"', 11, true);


--
-- Name: Class_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Class_id_seq"', 17, true);


--
-- Name: Event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Event_id_seq"', 9, true);


--
-- Name: Exam_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Exam_id_seq"', 14, true);


--
-- Name: Grade_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Grade_id_seq"', 6, true);


--
-- Name: Lesson_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Lesson_id_seq"', 32, true);


--
-- Name: Result_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Result_id_seq"', 13, true);


--
-- Name: Subject_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Subject_id_seq"', 44, true);


--
-- PostgreSQL database dump complete
--

\unrestrict tcHMW1vN0FwyZN52FxK0aqVrrazEftw0MmEiarWfvmvz6Ob3Gmg6DvxpXQ2cCtC

