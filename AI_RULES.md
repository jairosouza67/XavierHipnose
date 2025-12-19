# AI_RULES.md

## Tech Stack

- **Frontend Framework**: React.js for building interactive user interfaces with component-based architecture.
- **Backend Framework**: Node.js with Express.js for server-side logic and API development.
- **Database**: MongoDB for NoSQL data storage, suitable for flexible schemas and scalability.
- **Authentication**: JWT (JSON Web Tokens) for secure user authentication and session management.
- **State Management**: Redux for managing complex application state in the frontend.
- **Styling**: CSS Modules or Styled Components for scoped and maintainable styling.
- **API Communication**: Axios for making HTTP requests to backend services.
- **Deployment**: Docker for containerization and Heroku or AWS for cloud hosting.

## Library Usage Rules

- **React**: Use exclusively for building UI components, handling user interactions, and managing component lifecycle. Avoid using it for server-side rendering unless specified.
- **Express.js**: Use for defining API routes, middleware integration, and handling HTTP requests/responses on the backend. Do not use for frontend logic.
- **MongoDB**: Use for storing and querying user data, application state, and any dynamic content. Reserve for cases where relational databases are not needed; use Mongoose for schema definition and validation.
- **JWT**: Use for token-based authentication in login/signup flows and protecting routes. Implement refresh tokens for long-term sessions.
- **Redux**: Use for global state management in complex apps with multiple components sharing state. Avoid for simple apps; prefer React's useState for local state.
- **Styled Components**: Use for dynamic styling based on props or themes. Use CSS Modules for static styles to prevent global scope issues.
- **Axios**: Use for all API calls to handle promises, interceptors, and error handling. Do not use fetch for consistency unless Axios is unavailable.
- **Docker**: Use for containerizing the application to ensure consistent environments across development, testing, and production. Include multi-stage builds for optimization.