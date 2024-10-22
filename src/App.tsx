import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense } from "react";
// import Loading from "./components/generic/home/Loading";
// import ScrollToTopButton from "./components/generic/home/ScrollToTopButton";
// import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider

// Import Routes
// import useProtectedRoutes from "./routes/protected/protectedRoutes";
import publishRoutes from "./routes/publish/publishRoutes";

import adminRoutes from "./routes/sub/adminRoutes";
import instructorRoutes from "./routes/sub/instructorRoutes";
import studentRoutes from "./routes/sub/studentRoutes";
// import { CartProvider } from "./context/CartContext";
//==============================
//test
//test
//test
//test
//test
//test
//test
//test
//test
//test
//test
//test
//test
//test
//test
const App = () => {
  // const protectedRoutes = useProtectedRoutes();
  const router = createBrowserRouter([
    ...adminRoutes,
    ...instructorRoutes,
    ...studentRoutes,
    // ...protectedRoutes,
    ...publishRoutes,
  ]);

  return (
    <>
      <Suspense fallback='loading...'>

        <RouterProvider router={router} />

      </Suspense>

    </>
  );
};

export default App;