***[BACK](README.md)***

### Order Service

1. **Get Order**
   - **HTTP Method:** GET
   - **Endpoint:** `/`
   - **Description:** Retrieves a list of orders.
   - **Response:** Returns a JSON object containing the list of orders.

2. **Create Order**
   - **HTTP Method:** POST
   - **Endpoint:** `/`
   - **Description:** Creates a new order.
   - **Request Body:**
     - `total`: String (total amount of the order)
     - `items`: String (JSON array string containing order items)
   - **Response:** Returns a JSON object indicating the success of the operation.

3. **Process Order**
   - **HTTP Method:** PUT
   - **Endpoint:** `/process/:id`
   - **Description:** Marks an order as being processed.
   - **Path Parameters:**
     - `id`: String (ID of the order to be processed)
   - **Response:** Returns a JSON object indicating the success of the operation.

4. **Done Order**
   - **HTTP Method:** PUT
   - **Endpoint:** `/done/:id`
   - **Description:** Marks an order as completed.
   - **Path Parameters:**
     - `id`: String (ID of the order to be marked as done)
   - **Response:** Returns a JSON object indicating the success of the operation.

### Authentication

- Authentication is required for retrieving, creating, processing, and completing orders.
- Customers are only allowed to create orders, while admins are allowed to process and complete orders.