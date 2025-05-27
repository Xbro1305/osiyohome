import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Header } from "./widgets/Header/Header";
import { Home } from "./Pages/Home/Home";
import { About } from "./Pages/About/About";
import { Contact } from "./Pages/Contact/Contact";
import { Catalog } from "./Pages/Catalog/Catalog";
import { CatalogCategory } from "./Pages/CatalogCategory/Category";
import { CatalogItem } from "./Pages/CatalogItem/Item";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contact />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route
            path="/catalog/category/:category"
            element={<CatalogCategory />}
          />{" "}
          <Route path="/catalog/item/:art" element={<CatalogItem />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const RootLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
