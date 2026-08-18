import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { ShopLayout } from "./shop/layout/ShopLayout";

import HomePage from "./shop/pages/HomePage";
import GenderPage from "./shop/pages/GenderPage";
import { ProductPage } from "./shop/pages/ProductPage";

const  AuthLayout = lazy(() => import("./auth/layout/AuthLayout"))
const  LoginPage = lazy(() => import("./auth/pages/LoginPage"))
const  RegisterPage = lazy(() => import("./auth/pages/RegisterPage"))

const  AdminLayout = lazy(() => import("./admin/layout/AdminLayout"))
const  ProductsPage = lazy(() => import("./admin/pages/ProductsPage"))
const  DashboardPage = lazy(() => import("./admin/pages/DashboardPage"))

export const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <ShopLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'product/:idSlug',
                element: <ProductPage />    
            }, 
            {
                path: 'gender/:gender',
                element: <GenderPage />
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: <LoginPage />
            },
            {
                path: 'register',
                element: <RegisterPage />    
            }, 
            {
                 
                path: '*',
                element: <Navigate to='/auth/login' />
        
            }
        ]
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <DashboardPage />
            },
            {
                path: 'products',
                element: <ProductsPage />    
            }, 
            {
                path: 'products/:id',
                element: <ProductPage />    
            }, 
            {
                path: '*',
                element: <Navigate to='/admin' />
            }
        ]
    },
    {
        path: '*',
        element: <Navigate to='/' />
    }
])