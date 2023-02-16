import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import ErrorBoundary from "./components/business/ErrorBoundary";

const HomePage = lazy(() => import("./pages/home"));
const PostsPage = lazy(() => import("./pages/posts"));
const SimplePage = lazy(() => import("./pages/simple"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/posts",
    element: <PostsPage />,
  },
  {
    path: "/simple",
    element: <SimplePage />,
  },
]);

export const cache: any = {};

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="App">
          <RouterProvider router={router} />
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
