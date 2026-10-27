import React, { useEffect } from 'react';
import { Form, NavLink, Outlet, redirect, useLoaderData, useNavigation } from 'react-router';
import { createBook, getBooks } from '../storage.js';

export async function loader() {
  const books = await getBooks();
  return { books };
}

export async function action({ request }) {
  const formData = await request.formData();
  const values = Object.fromEntries(formData);
  const book = await createBook({
    title: values.title.trim(),
    author: values.author.trim(),
    year: Number(values.year),
  });
  return redirect(`/books/${book.id}`);
}

export default function Root() {
  const { books } = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  useEffect(() => {
    document.title = `Книг: ${books.length}`;
  }, [books.length]);

  return (
    <div className="library">
      <header>
        <h1>Библиотека</h1>
        <p>Список книг и сведения о них</p>
      </header>
      <div className="layout">
        <nav aria-label="Книги">
          <h2>Добавить книгу</h2>
          <Form method="post" action="/" className="add-form">
            <label>Название<input name="title" required /></label>
            <label>Автор<input name="author" required /></label>
            <label>Год<input name="year" type="number" step="1" required /></label>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Добавляем...' : 'Добавить'}
            </button>
          </Form>
          <h2>Книги</h2>
          {books.length === 0 ? (
            <p>Книг пока нет</p>
          ) : (
            <ul className="book-list">
              {books.map((book) => (
                <li key={book.id}>
                  <NavLink
                    to={`/books/${book.id}`}
                    className={({ isActive, isPending }) =>
                      [isActive && 'active', isPending && 'pending'].filter(Boolean).join(' ')
                    }
                  >
                    {book.title} — {book.author}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </nav>
        <main><Outlet /></main>
      </div>
    </div>
  );
}
