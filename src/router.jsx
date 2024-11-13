import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import DonatedBooks from "./pages/DonatedBooks";
import ToDonatedBooks from "./pages/ToDonatedBooks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/donatedBooks",
        element: <DonatedBooks />,
      },
      {
        path: "/toDonatedBooks",
        element: <ToDonatedBooks />,
      },
    ],
  },
]);

export default router;
