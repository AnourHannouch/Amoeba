import React, { useState, useEffect } from 'react';
import { Segment, Container, Header } from 'semantic-ui-react';

import Camera from '../Components/Camera';

const Home = () => {

  return (
    <>
      <Container>
        <Segment>
          <Header>This is the start page, Testing camera</Header>
          <Camera />
        </Segment>
      </Container>
    </>
  )
};

export default Home;
