import React from 'react';

const DotsLayout = ({
  children,
} : {
  children: React.ReactNode
}) => {
  return (
    <section>
      {children}
    </section>
  );
};

export default DotsLayout;
