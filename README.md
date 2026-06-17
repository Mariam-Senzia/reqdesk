# Reqdesk

Reqdesk is a request tracking app where users can submit a request through a form, and admins can view, filter, and manage those requests from a dashboard.

**Live Demo:** https://reqdesk.vercel.app

**Admin PIN:** `1234`

## The Flow

- A user lands on the homepage and submits a request (bug report, feature request, feedback, partnership inquiry, or anything else) through the form
- The request is saved to the database and shows up in the admin request list
- The admin view sits behind a simple PIN so it isn't open to anyone who finds the link - the **PIN** is **1234**
- The list can be filtered by status or priority
- Clicking manage request opens a drawer with the full details, where an admin can update its status (New, In Review, Resolved, Rejected)

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Chakra UI
- **Backend:** Python, Flask
- **Database:** PostgreSQL (hosted on Neon)
- **Deployment:** Vercel (frontend), Render (backend)

## Running it locally

### Backend

```bash
cd server
pipenv install
pipenv shell
flask db upgrade
python seed.py
flask run
```

Create a `.env` file in `server/` with your database connection string.

### Frontend

```bash
cd client
npm install
npm run dev
```

By default the frontend points at the deployed backend URL. If you want to run against your local Flask server instead, update the fetch URLs to `http://127.0.0.1:5000`

## What's completed

All required tasks from the brief are complete:

- Request submission form with all required fields
- Request list showing submitted requests
- Status updates (New, In Review, Resolved, Rejected)
- Filtering by status and priority
- Persistent storage in a real database
- Deployed, working version with both frontend and backend live

## Challenges

A day after deployment, the backend started throwing intermittent `psycopg2` SSL connection errors when connecting to PostgreSQL on Neon.

After debugging, I found that idle database connections were being closed and later reused by the application. I resolved the issue by configuring SQLAlchemy to verify and refresh connections before reusing them, which eliminated the deployment issue.

## What I'd improve with more time

- Add proper role-based authentication so admins log in with real credentials instead of a shared PIN.
- Add email notifications,to confirm a request was received and to notify admins of new submissions.
