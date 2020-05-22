import 'semantic-ui-css/semantic.min.css'

import React from 'react';
import Head from 'next/head';
import Nav from '../Components/nav';

function SignLang({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>SignLang</title>
        <link rel='icon' href='/favicon.PNG' />
      </Head>
      {/* needs floating menu */}
      <Nav />
      <Component {...pageProps} />
    </>
  )
};

export default SignLang;