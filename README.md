# AUTH API Documentation

## Overview
This documentation outlines the endpoints and usage of the AUTH API. This API is designed to handle user authentication and management operations.

---

## Base URL
`http://localhost:8000/api/user`

---

## Endpoints

### 1. **Create User**
**Endpoint:**
```
POST /sign-up
POST /sign-in
```
**Description:**
Creates a new user account.

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```
For Sign-In  user account.

**Request Body:**
```json
{

  "email": "string",
  "password": "string"
}
```

**Response:**
- **201 Created**
  ```json
  {
    "token": "string",
    "userData":"object",
    "message": "User LogedIn successfully."
  }
  ```
- **400 Bad Request**
  ```json
  {
    "error": "string"
  }
  ```

**Example Request:**
```bash
curl --location 'http://localhost:8000/api/user/sign-in' \
--header 'Content-Type: application/json' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiaHl1ZGF5YWRldjEyM0BnbWFpbC5jb20iLCJpZCI6MSwibmFtZSI6IkFiaHl1ZGF5YSIsImlhdCI6MTczNjQ5MzM1MiwiZXhwIjoxNzM2NTI5MzUyfQ.O3aXrTpk3yJye5nsHJ4slW5-lu9MBV1HiljrKFLh9Ik' \
--data-raw '{
    "email":"abhyudayadev123@gmail.com",
    "password":"Abhyudaya@2002"
}'
```

---

## Notes
1. Ensure all fields in the request body are provided and valid.
2. Use secure passwords to enhance account safety.

---

## Future Enhancements
- Add endpoints for login, password reset, and user management.
- Integrate OAuth for third-party authentication.
- Implement email verification on sign-up.

---

## Contact
For further support or queries, please contact the API development team at `abhyudayadev123@gmail.com`.

