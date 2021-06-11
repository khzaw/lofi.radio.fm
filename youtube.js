function loadYTAPI() {
  return new Promise((resolve) => {
    if (window.YT && window.YT.Player && window.YT.Player instanceof Function) {
      window.YT.ready(() => {
        resolve(window.YT);
      });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    document.body.appendChild(script);

    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (previous) {
        previous();
      }
      resolve(window.YT);
    };
  });
}

export default loadYTAPI;
