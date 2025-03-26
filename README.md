# Nexora Verse - Frontend 🚀

A modern social media platform frontend built with React, Redux, and TypeScript. Connect with friends, share posts, and interact in real-time.

## Project Overview

Nexora Verse is a full-stack social media application inspired by platforms like Bluesky and X. This repository contains the frontend implementation built with modern web technologies. The backend repository can be found [here](https://github.com/oxamyt/nexora-verse-backend).

🚀 [Try it Live](https://nexora-verse.netlify.app/) 🚀

## Screenshots

**Home Feed Interface**  
![Home Feed](https://res.cloudinary.com/dehoidlo0/image/upload/v1742149302/nexora%20images/zodu8pgucvhvh4cqmiji.png)

**User Profile Page**  
![User Profile](https://res.cloudinary.com/dehoidlo0/image/upload/v1742149301/nexora%20images/poahietxrf65nfujukko.png)

**Live Chat Feature**  
![Chat Interface](https://res.cloudinary.com/dehoidlo0/image/upload/v1742149301/nexora%20images/be6icix0tyqa3xgrfdtg.png)

## Features

### Core Features

- **Authentication**

  - GitHub OAuth login
  - JWT authentication
  - Guest login functionality
  - Protected routes

- **Posts**

  - Create/Edit/Delete text posts
  - Image uploads for posts (Cloudinary integration)
  - Filter posts (All/Following)
  - Like/Unlike posts
  - Comments posts

- **User Interactions**

  - Follow/Unfollow users
  - Direct messaging with live chat (Socket.io)
  - User search by username
  - Profile customization

- **UI/UX**
  - Responsive design
  - Animated transitions (Motion library)
  - Loading states & error handling
  - Accessible components

## Technologies Used

- **Frontend Framework**: React + TypeScript
- **State Management**: Redux Toolkit
- **UI Library**: shadcn/ui + Radix UI Primitives
- **Styling**: Tailwind CSS
- **Animation**: Motion
- **Real-Time**: Socket.IO client
- **Form Handling**: React Hook Form + Zod validation
- **Testing**: Vitest + React Testing Library
- **Build Tool**: Vite

### Clone the repository
```sh
git clone https://github.com/oxamyt/nexora-verse-frontend.git
```

### Navigate to the project folder
```sh
cd nexora-verse-frontend
```

### Install dependencies
```sh
npm install
```

### Start the development server
```sh
npm run dev
```

### Run tests
```sh
npm run test
```
