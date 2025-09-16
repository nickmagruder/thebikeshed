# The Bike Shed

## Package Updates (September 2025)

This project's packages have been updated to stable compatible versions as of September 2025. Major updates include:

- React 19 (from React 17)
- React Router 6 (from v5)
- React-Redux 8 (from v7)
- Firebase 10 (from v9)
- Styled-Components 6 (from v5)
- Sass (replacing deprecated node-sass)
- Node 24 (from 20)
- npm 11 (from 10)

## Environment Setup

This project uses environment variables to store sensitive information such as Firebase API keys.

### Local Development

1. Copy `.env.example` to `.env.development` for local development:
```bash
cp .env.example .env.development
```

2. Fill in your Firebase configuration values in the `.env.development` file.

3. Start the development server:
```bash
npm start
```

### Production Deployment on Heroku-24 with Nginx

This project is configured for deployment on Heroku-24 stack using the Nginx buildpack, which provides improved performance, security headers, and enhanced routing:

1. Create a new Heroku app with the Heroku-24 stack:
```bash
heroku create your-app-name --stack heroku-24
```

2. Add the Nginx buildpack to your Heroku app:
```bash
heroku buildpacks:add heroku/nodejs
heroku buildpacks:add https://github.com/heroku/heroku-buildpack-nginx
```

3. Set your Firebase configuration as Heroku config vars:
```bash
heroku config:set REACT_APP_FIREBASE_API_KEY=your_api_key
heroku config:set REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
heroku config:set REACT_APP_FIREBASE_PROJECT_ID=your_project_id
heroku config:set REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
heroku config:set REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
heroku config:set REACT_APP_FIREBASE_APP_ID=your_app_id
heroku config:set REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

4. Or set multiple config vars at once using the Heroku Dashboard:
   - Go to your app dashboard on Heroku
   - Navigate to Settings
   - Click "Reveal Config Vars"
   - Add each environment variable with its value

5. Deploy your application:
```bash
git push heroku main
```

#### Nginx Configuration

The application uses a `static.json` file to configure Nginx:
- Routes all requests to index.html for single page app functionality
- Enforces HTTPS for all connections
- Sets security headers (Content-Security-Policy, X-Frame-Options, etc.)
- Enables clean URLs without .html extensions

#### Important Notes for Heroku-24

- Heroku-24 requires Node.js 20 or newer (our package.json is configured for this)
- The application uses the `heroku-postbuild` script to build the React app
- The Procfile is set to use `bin/start-nginx-static` from the Nginx buildpack
- Config vars can be updated without redeploying the application
- Config vars are automatically available as environment variables to your application
- Use `heroku logs --tail` to monitor your application and check for any environment variable issues

### Important Notes for Environment Variables

- All environment variables must be prefixed with `REACT_APP_` to be accessible in the React application
- Environment variables are loaded when the server starts; changes require a restart
- In development, if you modify `.env.development`, restart with `npm start`
- In production on Heroku, updating config vars doesn't require a full redeploy
- If you encounter Firebase initialization errors, check that your environment variables are correctly set

## Photo Credits
- Adventure Bikes Photo by <a href="https://unsplash.com/@worldsbetweenlines?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Patrick Hendry</a> on <a href="https://unsplash.com/s/photos/bikepacking?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  
- City Bikes Photo by <a href="https://unsplash.com/@studiomedia?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Alexa Suter</a> on <a href="https://unsplash.com/s/photos/woman-bicycle?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

- Accessories Photo by <a href="https://unsplash.com/@xokvictor?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Viktor Bystrov</a> on <a href="https://unsplash.com/s/photos/bicycle-cap?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>


  
  
# Change Log

- 6/30 - 3:21 - React App Created + homepage started
- 7/2 - 1:56 - Menu item styling/animations added
- 7/9 6:40pm - Started building routes - Hats route created
- 7/19 11:22pm - Collection preview component created
- 7/24 - Shop page and sign-in/up started

- 10/7 - Local images added
- 10/8 - Sign in component built, custom button
- 10/12 - Sign-in & Sign Up completed
- 10/13 - Redux Started

# 2025
- 9/9 - Added comprehensive documentation comments to component files (checkout, collection, homepage, shop, and sign-in-and-up components)
- 9/9 - Moved Firebase configuration to environment variables for improved security
- 9/9 - Updated deployment configuration for Heroku with config vars
- 9/9 - Updated all npm packages to latest versions (React 18, Redux 5, Firebase 10, and more)
- 9/10 - Updated React Router from v6 to v7 with Data Router API
- 9/10 - Implemented Heroku Nginx buildpack with security headers and optimized configuration

## 9/10 Package Update Summary
We have successfully updated and migrated the ecommerce application to use newer package versions. Here's a summary of the changes made:

### 1. Updated Packages

- React: 17.x → 19.1.0
- React Router: 5.x → 7.8.2
- React Redux: 7.x → 8.1.1
- Redux: 4.2.1 → 5.0.1
- React Dom: 18.2.0 → 19.1.1
- Firebase: 9.1.2 → 10.1.0
- Styled Components: 5.x → 6.0.7
- node-sass → sass
- npm: 10.x → 11.x
- Node.js: 20.x → 24.x

### 2. Code Migration

#### React 19
- Updated index.js to use the new `createRoot` API
- Removed ReactDOM.render in favor of createRoot.render

#### React Router v7
- Implemented Data Router API with createBrowserRouter
- Used RouterProvider instead of BrowserRouter
- Replaced Route component hierarchy with object-based route definitions
- Created nested routes with children array
- Leveraged Outlet and OutletContext for context passing
- Used loader functions for data prefetching and protected routes
- Implemented useOutletContext, useLoaderData, and useParams hooks

#### Redux
- Fixed middleware configuration
- Added thunk middleware correctly
- Fixed duplicate logger middleware issue

#### Firebase
- No changes needed as we're using the Firebase compat API

### 3. Heroku Configuration

- Implemented Nginx buildpack for improved performance and security
- Added static.json file with security headers and SPA routing
- Updated Procfile to use Nginx for serving static assets
- Configured Content-Security-Policy and other security headers
- Enforced HTTPS connections

### 4. Additional Changes

- Created detailed migration documentation
- Fixed dependency conflicts
- Added helper scripts for managing dependencies
- Created .npmrc with legacy-peer-deps setting
