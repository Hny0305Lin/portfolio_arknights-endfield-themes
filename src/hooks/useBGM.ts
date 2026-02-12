import { useState, useEffect, useRef, useCallback } from 'react';

export function useBGM() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sourceCreated = useRef(false);
  const [playing, setPlaying] = useState(false);
  const hasInteracted = useRef(false);

  const ensureAudioContext = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || sourceCreated.current) return;

    const ctx = new AudioContext();
    const source = ctx.createMediaElementSource(audio);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 64;

    source.connect(analyser);
    analyser.connect(ctx.destination);

    audioCtxRef.current = ctx;
    analyserRef.current = analyser;
    sourceCreated.current = true;
  }, []);

  useEffect(() => {
    const audio = new Audio('/bgm.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    const startOnInteraction = () => {
      if (hasInteracted.current) return;
      hasInteracted.current = true;
      ensureAudioContext();
      if (audioCtxRef.current?.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      audio.play().then(() => setPlaying(true)).catch(() => {});
      events.forEach(e => window.removeEventListener(e, startOnInteraction));
    };

    const events = ['click', 'scroll', 'keydown', 'touchstart', 'wheel'];
    events.forEach(e => window.addEventListener(e, startOnInteraction, { once: true }));

    return () => {
      events.forEach(e => window.removeEventListener(e, startOnInteraction));
      audio.pause();
      audio.src = '';
      audioCtxRef.current?.close();
    };
  }, [ensureAudioContext]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    ensureAudioContext();
    if (audioCtxRef.current?.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    if (audio.paused) {
      audio.play().then(() => setPlaying(true));
    } else {
      audio.pause();
      setPlaying(false);
    }
  }, [ensureAudioContext]);

  return { playing, toggle, analyserRef };
}
