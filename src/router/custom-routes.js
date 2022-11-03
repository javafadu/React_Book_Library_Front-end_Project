import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "../components/general/scroll-to-top/scroll-to-top";
import BookDetail from "../components/users/book-detail/book-detail";
import NotFoundPage from "../pages/common/not-found-page";
import UnauthorizedPage from "../pages/common/unauthorized-page";
import AuthPage from "../pages/users/auth-page";
import ContactPage from "../pages/users/contact-page";
import HomePage from "../pages/users/home-page";
import LibraryPage from "../pages/users/library-page";
import ProfilePage from "../pages/users/profile-page";
import UserTemplate from "../templates/user-template";
import ProtectedRoute from "./protected-route";

const CustomRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop></ScrollToTop>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <UserTemplate>
                <HomePage />
              </UserTemplate>
            }
          />
          <Route
            path="library"
            element={
              <UserTemplate>
                <LibraryPage />
              </UserTemplate>
            }
          />
          <Route
            path="contact"
            element={
              <UserTemplate>
                <ContactPage />
              </UserTemplate>
            }
          />
          <Route
            path="book-detail"
            element={
              <UserTemplate>
                <BookDetail />
              </UserTemplate>
            }
          />

          <Route
            path="auth"
            element={
              <UserTemplate>
                <AuthPage />
              </UserTemplate>
            }
          />

          <Route
            path="unauthorized"
            element={
              <UserTemplate>
                <UnauthorizedPage />
              </UserTemplate>
            }
          />

          <Route path="user">
            <Route
              index
              element={
                <ProtectedRoute>
                  <UserTemplate>
                    <ProfilePage />
                  </UserTemplate>
                </ProtectedRoute>
              }
            />
          </Route>

          <Route
            path="*"
            element={
              <UserTemplate>
                <NotFoundPage />
              </UserTemplate>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default CustomRoutes;
