import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../css/pages/candidateTest.module.css";
import governor from "../css/global/governor.module.css";
import fetchWrapper from "../../utils/API/fetchWrapper";
import { Typography } from "@mui/material";
import CustomSkeleton from "../components/elements/skeleton";
import { useSocket } from "../Providers/socketContext";
import Base64AudioPlayer from "../components/elements/audioPlayer";

export default function CandidateTest() {
  const navigate = useNavigate();
  const location = useLocation();
  const socket = useSocket();
  const [candidateTestId, setCandidateTestId] = useState(null);
  const [test, setTest] = useState(null);
  const [streaming, setStreaming] = useState(false);
  const [allChunks, setAllChunks] = useState([]);
  const [connected, setConnected] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [interactionOccurred, setInteractionOccurred] = useState(false);
  const [audioAllowed, setAudioAllowed] = useState(false);

  useEffect(() => {
    const storedAudioPermission = localStorage.getItem("audioAllowed");
    if (storedAudioPermission === "true") {
      setAudioAllowed(true);
    }

    if (test && !test.is_complete && streaming) {
      socket.emit("connectToTest");
    }
  }, [test, socket, streaming]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("autoplay") === "true") {
      setInteractionOccurred(true);
      setStreaming(true);
    } else if (location.state?.interactionOccurred) {
      setInteractionOccurred(true);
      setStreaming(true);
    }
  }, [location.state]);

  useEffect(() => {
    if (socket && streaming) {
      socket.on("INTRO_MESSAGE", () => {
        setConnected(true);
        setAllChunks([]);
        console.log("CONNECTED");
      });

      socket.on("INTRO_AUDIO_CHUNK", (chunk) => {
        setAllChunks((prevChunks) => [...prevChunks, chunk]);
      });

      socket.on("AUDIO_END", () => {
        console.log("Audio streaming ended.");
        setIsDone(true);
      });

      // Clean up the event listeners when the component unmounts
      return () => {
        socket.off("INTRO_MESSAGE");
        socket.off("INTRO_AUDIO_CHUNK");
        socket.off("AUDIO_END");
      };
    }
  }, [socket, connected, streaming]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const candidate_test_id = params.get("candidate_test_id");
    setCandidateTestId(candidate_test_id);
  }, []);

  useEffect(() => {
    if (candidateTestId) {
      fetchWrapper(
        `/api/data/candidate-test?candidate_test_id=${candidateTestId}`,
        "",
        "GET",
        {},
        false
      ).then((res) => {
        if (res) {
          setTest(res.test);
          console.log(res);
        }
      });
    }
  }, [candidateTestId]);

  function handleInterviewStart() {
    navigate(`/candidate-interview?candidate_test_id=${candidateTestId}&autoplay=enabled`, {
      state: { interactionOccurred: true },
    });
  }

  function handleAudioAllow() {
    setAudioAllowed(true);
    setStreaming(true);
    localStorage.setItem("audioAllowed", "true");
  }

  return (
    <div className={governor.GovernorFull}>
      <div className={styles.CandidateTest}>
        {!audioAllowed ? (
          <div className={styles.AudioAllowContainer}>
            <Typography className={styles.WhiteText} variant="h4">
              We use AI to create fair first round interviews.
            </Typography>
            <Typography className={styles.WhiteText} variant="caption">
              To proceed, please allow audio by clicking the button below.
            </Typography>
            <button onClick={handleAudioAllow} className={styles.AllowButton}>
              Allow Audio
            </button>
          </div>
        ) : !test ? (
          <CustomSkeleton width={"400px"} height={"400px"} count={1} />
        ) : (
          <div className={styles.Fragment}>
            <Typography className={styles.WhiteText} variant="h4">
              {test.test_content.test_title}
            </Typography>
            <Typography className={styles.WhiteText} variant="caption">
              An organization has invited you to complete their first round
              interview
            </Typography>
            <div className={styles.Rules}>
              <Typography marginBottom={"10px"} variant="caption">
                Testing Rules
              </Typography>
              <div className={styles.Section}>
                <Typography variant="body1">
                  {test.test_content.open_note ? "Open Note" : "Closed Book"}
                </Typography>
              </div>
              <div className={styles.Sections}>
                <Typography variant="caption">Discussion Topics</Typography>
                {test.test_content.test_sections.map((section, index) => (
                  <div className={styles.Section} key={`section_${index}`}>
                    <Typography>{section.title}</Typography>
                  </div>
                ))}
              </div>
            </div>
            {isDone && (
              <div>
                <Base64AudioPlayer autoplay={isDone} base64Chunks={allChunks} />
              </div>
            )}
            <button
              onClick={handleInterviewStart}
              className={styles.BeginButton}
            >
              Begin Interview
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
