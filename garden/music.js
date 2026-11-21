  const music = document.getElementById("bg-music");
  const musicBtn = document.getElementById("music-btn");

  // Optional: set initial volume to low (0.0 to 1.0)
  music.volume = 0.2;

  function toggleMusic() {
    if (music.paused) {
      music.play();
      musicBtn.textContent = "⏸ PAUSE MUSIC";
    } else {
      music.pause();
      musicBtn.textContent = "▶ MUSIC";
    }
  }