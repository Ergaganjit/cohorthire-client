# Deployment
App frontend is deployed using Cloudflare pages, and can be accessed at following url: https://cohorthire-client.pages.dev/
App backend is deployed using Cloudflare Workers.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# CohortHire

## Overview

CohortHire is a web application designed to streamline the job application process for employers and candidates. Employers can post job openings and manage applications efficiently. The unique cohort processing feature ensures that applications are reviewed in groups of six, streamlining the candidate selection criteria, ensuring a fair and organized review process.

CohortHire Server -https://github.com/Ergaganjit/cohorthire-server

### Problem

Employers often face challenges in managing large volumes of job applications, leading to inefficiencies and potential oversight of qualified candidates. Job seekers also struggle with the uncertainty of application statuses and delayed responses. This job portal aims to address these issues with a structured cohort-based processing system.

### User Profile

Employers:

HR managers and recruiters looking to hire candidates.
Users who require an efficient system to handle large volumes of applications.
Users who prefer a structured cohort-based approach to review applications.


### Features

Job Posting: Employers can create and publish job listings.
Edit Job Postings: Employers can edit existing job listings.
Delete Job Postings: Employers can delete job listings.
View Job Postings: Employers can view all their job listings.
Employer gets the count of candidates applied for the job. 
Cohort Application Review: Applications are reviewed in groups of six. Employers must process or reject all six applications in the current cohort before moving on to the next set of applications.

Candidates feature: 
View Job Postings: Employers can view all their job listings.
Apply for job:Candidate can apply for the selected job. 



## Implementation

### Tech Stack

Frontend: React.js
Backend:Cloudflare worker and pages
Database: D1 database in Cloudflare
Authentication: JSON Web Tokens (JWT)
Hosting: Cloudflare


### Sitemap

As a single-page application, navigation between different views will be handled on the client-side without full-page reloads.

Home View: Introduction and navigation.
Employer Dashboard View: Company profile, job postings, cohort-based application processing, and application management(CRUD)
Candidate Dashboard: Register, Apply for job, View available jobs.

### Mockups

Provide visuals of your app's screens. You can use tools like Figma or pictures of hand-drawn sketches.

![alt text](image-1.png)

### Data

Jobs Table:
id INTEGER PRIMARY KEY AUTOINCREMENT,
  jobTitle TEXT NOT NULL,
  company TEXT NOT NULL,
  numberOfOpenings INTEGER NOT NULL,
  country TEXT NOT NULL,
  language TEXT NOT NULL,
  location TEXT NOT NULL,
  jobType TEXT NOT NULL,
  schedule TEXT NOT NULL,
  pay TEXT NOT NULL,
  supplementalPay TEXT,
  benefits TEXT,
  jobDescription TEXT NOT NULL,
  applicationMethod TEXT NOT NULL,
  requireResume INTEGER NOT NULL,
  applicationUpdates INTEGER NOT NULL,
  candidatesContactEmail TEXT NOT NULL,
  applicationDeadline DATE NOT NULL,
  candidatesContactPhone TEXT NOT NULL,
  flexibleLanguageRequirement INTEGER NOT NULL,
  hiringTimeline TEXT NOT NULL,
  expectedStartDate DATE NOT NULL,
  sponsorship INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

  Candidates:

  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  resume TEXT,
  coverLetter TEXT,
  applicationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'applied'

### Endpoints

Job Postings:
POST /employer/job/new: Create a new job posting.
GET employer/jobs: Retrieve all job postings.
GET employer/jobs/:id: Retrieve a specific job posting.
PUT employer/jobs/:id: Update a specific job posting.
DELETE employer/jobs/:id: Delete a specific job posting.

Candidates portal:
POST /post-candidate: Create a new job posting.
GET candiate/jobs: Retrieve all job postings.
GET candidate/jobs/:id: Retrieve a specific job posting.

## Roadmap

Week 1 (May 28 - June 2)
Set up project structure and environment.
Develop backend endpoints for job postings (create, read, update, delete).
Implement employer profile management.

Week 2 (June 3 - June 8)
Implement job postings management in the frontend.
Develop cohort-based application processing logic in the backend.

Week 3 (June 9)
Finalize application review process in the frontend.
Perform testing and bug fixing.
Prepare documentation and final presentation.
Deploy the application.

## Nice-to-haves

Login/sign up for employer
Integration with LinkedIn API for job data.
Notifications for employers when new applications are received.
Enhanced analytics for job postings and application statuses.
Resume parsing to automatically extract information from uploaded resumes.

