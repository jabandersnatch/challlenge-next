'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { onAuthChanged } from '@/viewmodel/Auth/AuthViewModel';
import { auth } from '@/FirebaseSettings';
import { User } from 'firebase/auth';
import RegisterModal from './modal/Register';
import LoginModal from './modal/Login';

const HeaderNav = () => {

  const [user, setUser] = useState<User | null>(null);
  const [activeLink, setActiveLink] = useState<string>('home');
  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const handleRegisterOpen = () => {
    setOpenRegister(true);
  };

  const handleLoginOpen = () => {
    setOpenLogin(true);
  };

  useEffect(() => {
    onAuthChanged(setUser);
  }, []);

  const handleLinkClick = (linkName: string) => {
    setActiveLink(linkName);
  };

  const renderAuthButtons = () => {
    if (user) {
      return (
        <div className='flex items-center'>
          <button
            className='text-gray-200 hover:text-blue-500 font-medium'
            onClick={() => auth.signOut()}
            type='button'
          >
            Logout
          </button>
        </div>
      );
    }
    return (
      <div className='flex items-center'>
        <button
          className='text-gray-200 hover:text-blue-500 font-medium mr-4'
          onClick={handleLoginOpen}
          type='button'
        >
          Login
        </button>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={handleRegisterOpen}
          type='button'
        >
          Sign Up
        </button>
      </div>
    );
  };

  return (
    <>
      <nav className='bg-dark shadow-lg'>
        <div className='container mx-auto px-6 py-3'>
          <div className='flex items-center justify-between'>
            <div className='hidden md:flex'>
              <Link
                href='/'
                className={`text-gray-300 ${
                  activeLink === 'home' && 'font-bold'
                } hover:text-blue-600 mr-4`}
                onClick={() => handleLinkClick('home')}
              >
                Home
              </Link>
              <Link
                href='/dots'
                className={`text-gray-300 ${
                  activeLink === 'dots' && 'font-bold'
                } hover:text-blue-600 mr-4`}
                onClick={() => handleLinkClick('dots')}
              >
                Puntos
              </Link>
              <Link
                href='/palindrome'
                className={`text-gray-300 ${
                  activeLink === 'palidrome' && 'font-bold'
                } hover:text-blue-600 mr-4`}
                onClick={() => handleLinkClick('palidrome')}
              >
                Palíndromo
              </Link>
            </div>
            <div className='flex items-center'>{renderAuthButtons()}</div>
          </div>
        </div>
      </nav>
      <RegisterModal open={openRegister} setOpen={setOpenRegister} />
      <LoginModal open={openLogin} setOpen={setOpenLogin} />
    </>
  );
};

export default HeaderNav;
