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
- 9/11 - Converted key files to TypeScript and added type definitions
- 9/16 - Converted Redux store and root reducer to TypeScript
- 9/16 - Converted all Redux files (shop, directory, cart) to TypeScript
- 9/24 - Implemented mobile-first responsive design approach:
  - Converted header component from styled-components to SCSS
  - Added responsive breakpoints (mobile, tablet, desktop)
  - Optimized homepage layout for various screen sizes
  - Adjusted menu-item components for better mobile experience
  - Implemented flexible height calculations based on viewport
  - Created 3-column grid layout for tablet/desktop with 2-per-row large items

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

### 4. TypeScript Conversion

- Converted the project to use TypeScript for improved type safety
- Added tsconfig.json with React-specific configuration
- Created type definition files in src/types/ directory
- Converted key files from JavaScript (.js) to TypeScript (.tsx):
  - src/index.js → src/index.tsx
  - src/App.js → src/App.tsx
- Created dedicated type definition files:
  - redux.types.ts: Redux state and action types
  - firebase.types.ts: Firebase authentication and data types
  - hooks.ts: Type-safe React Redux hooks

### 5. Additional Changes

- Created detailed migration documentation
- Fixed dependency conflicts
- Added helper scripts for managing dependencies
- Created .npmrc with legacy-peer-deps setting

## TypeScript Implementation Details

The TypeScript conversion provides several benefits:

1. **Type Safety** - Catching errors at compile time rather than runtime
2. **Better IDE Support** - Improved autocompletion and documentation
3. **Clearer Interfaces** - Explicit typing of component props and state
4. **Improved Maintainability** - Self-documenting code with type annotations

### Key TypeScript Features Used

- **Generic Types** - For Redux store typing (RootState, AppDispatch)
- **Interfaces** - For defining shape of objects (User, FirebaseUserData)
- **Type Assertions** - For handling Firebase data conversions
- **Type Guards** - For safe handling of null/undefined values
- **Typed Hooks** - Custom hooks with TypeScript support (useAppDispatch, useAppSelector)
- **Enum Types** - For action type constants (UserActionTypes)

### Next Steps

- Continue converting remaining components to TypeScript
- Add more comprehensive type definitions for Redux actions and reducers
- Implement stricter TypeScript configuration as the codebase matures
- Convert SCSS modules to use TypeScript-aware CSS modules
