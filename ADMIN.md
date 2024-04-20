***[BACK](README.md)***

### Admin Service

1. **Login**
   - **HTTP Method:** POST
   - **Endpoint:** `/login`
   - **Description:** Logs in an admin user.
   - **Request Body:**
     - `username`: String (admin username)
     - `password`: String (admin password)
   - **Response:** Returns a JSON object containing admin information and a JWT token.

2. **Change Password**
   - **HTTP Method:** PUT
   - **Endpoint:** `/change-password`
   - **Description:** Changes the password of an admin user.
   - **Request Body:**
     - `new_password`: String (new password)
   - **Response:** Returns a JSON object indicating the success of the operation.

3. **Update Profile**
   - **HTTP Method:** PUT
   - **Endpoint:** `/update`
   - **Description:** Updates the profile information of an admin user.
   - **Request Body:**
     - `name`: String (admin name)
     - `username`: String (admin username)
   - **Response:** Returns a JSON object indicating the success of the operation.

### Authentication

- Authentication is required for changing password and updating profile information.
- Admin users must be authenticated before accessing these endpoints.