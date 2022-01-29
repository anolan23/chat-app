# auth
This project demonstrates an authentication flow for a typical web app. It allows for register and signIn with email/password or with Google OAuth2.0. Like most modern web applications, I elected not to use server-side sessions. Instead, session state is stored in a jwt within a cookie that is stored client side. For each request, the server will verify the jwt before proceeding with the request.

## Built with
Reactjs,
Nodejs/Express/Passportjs,
PostgresQL,

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
