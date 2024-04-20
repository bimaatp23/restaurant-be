### Customer Service

1. **Login**
   - **HTTP Method:** POST
   - **Endpoint:** `/login`
   - **Description:** Logs in a customer.
   - **Request Body:**
     - `username`: String (customer username)
     - `password`: String (customer password)
   - **Response:** Returns a JSON object containing customer information and a JWT token.

2. **Register**
   - **HTTP Method:** POST
   - **Endpoint:** `/register`
   - **Description:** Registers a new customer.
   - **Request Body:**
     - `name`: String (customer name)
     - `username`: String (customer username)
     - `password`: String (customer password)
   - **Response:** Returns a JSON object indicating the success of the operation.

3. **Change Password**
   - **HTTP Method:** PUT
   - **Endpoint:** `/change-password`
   - **Description:** Changes the password of a customer.
   - **Request Body:**
     - `new_password`: String (new password)
   - **Response:** Returns a JSON object indicating the success of the operation.

4. **Update Profile**
   - **HTTP Method:** PUT
   - **Endpoint:** `/update`
   - **Description:** Updates the profile information of a customer.
   - **Request Body:**
     - `name`: String (customer name)
     - `username`: String (customer username)
   - **Response:** Returns a JSON object indicating the success of the operation.

### Authentication

- Authentication is required for changing password and updating profile information.
- Customers must be authenticated before accessing these endpoints.