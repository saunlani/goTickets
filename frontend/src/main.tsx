import React from 'react';
import App from './App';
import './index.css';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';

const queryClient = new QueryClient();
const root = createRoot(document.getElementById('root') as HTMLElement);

async function renderApp() {
  if (import.meta.env.MODE === 'testing') {
    const { worker } = await import('./mocks/browser');
    await worker.start();
  }
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>,
  );
}
await renderApp();