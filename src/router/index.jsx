import { createBrowserRouter, Navigate } from "react-router-dom";

import App from "../App";
import HomeOscar from '../pages/oscar/HomeOscar';
import Voting from "../pages/oscar/Voting";

import HomeAdmin from "../pages/admin/HomeAdmin";
import AdminSection from "../pages/admin/AdminSection";
import AddCategory from "../pages/admin/AddCategory";
import Categories from '../pages/admin/Categories';
import NomineesPerCategory from "../pages/admin/NomineesPerCategory";
import AddNominee from "../pages/admin/AddNominee";

import axios from 'axios';

export default createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/admin",
    element: <HomeAdmin />,
    children: [
      {
        path: "/admin/",
        element: <AdminSection />
      },
      {
        path: "/admin/categoriesOscar",
        element: <Categories />,
        loader: async () => {
          const { data } = await axios.get('https://deisantix-super-space-parakeet-xqrgrqj7vvv2pjq-3000.preview.app.github.dev/categoriasOscar');
          return data;
        }
      },
      {
        path: "/admin/categoriesOscar/add",
        element: <AddCategory />
      },
      {
        path: "/admin/categoriesOscar/:category",
        element: <NomineesPerCategory />,
        loader: async ({ params }) => {
          const category = params.category;

          const { data } = await axios.get('https://deisantix-super-space-parakeet-xqrgrqj7vvv2pjq-3000.preview.app.github.dev/indicadosOscar', {
            params: { category }
          });
          return data;
        }
      },
      {
        path: "/admin/categoriesOscar/:category/add",
        element: <AddNominee />
      }
    ]
  },
  {
    path: "/oscar",
    element: <HomeOscar />
  },
  {
    path: '/oscar/voting',
    element: <Navigate to="/oscar/voting/melhor-filme" />
  },
  {
    path: "/oscar/voting/:category",
    element: <Voting />,
    loader: async ({ params }) => {
      const { data } = await axios.get('https://deisantix-super-space-parakeet-xqrgrqj7vvv2pjq-3000.preview.app.github.dev/categoriasOscar');
      return {
        all: data,
        actual: data.find(el => el.category === params.category.replace('-', ' '))
      };
    }
  }
]);