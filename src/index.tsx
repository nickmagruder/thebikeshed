// Entry point for the React application.
// Sets up Redux, React Router, and persistence for the app.
// Defines the main route structure using createBrowserRouter and RouterProvider.
import { createRoot } from 'react-dom/client';
import {
  RouterProvider,
  createBrowserRouter,
  LoaderFunction,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './redux/store';
import { PersistedRootState } from './types/redux.types';
import { SignInLoaderResult } from './types/firebase.types';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component';
import SignInAndSignUpPage from './pages/sign-in-and-up/sign-in-and-up.component';
import CollectionsOverviewWithOutletContext from './components/collections-overview/collections-overview-with-context.component';
import CollectionPageWithOutletContext from './components/collection-item/collection-page-with-context.component';

import './index.css';
import App from './App';

// React 19 uses createRoot instead of ReactDOM.render
const container = document.getElementById('root');

// TypeScript safety: ensure container is not null before creating root
if (!container) {
  throw new Error(
    "Root element not found! Add a div with id='root' to your HTML."
  );
}
const root = createRoot(container);

// SignIn page loader function
// Checks if user is authenticated and determines if redirect is needed
const signInLoader = (): SignInLoaderResult => {
  // Access the store directly to get current user state
  const state = store.getState() as PersistedRootState;
  const currentUser = state.user.currentUser;

  if (currentUser) {
    return { redirect: true };
  }
  return { redirect: false };
};

// Define route structure for the app using React Router v7 Data Router API
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'shop',
        element: <ShopPage />,
        children: [
          {
            index: true,
            element: <CollectionsOverviewWithOutletContext />,
          },
          {
            path: ':collectionId',
            element: <CollectionPageWithOutletContext />,
          },
        ],
      },
      {
        path: 'checkout',
        element: <CheckoutPage />,
      },
      {
        //TODO: build contact page
        path: 'contact',
        element: <HomePage />,
      },
      {
        path: 'signin',
        loader: signInLoader as LoaderFunction,
        element: <SignInAndSignUpPage />,
      },
    ],
  },
]);

// Mount the router to the root DOM node
root.render(<RouterProvider router={router} />);

// Export empty object to signal this is a module
export {};
