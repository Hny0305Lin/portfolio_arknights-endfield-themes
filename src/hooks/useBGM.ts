import { useState, useEffect, useRef, useCallback } from 'react';

export function useBGM() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sourceCreated = useRef(false);
  const [playing, setPlaying] = useState(false);
  const hasStarted = useRef(false);
  const starting = useRef(false);

  const STORAGE_KEY = 'bgm_disabled';

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

    const syncPlaying = () => setPlaying(!audio.paused);
    audio.addEventListener('play', syncPlaying);
    audio.addEventListener('pause', syncPlaying);
    audio.addEventListener('ended', syncPlaying);

    const events = ['pointerdown', 'click', 'keydown', 'touchend'] as const;
    const isDisabled = () => window.localStorage.getItem(STORAGE_KEY) === '1';

    const tryStart = async () => {
      if (isDisabled()) return false;
      if (starting.current) return false;
      starting.current = true;
      try {
        ensureAudioContext();
        if (audioCtxRef.current?.state === 'suspended') {
          await audioCtxRef.current.resume();
        }
        await audio.play();
        hasStarted.current = true;
        setPlaying(true);
        return true;
      } catch {
        return false;
      } finally {
        starting.current = false;
      }
    };

    const startOnInteraction = async () => {
      if (isDisabled()) return;
      const ok = await tryStart();
      if (ok) removeListeners();
    };

    const removeListeners = () => {
      events.forEach((e) => window.removeEventListener(e, startOnInteraction));
    };

    const init = async () => {
      if (isDisabled()) return;
      const ok = await tryStart();
      if (ok) return;
      events.forEach((e) => window.addEventListener(e, startOnInteraction, { passive: true }));
    };

    const onReady = () => {
      init();
    };

    if ((window as any).__bgmAutoplayReady) {
      init();
    } else {
      window.addEventListener('bgm-autoplay-ready', onReady, { once: true });
    }

    return () => {
      removeListeners();
      window.removeEventListener('bgm-autoplay-ready', onReady);
      audio.removeEventListener('play', syncPlaying);
      audio.removeEventListener('pause', syncPlaying);
      audio.removeEventListener('ended', syncPlaying);
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
      window.localStorage.removeItem(STORAGE_KEY);
      audio.play().then(() => setPlaying(true)).catch(() => { });
    } else {
      audio.pause();
      setPlaying(false);
      window.localStorage.setItem(STORAGE_KEY, '1');
    }
  }, [ensureAudioContext]);

  return { playing, toggle, analyserRef };
}
