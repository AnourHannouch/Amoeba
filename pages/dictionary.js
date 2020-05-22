import React, { useState } from 'react';
import { Segment, Container } from 'semantic-ui-react';
import Dictionary from '../Components/Dictionary';



const renderContent = props => {
  return props.map(word => (
    <Dictionary 
      key={word._id}
      src={word.src}
      word={word.word}
      language={word.language}
      description={word.description}
    />
  ));
}

const Home = () => {
  return (
    <>
      <Container>
        <Segment>
        {renderContent(tempWord)}
        </Segment>
      </Container>
    </>
  )
};

export default Home;

const tempWord = [
  {
    _id : '1',
    src: './favicon.png',
    word : 'cat',
    language: 'english',
    description: 'This is a text about the word and other words are written here. Sometimes they are in one language, sometimes in others',
    englishWord: ''
  },
  {
    _id : '2',
    src: './favicon.png',
    word : 'Toffee',
    language: 'english',
    description: 'This is a text about the word and other words are written here. Sometimes they are in one language, sometimes in others',
    englishWord: ''
  },
  {
    _id : '3',
    src: './favicon.png',
    word : 'House',
    language: 'english',
    description: 'This is a text about the word and other words are written here. Sometimes they are in one language, sometimes in others',
    englishWord: ''
  },
  {
    _id : '4',
    src: './favicon.png',
    word : 'Bee',
    language: 'english',
    description: 'This is a text about the word and other words are written here. Sometimes they are in one language, sometimes in others',
    englishWord: ''
  },
  {
    _id : '5',
    src: './favicon.png',
    word : 'Bee',
    language: 'english',
    description: 'This is a text about the word and other words are written here. Sometimes they are in one language, sometimes in others',
    englishWord: ''
  },
  {
    _id : '6',
    src: './favicon.png',
    word : 'Bee',
    language: 'english',
    description: 'This is a text about the word and other words are written here. Sometimes they are in one language, sometimes in others',
    englishWord: ''
  },
  {
    _id : '7',
    src: './favicon.png',
    word : 'Bee',
    language: 'english',
    description: 'This is a text about the word and other words are written here. Sometimes they are in one language, sometimes in others',
    englishWord: ''
  },
  {
    _id : '8',
    src: './favicon.png',
    word : 'Bee',
    language: 'english',
    description: 'This is a text about the word and other words are written here. Sometimes they are in one language, sometimes in others',
    englishWord: ''
  },
  {
    _id : '9',
    src: './favicon.png',
    word : 'Bee',
    language: 'english',
    description: 'This is a text about the word and other words are written here. Sometimes they are in one language, sometimes in others',
    englishWord: ''
  }

];
