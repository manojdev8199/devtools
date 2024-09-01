import React from 'react';
import Header from "../components/siteframe/Header";
import Footer from "../components/siteframe/Footer";

const MainLayout = ({children}) => {
  return (
     <>
       <Header />
       <div className="body-container">
            <div className='container'>
                {children}
            </div>
            
       </div>
       <Footer />
     </>
  );
}

export default MainLayout;