import React from 'react';
import { useRouteError } from 'react-router';

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <section className="error-page">
      <h2>Ой!</h2>
      <p>{error.statusText || error.message}</p>
    </section>
  );
}
