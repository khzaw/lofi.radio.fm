import { useState, useEffect, useRef } from "react";
import { Play, Pause } from "react-feather";

import styles from "../styles/Home.module.css";
import loadYTAPI from "../youtube";

const ID = "5qap5aO4i9A";

export default function Home() {
  const videoEl = useRef(null);
  const player = useRef(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);

  const onClick = () => {
    setPlaying((prev) => !prev);
    if (!playing) {
      player.current.playVideo();
    } else {
      player.current.pauseVideo();
    }
  };

  const onPlayerReady = () => {
    setReady(true);
  };

  useEffect(async () => {
    const YT = await loadYTAPI();
    player.current = new YT.Player(videoEl.current, {
      height: "0",
      width: "0",
      videoId: ID,
      playerVars: {
        playsinline: 1,
        autoplay: 0,
        loop: 1,
      },
      events: {
        onReady: onPlayerReady,
      },
    });
    return () => {
      if (player) {
        player.current.destroy();
      }
    };
  }, [loadYTAPI]);

  return (
    <main className={styles.container}>
      <div ref={videoEl} className={styles.video} />
      {ready && (
        <button onClick={onClick} className={styles.musicButton}>
          {playing ? <Pause size={56} /> : <Play size={56} />}
        </button>
      )}
      <div className={styles.circle} style={{ animationDelay: "0s" }} />
      <div className={styles.circle} style={{ animationDelay: "1s" }} />
      <div className={styles.circle} style={{ animationDelay: "2s" }} />
      <div className={styles.circle} style={{ animationDelay: "3s" }} />
    </main>
  );
}
