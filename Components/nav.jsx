import React, { useState } from 'react';
import { Menu, Image, Container, Input, Modal, Header } from 'semantic-ui-react';

const Nav = () => {
  const [activeItem, setActiveItem] = useState('home')

  const handleChange = (e, { name }) => setActiveItem(name);

  return (
    <Menu>
        <Image src='/favicon.png' size='tiny' />
      <Menu.Item 
        name='Dictionary'
        active={activeItem === 'dictionary'}
        onClick={handleChange}
      />
      <Menu.Item>
          <Input icon='search' placeholder='Search...' size='huge'/>
        </Menu.Item>
        

      <Menu.Menu position='right'>
        <Modal trigger={<Menu.Item name='add' icon='plus'/>}>
          <Modal.Header>
            Add a Word
          </Modal.Header>

        </Modal>
        
        <Menu.Item
          name='Language'
          active={activeItem === 'language'}
          onClick={handleChange}
        />
        <Menu.Item 
          name='Profile'
          active={activeItem === 'profile'}
          onClick={handleChange}
         />
      </Menu.Menu>
      
    </Menu>
  )
};

export default Nav;