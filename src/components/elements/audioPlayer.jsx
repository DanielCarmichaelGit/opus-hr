import React, { useEffect, useState, useRef } from "react";

const Base64AudioPlayer = ({ base64Chunks, autoplay, onAudioEnd }) => {
  const [audioBuffer, setAudioBuffer] = useState(null);
  const [audioEnded, setAudioEnded] = useState(false);
  const audioContextRef = useRef(null);
  const sourceRef = useRef(null);

  useEffect(() => {
    if (autoplay && audioBuffer) {
      playAudio();
    }
  }, [autoplay, audioBuffer]);

  useEffect(() => {
    if (base64Chunks.length > 0) {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext ||
          window.webkitAudioContext)();
      }
      const combinedArray = new Uint8Array(
        base64Chunks.reduce((acc, chunk) => acc + atob(chunk).length, 0)
      );
      let offset = 0;

      base64Chunks.forEach((chunk) => {
        const decodedChunk = atob(chunk);
        const uint8Array = new Uint8Array(decodedChunk.length);
        for (let i = 0; i < decodedChunk.length; i++) {
          uint8Array[i] = decodedChunk.charCodeAt(i);
        }
        combinedArray.set(uint8Array, offset);
        offset += decodedChunk.length;
      });

      audioContextRef.current.decodeAudioData(
        combinedArray.buffer,
        (buffer) => {
          setAudioBuffer(buffer);
        },
        (e) => console.error("Error decoding audio data", e)
      );
    }
  }, [base64Chunks]);

  const playAudio = () => {
    if (audioBuffer && !sourceRef.current) {
      sourceRef.current = audioContextRef.current.createBufferSource();
      sourceRef.current.buffer = audioBuffer;
      sourceRef.current.connect(audioContextRef.current.destination);
      sourceRef.current.start(0);
      sourceRef.current.onended = () => {
        if (!audioEnded) {
          setAudioEnded(true);
          if (onAudioEnd) {
            console.log("AUDIO ENDED");
            onAudioEnd();
          }
        }
        sourceRef.current = null; // Reset the source to allow replaying
      };
    }
  };

  return <div></div>;
};

export default Base64AudioPlayer;
