import React from 'react';
import { signOut, useSession } from 'next-auth/client';
import dynamic from 'next/dynamic';

const ButtonWithNoSSR = dynamic(
  () => import('../components/ButtonMicrosoftLogin'),
  { ssr: false },
);

export default function Login() {
  const [session] = useSession();

  return (
    <div>
      <ButtonWithNoSSR />
    </div>
  );
}
