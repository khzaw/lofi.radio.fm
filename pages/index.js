import { useEffect, useRef } from "react";
import styles from "../styles/Home.module.css";
import loadYTAPI from "../youtube";

const ID = "5qap5aO4i9A";

export default function Home() {
  const videoEl = useRef(null);

  useEffect(() => {
    loadYTAPI().then((YT) => {
      new YT.Player(videoEl.current, {
        height: "0",
        width: "0",
        videoId: ID,
        playerVars: {
          playsinline: 1,
          autoplay: 1,
          loop: 1,
        },
      });
    });
  }, [loadYTAPI]);

  return (
    <main className={styles.container}>
      <div ref={videoEl} className={styles.video} />
    </main>
  );
}
