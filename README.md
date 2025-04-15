# AUTH API Documentatio

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
For Registering shop(ShopKeeper Side)  user account.

**Request Body:**
```json
{
  "shopName": "The Tech Shop",
  "address": "123 Tech Street, Silicon Valley",
  "tradeName": "Tech Solutions",
  "gstNumber": "GST123456789",
  "panNumber": "PAN123456",
  "foodLicense": "FL123456789",
  "phone": "9876543210",
  "userId":2
}
```

**Response:**
- **201 Created**
  ```json
  {
    "success": "boolean",
    "message":"string",
    "data": "object"
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
curl --location 'http://localhost:8000/api/shopkeeper/shop/register' \
--header 'Content-Type: application/json' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiaHl1ZGF5YWRldjEyM0BnbWFpbC5jb20iLCJpZCI6MSwibmFtZSI6IkFiaHl1ZGF5YSIsImlhdCI6MTczNjU3MjQ0MCwiZXhwIjoxNzM2NjA4NDQwfQ.nCqcgG3kOAPj_Itq1r6Y0ewkllZcEWxoKOYuH2oVzCM' \
--data '{
  "shopName": "The Tech Shop",
  "address": "123 Tech Street, Silicon Valley",
  "tradeName": "Tech Solutions",
  "gstNumber": "GST123456789",
  "panNumber": "PAN123456",
  "foodLicense": "FL123456789",
  "phone": "9876543210",
  "userId":2
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

