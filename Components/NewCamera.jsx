import React, { useState, useEffect, useRef, useCallback, useContext  } from 'react';
import { Button, Icon, Grid } from 'semantic-ui-react';

import { useUserMedia, useEventListener} from '../util/general';

const CameraContext = React.createContext();
function useCameraContext() {
  const context = useContext(CameraContext);

  if (!context) {
    throw new Error(
      'Camera compound components cannot be rendered outside Camera component.'
    )
  }

  return context;
}

const Camera = () => {
  //has been recorded? fileUrl to recording
  const [isRecorded, setIsRecorded] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);

  

  // video constraints
  const CAPTURE_OPTIONS = {
    audio: false,
    video: {
      width : { ideal: 300 },
      height: { ideal: 300 }
    }
  }
  return (
    <CameraContext.Provider value={value}>
      <
    </CameraContext.Provider>
  )

}

  // Camera.Feed for live capture
  function Feed () {

  }

  // Camera.Preview for recorded video
  function Preview () {

  }

