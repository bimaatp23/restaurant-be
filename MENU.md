***[BACK](README.md)***

### Menu Service

1. **Get Menu**
   - **HTTP Method:** GET
   - **Endpoint:** `/`
   - **Description:** Retrieves a list of menus.
   - **Response:** Returns a JSON object containing the menu list.

2. **Create Menu**
   - **HTTP Method:** POST
   - **Endpoint:** `/`
   - **Description:** Creates a new menu.
   - **Request Body:**
     - `name`: String (name of the menu)
     - `description`: String (description of the menu)
     - `price`: Number (price of the menu)
     - `image`: String (base64 encoded image of the menu)
   - **Response:** Returns a JSON object indicating the success of the operation.

3. **Update Menu**
   - **HTTP Method:** PUT
   - **Endpoint:** `/:id`
   - **Description:** Updates an existing menu.
   - **Path Parameters:**
     - `id`: String (ID of the menu to be updated)
   - **Request Body:**
     - `name`: String (name of the menu)
     - `description`: String (description of the menu)
     - `price`: Number (price of the menu)
     - `image`: String (base64 encoded image of the menu)
   - **Response:** Returns a JSON object indicating the success of the operation.

4. **Delete Menu**
   - **HTTP Method:** DELETE
   - **Endpoint:** `/:id`
   - **Description:** Deletes an existing menu.
   - **Path Parameters:**
     - `id`: String (ID of the menu to be deleted)
   - **Response:** Returns a JSON object indicating the success of the operation.

### Authentication

- Authentication is required for creating, updating, and deleting menus.
- Only users with the role of admin are allowed to perform these actions.