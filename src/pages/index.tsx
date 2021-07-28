import React from 'react';
import Head from 'next/head';
import SignInTemplate from '../templates/SignIn';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | pick.room</title>
      </Head>
      <SignInTemplate />
    </>
  );
}
