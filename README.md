# Job Portal

A modern React + Vite job portal UI that lets users browse jobs, search by role, filter by job type, save jobs, and view full job details in a modal.

## Features

- Browse curated job cards in a responsive grid
- Search jobs by role/title
- Filter jobs by type: All, Full-time, Part-time, Remote
- Save and unsave jobs
- Toggle between All Jobs and Saved Jobs
- View complete job details in a modal
- Animated, glassmorphism-inspired dark interface

## Tech Stack

- React 19
- Vite 8
- ESLint 9
- Plain CSS (custom styles and animations)

## Project Structure

```text
job-portal/
	public/
	src/
		assets/
		App.jsx
		App.css
		index.css
		main.jsx
	index.html
	package.json
	vite.config.js
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

By default, Vite starts at:

- http://localhost:5173

### 3. Build for production

```bash
npm run build
```

### 4. Preview production build

```bash
npm run preview
```

### 5. Lint the project

```bash
npm run lint
```

## Data Source

Job listings are currently generated from:

- https://jsonplaceholder.typicode.com/posts

The app maps post data into job-like records for demo purposes.

## Future Improvements

- Connect to a real jobs API
- Add pagination or infinite scroll
- Add authentication for personalized saved jobs
- Add sorting by newest/relevance
- Add apply flow with external links or internal forms
