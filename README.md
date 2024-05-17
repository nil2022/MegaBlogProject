# Mega Blog App

## Introduction
This is a Blog app where users can post blogs of their choice.

## Features
- Register
- Login
- Show others posts
- Add post
- Edit post
- Delete post
- Like post
- Comment on post
- View User Profile
- Logout

## How to run locally

Clone/download the repository from Github
```bash
git clone https://github.com/nil2022/MegaBlogProject.git
```

Now install the dependencies by running the following command
```bash
npm install or yarn
```

Provide neccesary environmental variables to run the app properly
```bash
# ALL THE FIELDS ARE MANDATORY
VITE_APPWRITE_URL='YOUR_APPWRITE_URL'
VITE_APPWRITE_PROJECT_ID='YOUR_APPWRITE_PROJECT_ID'
VITE_APPWRITE_DATABASE_ID='YOUR_APPWRITE_DATABASE_ID'
VITE_APPWRITE_COLLECTION_ID='YOUR_APPWRITE_COLLECTION_ID'
VITE_APPWRITE_FEEDBACK_COLLECTION_ID='YOUR_APPWRITE_FEEDBACK_COLLECTION_ID'
VITE_APPWRITE_BUCKET_ID='YOUR_APPWRITE_BUCKET_ID'
VITE_APPWRITE_API_KEY='YOUR_APPWRITE_API_KEY'

VITE_TINYMCE_API_KEY='YOUR_TINYMCE_API_KEY'

VITE_EMAILVERIFICATION_URL='YOUR_EMAILVERIFICATION_URL'
```

Now run the app by running the following command
```bash
npm run dev or yarn dev
```

## Tech Stacks used
- React
- Redux
- Appwrite
- Tailwind
- Vite
- Vercel