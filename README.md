## Social Media App

## MIT License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Description

A React-based candidate search web application that fetches and displays GitHub user profiles using the GitHub REST API. Built with Vite, React, TypeScript, and Tailwind CSS for a modern, fast, and responsive user experience.

<img width="960" alt="image" src="https://github.com/user-attachments/assets/49deb334-09f6-4f86-8c16-ac8558ae6ecf" />


## Table of Contents

- [Description](#description)
- [Installation Instructions](#installation-instructions)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation Instructions

### Step 1: Clone the Repository
```bash
git clone [https://github.com/jutalexa2024/candidate-web-app.git](https://github.com/jutalexa2024/homework17.git)
cd homework17
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Set Up Environment Variables
Create a `.env` file in the project root and add your GitHub API token:
```plaintext
VITE_GITHUB_API_TOKEN=your_github_api_token
```

### Step 4: Start the Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173` to view the app.

## Usage
GET Routes:
Demonstrates GET routes for retrieving all users and all thoughts from the API.
Shows GET routes for retrieving a single user and a single thought.
POST, PUT, and DELETE Routes:

Demonstrates how to test POST, PUT, and DELETE routes for users and thoughts using Insomnia.
Friend List Routes:

Demonstrates POST and DELETE routes for adding and removing friends from a user's friend list.
Reactions to Thoughts:

Demonstrates POST and DELETE routes for adding and removing reactions to thoughts.
  

## Features

GET Routes for Users and Thoughts:

When the API's GET routes for users and thoughts are tested in Insomnia, the data for each route is displayed in a well-structured, formatted JSON response.
POST, PUT, and DELETE Routes for Users and Thoughts:

With the POST, PUT, and DELETE routes for users and thoughts, you can:
Create new users and thoughts.
Update existing users and thoughts.
Delete users and thoughts from the database.
POST and DELETE Routes for Reactions and Friend Lists:

With the POST and DELETE routes, you can:
Create and delete reactions to thoughts.
Add and remove friends from a user’s friend list.

## Contributing

### How to Contribute
1. Fork the repository.
2. Clone your forked repository:
   ```bash
   git clone https://github.com/your-username/homeowrk17
   ```
3. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```
4. Make your changes and commit them:
   ```bash
   git add .
   git commit -m "Add your message here"
   ```
5. Push to your fork:
   ```bash
   git push origin feature-name
   ```
6. Open a pull request to the main repository.

### Contribution Guidelines
- Ensure your code adheres to the project's style and conventions.
- Include meaningful commit messages.
- Update documentation if necessary.

## Tests

To verify key functionalities:
1. Run the app locally using `npm run start`.
2. Manually test searching for users, navigation, and API responses.

Automated testing is planned for future updates.

## Questions

If you have any questions, please feel free to reach out:

- GitHub: [jutalexa2024](https://github.com/jutalexa2024)
- Email: [justin@example.com](mailto:justin@example.com)

