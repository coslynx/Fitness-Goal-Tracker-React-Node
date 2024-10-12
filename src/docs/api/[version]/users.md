# users API documentation

## GET /users

### Description:
Retrieves a list of all users in the system.

### Request:
- Method: GET
- URL: /users
- Query Parameters:
    - `page`: (optional) The page number to retrieve.
    - `limit`: (optional) The maximum number of users to return per page.
    - `filter`: (optional) A JSON object specifying filter criteria for the users.

### Response:
- Status Code: 200 OK
- Body:
    - `users`: An array of user objects containing basic user information (e.g., ID, email, name).
    - `meta`: An object containing pagination metadata (e.g., current page, total pages).

## GET /users/:id

### Description:
Retrieves a specific user by their unique ID.

### Request:
- Method: GET
- URL: /users/:id
- URL Parameters:
    - `id`: The unique ID of the user to retrieve.

### Response:
- Status Code: 200 OK
- Body:
    - `user`: A user object containing detailed information about the user.

## POST /users

### Description:
Creates a new user account.

### Request:
- Method: POST
- URL: /users
- Body:
    - `email`: The user's email address.
    - `password`: The user's password.
    - `name`: The user's name.

### Response:
- Status Code: 201 Created
- Body:
    - `user`: The newly created user object.

## PUT /users/:id

### Description:
Updates a user's details.

### Request:
- Method: PUT
- URL: /users/:id
- URL Parameters:
    - `id`: The unique ID of the user to update.
- Body:
    - `email`: (optional) The new email address.
    - `password`: (optional) The new password.
    - `name`: (optional) The new name.

### Response:
- Status Code: 200 OK
- Body:
    - `user`: The updated user object.

## DELETE /users/:id

### Description:
Deletes a user account.

### Request:
- Method: DELETE
- URL: /users/:id
- URL Parameters:
    - `id`: The unique ID of the user to delete.

### Response:
- Status Code: 204 No Content
- Body: (empty)