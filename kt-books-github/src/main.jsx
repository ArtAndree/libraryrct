import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Root, { loader as rootLoader, action as rootAction } from './routes/root.jsx';
import Book, { loader as bookLoader } from './routes/book.jsx';
import { action as deleteAction } from './routes/delete.jsx';
import ErrorPage from './routes/error-page.jsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    loader: rootLoader,
    action: rootAction,
    errorElement: <ErrorPage />,
    hydrateFallbackElement: <p>Загрузка...</p>,
    children: [
      {
        // Эта граница ошибок сохраняет меню при ошибке загрузки книги.
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <p>Выберите книгу из списка</p> },
          { path: 'books/:bookId', element: <Book />, loader: bookLoader },
          { path: 'books/:bookId/delete', action: deleteAction },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
