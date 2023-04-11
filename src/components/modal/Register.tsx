'use client';

import React from 'react';
import { register } from '@/viewmodel/Auth/AuthViewModel';
import { Modal } from '@nextui-org/react';
import { Formik, Form } from 'formik';

interface RegisterModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ open, setOpen }) => {
  const handleRegister = async (email: string, password: string) => {
    if (!email || !password) {
      alert('Please provide an email and password.');
      return;
    }

    const success = await register(email, password);
    if (success) {
      setOpen(false);
      alert('User registration successful');
    } else {
      alert('User registration failed');
    }
  };

  return (
    <Modal
      closeButton
      blur
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby='register-modal'
      className='max-w-sm mx-auto'
    >
      <Modal.Header>Register</Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values) => handleRegister(values.email, values.password)}
        >
          {({ values, handleChange }) => (
            <Form>
              <div className='mb-4'>
                <label htmlFor='email' aria-label='email' className='block mb-2 font-medium'>
                  Email
                  <input
                    type='email'
                    name='email'
                    id='email'
                    value={values.email}
                    onChange={handleChange}
                    className='w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                </label>
              </div>
              <div className='mb-4'>
                <label htmlFor='password' aria-label='password' className='block mb-2 font-medium'>
                  Password
                  <input
                    type='password'
                    name='password'
                    id='password'
                    value={values.password}
                    onChange={handleChange}
                    className='w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                </label>
              </div>
              <div className='flex justify-end'>
                <button
                  type='submit'
                  className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  Register
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterModal;
