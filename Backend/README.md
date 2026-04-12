//Blog App
//Types of Roles : _Author_ _User_ _Admin_
Registration Registration Login
Login Login View Articles
Add article View Articles Block and activate users
View Author Articles Write comments
Edit&Delete Articles

1.Generate package.json file
npm init -y

2.Create .env file

3.Create express application and assign port number
npm i express

4.Connect to database
npm i mongoose

Body parser middleware
To handle invalid path
To handle errors

5.Define schema and model for users and articles
-UserTypeSchema
firstName
lastName
email(unique)
password
role
profileImageUrl
isUserActive

-ArticleSchema
author(reference)
title
category
content
comments
isArticleActive

6.Implement APIs
common APIs
-Registration API
-Login API
-logout API

```

## API Endpoints

### Common APIs

- `POST /auth/users` - Register a new user (role: USER or AUTHOR)
- `POST /auth/login` - Login for all roles
- `GET /auth/logout` - Logout

### User APIs

- `GET /user-api/articles` - View all active articles
- `POST /user-api/articles/:id/comments` - Add comment to an article (requires USER login)

### Author APIs

- `POST /author-api/articles` - Create a new article (requires AUTHOR login)
- `GET /author-api/articles` - View own articles (requires AUTHOR login)
- `PUT /author-api/articles/:id` - Update an article (requires AUTHOR login)
- `DELETE /author-api/articles/:id` - Delete an article (requires AUTHOR login)

### Admin APIs

- `GET /admin-api/articles` - View all articles (requires ADMIN login)
- `GET /admin-api/users` - View all users (requires ADMIN login)
- `PUT /admin-api/users/:id/status` - Block/activate a user (requires ADMIN login)
- `PUT /admin-api/articles/:id/status` - Block/activate an article (requires ADMIN login)

## Models

### User Model

- firstName: String (required)
- lastName: String
- email: String (required, unique)
- password: String (required, hashed)
- role: String (enum: USER, AUTHOR, ADMIN, required)
- profileImageUrl: String
- isUserActive: Boolean (default: true)

### Article Model

- author: ObjectId (ref: users, required)
- title: String (required)
- category: String (required)
- content: String (required)
- comments: Array of {user: ObjectId, comment: String}
- isArticleActive: Boolean (default: true)

## Testing

Use the provided .http files (author-req.http, user-req.http) in VS Code with REST Client extension to test the APIs.

Note: Admin users need to be created manually in the database or add registration for ADMIN role if needed.
```
XSS : cross-site scripting
CSRF : cross-site request forgery