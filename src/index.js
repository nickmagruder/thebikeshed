import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './redux/store';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component';
import SignInAndSignUpPage from './pages/sign-in-and-up/sign-in-and-up.component';
import CollectionsOverviewWithOutletContext from './components/collections-overview/collections-overview-with-context.component';
import CollectionPageWithOutletContext from './components/collection-item/collection-page-with-context.component';

import './index.css';
import App from './App';

// React 18 uses createRoot instead of ReactDOM.render
const container = document.getElementById('root');
const root = createRoot(container);

// Create a browser router with the App component as the root
const router = createBrowserRouter([
  {
    path: "/",
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
        element: <HomePage />
      },
      {
        path: "shop",
        element: <ShopPage />,
        children: [
          {
            index: true,
            element: <CollectionsOverviewWithOutletContext />
          },
          {
            path: ":collectionId",
            element: <CollectionPageWithOutletContext />
          }
        ]
      },
      {
        path: "checkout",
        element: <CheckoutPage />
      },
      {
        //TODO: build contact page
        path: "contact",
        element: <HomePage />
      },
      {
        path: "signin",
        loader: () => {
          // Access the store directly to get current user state
          const state = store.getState();
          const currentUser = state.user.currentUser;
          
          if (currentUser) {
            return { redirect: true };
          }
          return { redirect: false };
        },
        element: <SignInAndSignUpPage />
      }
    ]
  }
]);

root.render(
  <RouterProvider router={router} />
);
