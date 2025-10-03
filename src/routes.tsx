import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import TeamsPage from './pages/TeamsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [{ index: true, element: <TeamsPage /> }]
  }
]);
