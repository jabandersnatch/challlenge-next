import React from 'react';
import { login } from '@/viewmodel/Auth/AuthViewModel';
import { Modal } from '@nextui-org/react';
import { Formik, Form } from 'formik';

interface LoginModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, setOpen }) => {
  const handleLogin = async (email: string, password: string) => {
    if (!email || !password) {
      alert('Please provide an email and password');
      return;
    }

    const user = await login(email, password);
    if (user) {
      alert('Login successful');
      setOpen(false);
    } else {
      alert('Login failed');
    }
  };

  return (
    <Modal
      closeButton
      blur
      open={open}
      onClose={() => setOpen(false)}
      aria-label='login-modal'
      className='max-w-sm mx-auto'
    >
      <Modal.Header>Login</Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values) => handleLogin(values.email, values.password)}
        >
          {({ values, handleChange }) => (
            <Form>
              <div className='mb-4'>
                <label htmlFor='email' className='block mb-2 font-medium'>
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
                <label htmlFor='password' className='block mb-2 font-medium'>
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
                  Login
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
