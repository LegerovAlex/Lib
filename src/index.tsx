import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { App } from "@/components/App/App";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";

const AboutLazy = lazy(() => import("@/pages/About/About"));
const ShopLazy = lazy(() => import("@/pages/Shop/Shop"));

let router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/about",
        element: (
          <Suspense fallback={<div>Loading</div>}>
            <AboutLazy />
          </Suspense>
        ),
      },
      {
        path: "/shop",
        element: (
          <Suspense fallback={<div>Loading</div>}>
            <ShopLazy />
          </Suspense>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
