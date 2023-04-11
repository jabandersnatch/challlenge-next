'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@nextui-org/react';
import Dot from '@/model/Dot/dot';
import { User } from 'firebase/auth';
import { onAuthChanged } from '@/viewmodel/Auth/AuthViewModel';
import { getDots, saveDots } from '@/viewmodel/Dot/DotViewModel';

const DotsPage = () => {
  const [dots, setDots] = useState<Dot[]>([]);
  const [undoneDots, setUndoneDots] = useState<Dot[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const newDot: Dot = {
      x: event.clientX,
      y: event.clientY,
      color: getRandomColor(),
    };
    setDots((prevDots) => [...prevDots, newDot]);
    setUndoneDots([]);
  };

  const handleUndo = () => {
    if (dots.length === 0) return;
    const lastDot = dots[dots.length - 1];
    setDots(dots.slice(0, -1));
    setUndoneDots((prevUndoneDots) => [...prevUndoneDots, lastDot]);
  };

  const handleRedo = () => {
    if (undoneDots.length === 0) return;
    const lastUndoneDot = undoneDots[undoneDots.length - 1];
    setUndoneDots(undoneDots.slice(0, -1));
    setDots((prevDots) => [...prevDots, lastUndoneDot]);
  };

  useEffect(() => {
    onAuthChanged(setUser);
    const fetchDots = async () => {
      const dbdots = await getDots(user?.uid as string);
      setDots(dbdots);
    };

    fetchDots();

  }, [user]);

  const SaveDots = async () => {
    await saveDots(user?.uid as string, dots);
  };

  return (
    <div
      className='flex flex-col items-center justify-center h-screen'
      onClick={handleClick}
      role='button'
      tabIndex={0}
    >
      {user ? (
        <>
          <div className='flex flex-row items-center gap-4 h-1/6'>
            <Button onClick={handleUndo} color='error'>Undo</Button>
            <Button onClick={handleRedo} bordered>Redo</Button>
            <Button onClick={SaveDots}>Save</Button>
          </div>
          <div className='w-screen h-5/6'>
            {dots.map((dot) => (
              <div
                key={`${dot.x}-${dot.y}`}
                className='absolute'
                style={{
                  top: dot.y,
                  left: dot.x,
                  width: '10px',
                  height: '10px',
                  backgroundColor: dot.color,
                  borderRadius: '50%',
                }}
              />
            ))}
          </div>
        </>
      ) : (
        <div className='flex flex-col justify-center items-center gap-4'>
          <h1 className='text-4xl'>You are not logged in</h1>
        </div>
      )}
    </div>
  );
};

export default DotsPage;
