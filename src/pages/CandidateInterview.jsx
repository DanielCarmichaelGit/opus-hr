import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import styles from "../css/pages/candidateTest.module.css";
import governor from "../css/global/governor.module.css";
import fetchWrapper from "../../utils/API/fetchWrapper";
import { Typography } from "@mui/material";
import { useSocket } from "../Providers/socketContext";
import Base64AudioPlayer from "../components/elements/audioPlayer";
import AnimatedDots from "../components/elements/animatedDots";
import AudioSynth from "./Testing";

export default function CandidateInterview() {
  const socket = useSocket();
  const location = useLocation();
  const [candidateTestId, setCandidateTestId] = useState(null);
  const [testStarted, setTestStarted] = useState(false);
  const [test, setTest] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [connected, setConnected] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [allChunks, setAllChunks] = useState([]);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const [currentRole, setCurrentRole] = useState("interviewer");
  const [isDone, setIsDone] = useState(false);
  const [interviewerDone, setInterviewerDone] = useState(false);
  const [interactionOccurred, setInteractionOccurred] = useState(false);
  const [intervieweeResponse, setIntervieweeResponse] = useState("");
  const [interviewerResponse, setInterviewerResponse] = useState("");
  const [conversation, setConversation] = useState([]);
  const [responsePending, setResponsePending] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const currentSection =
    test && test.test_content.test_sections[currentQuestionIndex];

  // Extract candidate test ID from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const candidate_test_id = params.get("candidate_test_id");
    setCandidateTestId(candidate_test_id);
    console.log("Candidate Test ID:", candidate_test_id);
  }, []);

  // Emit 'connectToTest' event when test is ready and streaming is enabled
  useEffect(() => {
    if (test && !test.is_complete && streaming) {
      console.log("Connecting to test");
      socket.emit("connectToTest");
    }
  }, [test, socket, streaming]);

  // Add a new chunk to the allChunks array
  function setChunks(chunk) {
    setAllChunks((prevChunks) => [...prevChunks, chunk]);
  }

  // Setup socket event listeners for streaming audio
  useEffect(() => {
    if (socket && streaming) {
      socket.on("CONNECTED", () => {
        setConnected(true);
        setAllChunks([]);
        console.log("Socket connected");
      });

      if (currentSection && connected && streaming && !testStarted) {
        console.log("Sending TTS request:", currentSection);
        socket.emit("TTS", { currentSection });
        setTestStarted(true);
      }

      socket.on("AUDIO_CHUNK", (chunk) => {
        setChunks(chunk);
      });

      socket.on("AUDIO_END", () => {
        console.log("Audio streaming ended");
        setIsDone(true);
        setCurrentRole("interviewee");

        // Append the current question to the conversation thread only once
        console.log("Interviewer response:", interviewerResponse);
        setConversation((prev) => {
          if (prev[prev.length - 1]?.text !== currentSection.question) {
            return [
              ...prev,
              {
                type: "question",
                text:
                  conversation.length > 1
                    ? interviewerResponse
                    : currentSection.question,
              },
            ];
          }
          return prev;
        });
      });

      // Clean up the event listeners when the component unmounts
      return () => {
        socket.off("CONNECTED");
        socket.off("AUDIO_CHUNK");
        socket.off("AUDIO_END");
      };
    }
  }, [socket, currentSection, connected, streaming, interviewerResponse]);

  // Fetch test data when candidateTestId is set
  useEffect(() => {
    if (candidateTestId) {
      fetchWrapper(
        `/api/data/candidate-test?candidate_test_id=${candidateTestId}`,
        "",
        "GET",
        {},
        true
      ).then((res) => {
        if (res) {
          setTest(res.test);
          setTimeLeft(res.test.test_content.total_time_allowed * 60);
          console.log("Fetched test data:", res);
        }
      });
    }
  }, [candidateTestId, testStarted]);

  // Timer to count down the time left
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      console.log("Time is up!");
    }
  }, [timeLeft]);

  // Check if interaction has occurred and start streaming
  useEffect(() => {
    if (location.state?.interactionOccurred) {
      setInteractionOccurred(true);
      setStreaming(true);
      console.log("Interaction occurred, streaming started");
    }
  }, [location.state]);

  // Play the current audio chunk
  const playCurrentChunk = useCallback(() => {
    if (currentChunkIndex < allChunks.length) {
      const currentChunk = allChunks[currentChunkIndex];
      const binaryString = window.atob(currentChunk);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const audioBlob = new Blob([bytes.buffer], { type: "audio/wav" });
      const audio = new Audio(URL.createObjectURL(audioBlob));

      audio.onended = () => {
        setCurrentChunkIndex((prevIndex) => prevIndex + 1);
      };

      audio.play().catch((error) => {
        console.error("Error playing audio:", error);
      });

      console.log("Playing audio chunk:", currentChunkIndex);
    } else {
      // If the next chunk is not available, retry after 100ms
      setTimeout(playCurrentChunk, 100);
    }
  }, [currentChunkIndex, allChunks]);

  // Handle interaction occurrence and play audio chunks
  useEffect(() => {
    if (interactionOccurred) {
      playCurrentChunk();
    }
  }, [interactionOccurred, playCurrentChunk]);

  // Handle interviewee's response
  const handleResponse = useCallback((response) => {
    setConversation((prev) => [...prev, { type: "response", text: response }]);
    setResponsePending(false);
    setCurrentRole("interviewer");
    console.log("Handled response:", response);
  }, []);

  // Callback for when audio ends
  const handleAudioEnd = useCallback(() => {
    if (!responsePending && !isRunning) {
      console.log("Audio ended, processing response");
      setIsRunning(true);
      setResponsePending(true);
      setIsRunning(false);
      setInterviewerDone(true);
      setAllChunks([]);
      setCurrentChunkIndex(0);
    }
  }, [responsePending, isRunning]);

  return (
    <div className={`${governor.GovernorFull} ${styles.CandidateInterview}`}>
      <AudioSynth
        section_title={currentSection?.title}
        interviewId={candidateTestId}
        role={currentRole}
        setCurrentRole={setCurrentRole}
        interviewerDone={interviewerDone}
        setIntervieweeResponse={handleResponse}
        setAssistantResponse={setInterviewerResponse}
        setChunks={setChunks}
      />
      <div className={styles.ConversationThread}>
        {conversation.map((entry, index) => (
          <div
            key={index}
            className={`${styles.ConversationEntry} ${styles[entry.type]}`}
          >
            <Typography
              className={index % 2 === 0 ? "Interviewer" : "You"}
              variant="caption"
              fontWeight={600}
            >
              {index % 2 === 0 ? "Interviewer" : "You"}
            </Typography>
            <Typography fontWeight={500} variant="body1">
              {entry.text}
            </Typography>
          </div>
        ))}
      </div>
      {isDone && (
        <div>
          <Base64AudioPlayer
            autoplay={isDone}
            base64Chunks={allChunks}
            onAudioEnd={handleAudioEnd}
          />
        </div>
      )}
    </div>
  );
}
