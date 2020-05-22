import { useState, useEffect, useRef } from 'react';

export function useUserMedia(requestedMedia) {
  const [mediaStream, setMediaStream] = useState(null);

  useEffect(() => {
    async function enableStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(requestedMedia);

        setMediaStream(stream);
      } catch (err) {
        // handle
      }
    }

    if (!mediaStream) {
      enableStream();
    } else {
      return function cleanup() {
        mediaStream.getTracks().forEach(track => {
          track.stop();
        });
      }
    }
  }, [mediaStream, requestedMedia]);
  return mediaStream;
};

export function useEventListener(eventName, handler, element ) {
  const savedHandler = useRef();
  const isClient = typeof window !== 'undefined';

  if (isClient) element = window;

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {

      const isSupported = element && element.addEventListener;
      if (!isSupported) return;

      const eventListener = event => savedHandler.current(event);

      element.addEventListener(eventName, eventListener);

      return function cleanup() {
        element.removeEventListener(eventName, eventListener);
      }

    }, 
    [eventName, element] // only rerun if eventName or element changes
  );
};
