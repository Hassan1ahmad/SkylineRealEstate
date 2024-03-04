# Skyline Real Estate MERN Stack App

Welcome to Skyline Real Estate, a modern web application built with the MERN (MongoDB, Express.js, React.js, Node.js) stack. Skyline Real Estate allows users to browse various properties available for sale or rent, search for their dream property, and provides a dashboard for sellers to manage their listings.

LIVE at : https://skylinerealestate.netlify.app/

## Features

- **Property Listings**: View all available properties for sale or rent.
- **Search Functionality**: Easily search for properties based on location, price range, size, and other criteria.
- **Seller Dashboard**: Sellers can create an account and access their dashboard.
- **Account Approval**: Sellers' accounts require approval before they can add properties.
- **Property Management**: Sellers can add new properties, view pending, approved, and declined properties.
- **Approval Workflow**: Newly added properties go through an approval process before being displayed on the website.

## Installation

To run Skyline Real Estate locally, follow these steps:

1. Clone the repository:

```
git clone https://github.com/your-username/skyline-real-estate.git
```

2. Navigate to the project directory:

```
cd skyline-real-estate
```

3. Install dependencies for both client and server:

```
cd client
npm install
cd ../server
npm install
```

4. Set up environment variables:

   - Create a `.env` file in the `server` directory.
   - Define the following variables:
     ```
     PORT=5000
     MONGODB_URI=<Your MongoDB connection URI>
     ```

5. Start the development server:

```
cd ../client
npm start
```

6. Open your browser and navigate to `http://localhost:3000` to view the app.

## Technologies Used

- **MongoDB**: Database for storing property and user data.
- **Express.js**: Backend framework for handling HTTP requests.
- **React.js**: Frontend library for building user interfaces.
- **Node.js**: JavaScript runtime for building server-side applications.
- **Tailwind CSS**: CSS framework for responsive design and styling.
- **JWT Authentication**: Securing routes and authenticating users.
- **Axios**: HTTP client for making requests to the server.
- **React Router**: Handling navigation within the app.
- **Mongoose**: MongoDB object modeling tool for Node.js.

## Acknowledgments

Feel free to contribute to the project by submitting bug reports, feature requests, or pull requests. Happy browsing  with Skyline Real Estate! 🏠✨
