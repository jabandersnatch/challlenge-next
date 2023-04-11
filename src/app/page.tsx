'use client';

import React, { useState, useEffect } from 'react';
import { onAuthChanged } from '@/viewmodel/Auth/AuthViewModel';
import { User } from 'firebase/auth';

const Home = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthChanged(setUser);
  }, []);

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='flex flex-col justify-center items-center'>
        {user ? (
          <h1 className='text-4xl font-bold mb-4 text-center'>
            Welcome
            <br />
            {user.email}
          </h1>
        ) : (
          <h1 className='text-4xl font-bold mb-4'>
            For start Using the app please login in or sing in
          </h1>
        )}
      </div>
    </div>
  );
};

export default Home;
