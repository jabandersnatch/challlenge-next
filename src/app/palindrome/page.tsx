'use client';

import React, { useState, useEffect } from 'react';
import Palindrome from '@/model/Palidrome/palindrome';
import { User } from 'firebase/auth';
import { onAuthChanged } from '@/viewmodel/Auth/AuthViewModel';
import { savePalindromes, getAllPalindromes } from '@/viewmodel/Palindrome/PalindromeViewModel';

const PalindromePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [palindromes, setPalindromes] = useState<Palindrome[]>([]);
  const [word, setWord] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const isPalindrome = (str: string) => {
    const reversed = str.split('').reverse().join('');
    if (str === reversed) {
      alert('This is a palindrome');
    } else {
      alert('This is not a palindrome');
    }
    return str === reversed;
  };

  useEffect(() => {
    onAuthChanged(setUser);
    const fetchPalindromes = async () => {
      const dbPalindromes = await getAllPalindromes(user?.uid as string);
      setPalindromes(dbPalindromes);
    };

    fetchPalindromes();

  }, [user]);

  const handleWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
  };

  const handleCheckPalindrome = async () => {
    if (!word.includes(' ')) {
      const newPalindrome = new Palindrome(word, isPalindrome(word));

      setPalindromes([...palindromes, newPalindrome]);

      await savePalindromes(user?.uid as string, [...palindromes, newPalindrome]);
    } else {
      alert('Word should not contain spaces');
    }
    setWord('');
  };

  const handleClearInput = () => {
    alert('Input Cleared');
    setWord('');
  };

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredPalindromes = palindromes.filter((palindrome) => palindrome.word.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className='container mx-auto my-5'>
      <h1 className='text-3xl font-bold mb-5'>Palindrome Checker</h1>
      {user ? (
        <div className='text-xl mb-5'>
          Logged in as
          {' '}
          <span className='font-bold'>{user.email}</span>
        </div>
      ) : (
        <div className='text-xl mb-5'>Not logged in</div>
      )}
      <div className='flex items-center space-x-4'>
        <input
          type='text'
          value={word}
          onChange={handleWordChange}
          placeholder='Enter a word (no spaces)'
          className='border-2 border-gray-400 rounded py-2 px-4 w-1/2'
        />
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={handleCheckPalindrome}
          type='button'
        >
          Check Palindrome
        </button>
        <button
          className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'
          onClick={handleClearInput}
          type='button'
        >
          Clear
        </button>
      </div>
      <div className='mt-5'>
        <h2 className='text-2xl font-bold mb-5'>Palindromes</h2>
        <input
          type='text'
          value={searchTerm}
          onChange={handleSearchTermChange}
          placeholder='Search for a word'
          className='border-2 border-blue-300 rounded py-2 px-4 w-1/4'
        />
        <div className='overflow-x-auto max-h-96 w-3/4'>
          <table className='table table-auto'>
            <thead>
              <tr>
                <th className='px-4 py-2'>Word</th>
                <th className='px-4 py-2'>Is Palindrome</th>
              </tr>
            </thead>
            <tbody>
              {filteredPalindromes.map((palindrome) => (
                <tr key={palindrome.word}>
                  <td className='border px-4 py-2'>{palindrome.word}</td>
                  <td className='border px-4 py-2'>{palindrome.isPalindrome ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PalindromePage;
