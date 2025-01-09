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

**Response:**
- **201 Created**
  ```json
  {
    "id": "integer",
    "username": "string",
    "email": "string",
    "message": "User created successfully."
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
curl --location 'http://localhost:8000/api/user/sign-up' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"abhyudayadev123@gmail.com",
    "password":"Abhyudaya@2002",
    "name":"Abhyudaya",
    "role":"ADMIN"
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

