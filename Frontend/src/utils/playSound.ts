export const playSound = (frequencies) => {
  if (!frequencies) {
    console.error("❌ No frequency provided!");
    return;
  }

  // Create a new AudioContext
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const masterGain = audioContext.createGain();
  masterGain.connect(audioContext.destination);
  masterGain.gain.value = 0.5; // Master volume control

  let currentTime = audioContext.currentTime;

  // Enhanced envelope parameters
  const attack = 0.05;      // Time to reach peak volume (seconds)
  const decay = 0.1;        // Time to settle to sustain level (seconds)
  const sustainLevel = 0.9; // Sustained volume level (0-1)
  const release = 0.1;      // Time to fade out (seconds)
  const noteDuration = 0.6; // Duration of each note (seconds)
  const pauseDuration = 0.1; // Silence between notes (seconds)
  const numRepeats = 3;     // Number of times to repeat the sequence

  // Play sequence multiple times
  for (let repeat = 0; repeat < numRepeats; repeat++) {
    frequencies.forEach((frequency, index) => {
      // Create new oscillator and gain node for each frequency
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      // Configure oscillator
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(frequency, currentTime);
      
      // Connect nodes
      oscillator.connect(gainNode);
      gainNode.connect(masterGain);

      // Apply ADSR envelope
      gainNode.gain.setValueAtTime(0, currentTime); // Start silent
      gainNode.gain.linearRampToValueAtTime(1, currentTime + attack); // Attack
      gainNode.gain.linearRampToValueAtTime(sustainLevel, currentTime + attack + decay); // Decay
      gainNode.gain.setValueAtTime(sustainLevel, currentTime + noteDuration - release); // Sustain
      gainNode.gain.linearRampToValueAtTime(0, currentTime + noteDuration); // Release

      // Schedule oscillator start/stop
      oscillator.start(currentTime);
      oscillator.stop(currentTime + noteDuration);

      // Update timing for next note
      currentTime += noteDuration + pauseDuration;
    });

    // Add a longer pause between repetitions
    currentTime += pauseDuration * 2;
  }

  // Calculate total duration
  const totalDuration = (frequencies.length * (noteDuration + pauseDuration) + pauseDuration * 2) * numRepeats;

  // Close AudioContext after playback
  setTimeout(() => {
    audioContext.close();
    console.log("🔇 AudioContext closed");
  }, totalDuration * 1000 + 100); // Add small buffer

  // Log playback details
  console.log("📢 Playing Attendance Signal:", {
    frequencies,
    repeats: numRepeats,
    duration: `${totalDuration.toFixed(2)}s`,
    envelope: {
      attack,
      decay,
      sustainLevel,
      release,
      noteDuration,
      pauseDuration
    }
  });

  // Return promise that resolves when playback is complete
  return new Promise((resolve) => {
    setTimeout(resolve, totalDuration * 1000);
  });
}; 