import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router';

import {useAuth} from '../stores/authStore'
import { useEffect } from 'react';

function RootLayout() {
  
  const checkAuth = useAuth((state) => state.checkAuth);

useEffect(() => {
  checkAuth();
}, []);

  return (
    <div>
      <Header />
      <div className="min-h-screen mx-32">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default RootLayout;