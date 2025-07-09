# Chic Threads - E-commerce Store

This is a Next.js e-commerce application built with Firebase and styled with ShadCN UI and Tailwind CSS.

## Features

- User authentication (Email/Password & Google)
- Browse and view product listings
- Add products to a shopping cart
- Logged-in users can add new products
- AI-powered product recommendations

## Getting Started

To get the project up and running on your local machine, follow these steps.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 20 or later recommended)
- [npm](https://www.npmjs.com/) or a compatible package manager
- A [Firebase project](https://firebase.google.com/)

### 1. Set Up Your Firebase Project

1.  Go to the [Firebase console](https://console.firebase.google.com/) and create a new project.
2.  Add a new Web App to your project.
3.  In the Authentication section, enable the "Email/Password" and "Google" sign-in providers.
4.  In the Firestore Database section, create a database and start it in production mode.
5.  In the Storage section, create a storage bucket.

### 2. Installation and Setup

After downloading the project code, navigate to the project directory in your terminal.

Install the project dependencies by running:

```bash
npm install
```

### 3. Configure Environment Variables

Create a new file named `.env` in the root of your project. Copy the Firebase configuration details from your Firebase project's settings (Project settings > General > Your apps > SDK setup and configuration > Config).

Your `.env` file should look like this:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Run the Development Server

To start the Next.js application, run the following command:

```bash
npm run dev
```

The application should now be running at `http://localhost:9002`.

### 5. Running the AI Features (Genkit)

The AI product recommendation feature runs in a separate process. To start it, open a new terminal window in the project directory and run:

```bash
npm run genkit:dev
```

This will start the Genkit development server, allowing the main application to communicate with the AI flow.
