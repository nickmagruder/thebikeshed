# ecommerce app

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

### Production Deployment on Heroku-24

This project is configured for deployment on Heroku-24 stack, which uses environment variables (config vars) instead of .env files:

1. Create a new Heroku app or use an existing one with the Heroku-24 stack:
```bash
heroku create your-app-name --stack heroku-24
```

2. Set your Firebase configuration as Heroku config vars:
```bash
heroku config:set REACT_APP_FIREBASE_API_KEY=your_api_key
heroku config:set REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
heroku config:set REACT_APP_FIREBASE_PROJECT_ID=your_project_id
heroku config:set REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
heroku config:set REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
heroku config:set REACT_APP_FIREBASE_APP_ID=your_app_id
heroku config:set REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

3. Or set multiple config vars at once using the Heroku Dashboard:
   - Go to your app dashboard on Heroku
   - Navigate to Settings
   - Click "Reveal Config Vars"
   - Add each environment variable with its value

4. Deploy your application:
```bash
git push heroku main
```

#### Important Notes for Heroku-24

- Heroku-24 requires Node.js 20 or newer (our package.json is configured for this)
- The application uses the `heroku-postbuild` script to build the React app
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


  
  
## Change Log

- 6/30 - 3:21 - React App Created + homepage started
- 7/2 - 1:56 - Menu item styling/animations added
- 7/9 6:40pm - Started building routes - Hats route created
- 7/19 11:22pm - Collection preview component created
- 7/24 - Shop page and sign-in/up started

- 10/7 - Local images added
- 10/8 - Sign in component built, custom button
- 10/12 - Sign-in & Sign Up completed
- 10/13 - Redux Started

### 2025
- 9/9 - Added comprehensive documentation comments to component files (checkout, collection, homepage, shop, and sign-in-and-up components)
- 9/9 - Moved Firebase configuration to environment variables for improved security
- 9/9 - Updated deployment configuration for Heroku with config vars
