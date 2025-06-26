import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../features/header/Header'
import Navbar from '../features/navbar/Navbar'
import Breadcrumb from '../features/Breadcrumb /components/Breadcrumb'
import Footer from '../features/footer/components/Footer'
import ChatPage from '../pages/ChatPage'

export const RootLayout = () => {

    return (
        <>
            <Header />
            <Navbar />
            <Breadcrumb />
            <main>
                <Outlet />
            </main>
                  <ChatPage />
            <Footer />
        </>
    )
}
