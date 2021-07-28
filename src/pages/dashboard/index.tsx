import { signOut, useSession } from 'next-auth/client';
import React from 'react';

export default function Dashboard() {
  const [session] = useSession();
  const getUserData = () => {
    if (session && session.user) {
      const { name, email, image } = session.user;
      return (
        <>
          <p>
            Nome:
            {' '}
            {name}
          </p>
          <p>
            Email:
            {' '}
            {email}
          </p>
          <img src={image || ''} alt="Avatar" />
        </>
      );
    }
    return (
      <button type="button" onClick={() => signOut({ callbackUrl: '/' })}>sair</button>
    );
  };

  return (
    <div>
      {getUserData()}
    </div>
  );
}
