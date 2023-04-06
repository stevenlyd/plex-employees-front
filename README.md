# Plexxis Employees

## Overview

Plexxis Employees is a React application created using Create React App with TypeScript. It's designed as a CRUD application to manage an employee list through REST API. 

## Features

- Retrieve employees from a REST API.
- Display employees in a table using React Table and Material UI's table component.
- Create, edit, and delete employees using a pop-up dialog with automatic form validation.
- Search with debounce.
- Cursor-based pagination to avoid potential performance issues with large datasets.
- Add new employees using a pop-up dialog.
## Technologies Used

- React with TypeScript
- Material UI
- Redux
- React Table
- React Hook Form

## Setup

1. Clone the repository to your local machine.

```shell script
git clone https://github.com/stevenlyd/plex-employees-front.git
```
2. Navigate to the project folder, install the required dependencies.
```shell script
npm install
```
3. Create a new `.env` file in the root folder and add the following line to specify the backend API URL.
```.env file
API="<backend-url>/employees"
```
5. Run the application (make sure the backend is already running).
```shell script
npm run start
```
6. The application will run on `http://localhost:3000`
## Application Flow 
1. The main page displays the employee list in a table. You can search  for  specific employees using the search bar. The search functionality includes debounce to improve performance. 
2. To  add a new employee, click the "Add Employee" button. A pop-up dialog will appear, where you can enter the employee information. The form includes automatic validation to ensure the data is entered correctly. 
3. To edit or  delete an existing employee, click on the employee row  in the table. A pop-up dialog will appear, allowing you to edit the employee information or  delete the employee. 
4. The application supports cursor-based pagination to efficiently handle large datasets and avoid potential performance issues. 
## Bonus Features 
- [x] UI mechanisms to edit/update employee data 
- [x] Use React Table






