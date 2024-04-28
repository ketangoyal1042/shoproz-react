import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from "react-helmet";
import { Toaster } from 'react-hot-toast';


const Layout = ({ children, title, description, keywords, author }) => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="viewport" content={description} />
                <meta name="viewport" content={keywords} />
                <meta name="viewport" content={author} />
                <title>{title}</title>
            </Helmet>
            <Header />
            <Toaster />
            <main style={{ minHeight: "73vh" }}>
                {children}
            </main>
            <Footer />
        </div>
    );
};

Layout.defaultProps = {
    title: "Ecommerce Web - shop now",
    description: "Mern stack",
    keywords: "mern, mongodb, mongoose, react, node",
    author: "Sahil Goyal",
};

export default Layout