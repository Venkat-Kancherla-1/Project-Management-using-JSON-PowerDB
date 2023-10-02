# Project Management Form

## Description
This web-based HTML form is designed for project management using JsonPowerDB as the database. JsonPowerDB is used to perform CRUD (Create, Read, Update, Delete) operations for project records.

## Benefits of Using JsonPowerDB
- **Simplicity**: JsonPowerDB is a straightforward and easy-to-use real-time database.
- **JSON Format**: It simplifies data retrieval in JSON format.
- **No Backend Code**: You don't need to write complex backend code for database operations.
- **Schemaless**: There's no need to define a fixed schema for your data.
- **Querying Made Easy**: JsonPowerDB provides an intuitive wassignDateay to query the database without requiring knowledge of SQL commands.

## Illustrations
### Update
- If a project id already exists in the database, the project's information is retrieved from the database and populated in the respective form fields. Users can then update the project's information.

### Save
- If a project's id does not exist in the database, users can enter the project's information in the form and save it to the database.

### Clear
- The "Clear" button allows users to reset all fields of the form. Note that all fields, except for the first one, are disabled until the user enters a valid project id.

### Alert
- The website features a user-friendly alert system using Bootstrap for displaying messages, such as success messages after saving or updating data, or warning messages for invalid inputs.

## Usage
1. Open the web page and focus on the "Project ID" field.
2. Enter a valid project ID:
   - If the project ID exists in the database, the form will be populated with the project's details, allowing for updates.
   - If the project ID is not found, the form will be ready for new data entry.
3. Fill in or update the project details, including project name, assigned to, assignment date, and deadline.
4. Click the "Save" button to save the data or the "Update" button to update existing data.
5. Use the "Reset" button to clear all fields and start over.

Feel free to explore and use this simple project management form with JsonPowerDB as the backend database.

## Getting Started

To use this Project Management Form with JsonPowerDB, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/Venkat-Kancherla-1/Project-Management-using-JSON-PowerDB.git
   ```

2. Open the project folder.

3. Ensure you have a stable internet connection for accessing the required libraries and resources.

4. Open the `index.html` file in a web browser or deploy it to a web server.

5. Use the form as described in the previous section to save and update project records.

6. Customize the form and styles as needed for your specific use case.

## Requirements

- A modern web browser (Google Chrome, Mozilla Firefox, Safari, etc.) to run the HTML form.
- An internet connection to access the required libraries and resources.
- Basic knowledge of HTML, CSS, and JavaScript for further customization.

## Contributing

If you'd like to contribute to this project, please follow these guidelines:

1. Fork the repository on GitHub.

2. Make your changes and improvements.

3. Ensure your code follows best practices, is well-documented, and is free of errors or bugs.

4. Create a pull request with a clear description of your changes and the problem they solve.

## Acknowledgments

- Thanks to JsonPowerDB for providing a simple and efficient database solution.
- Bootstrap for the alert system.
- Any other libraries or resources used in this project (check the HTML code for references).

## Contact

If you have any questions or suggestions, feel free to contact the project maintainer:

- [Kancherla Devi Sri Venkat](https://github.com/Venkat-Kancherla-1)
