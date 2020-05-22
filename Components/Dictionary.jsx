import React, { useState } from 'react';
import { Item, Image, Label, Segment, Container } from 'semantic-ui-react';

const DictionaryList = props => {
  const [localContentData, setLocalContentData] = useState(props);
  return (
    <Segment.Group horizontal raised>
      <Segment basic compact>
        <Image spaced='left' size='tiny' src={localContentData.src} />
      </Segment>
      <Segment basic>
        <Item>
          <Item.Content>
            <Item.Header>{localContentData.word}</Item.Header>
            <Item.Description>{localContentData.description}</Item.Description>
            <Container>
              <Item.Extra>
                <Label content={localContentData.language} size='tiny'/>
              </Item.Extra>
            </Container>
          </Item.Content>
        </Item>
      </Segment>

    </Segment.Group>
  )
}

export default DictionaryList;