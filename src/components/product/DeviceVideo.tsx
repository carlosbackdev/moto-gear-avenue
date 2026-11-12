import { useEffect, useRef } from 'react';

/** Play the silent loop only while visible; keep native playback controls available. */
export function DeviceVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    let manuallyPaused = false;
    let automaticPause = false;
    const syncPlayback = () => {
      if (visible && !motion.matches && !document.hidden && !manuallyPaused) {
        void video.play().catch(() => { /* Native controls remain available if autoplay is blocked. */ });
      } else if (!video.paused) {
        automaticPause = true;
        video.pause();
      }
    };
    const onPause = () => {
      if (!automaticPause) manuallyPaused = true;
      automaticPause = false;
    };
    const onPlay = () => { manuallyPaused = false; };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    }, { threshold: 0.25 });

    observer.observe(video);
    video.addEventListener('pause', onPause);
    video.addEventListener('play', onPlay);
    motion.addEventListener('change', syncPlayback);
    document.addEventListener('visibilitychange', syncPlayback);
    return () => {
      observer.disconnect();
      video.removeEventListener('pause', onPause);
      video.removeEventListener('play', onPlay);
      motion.removeEventListener('change', syncPlayback);
      document.removeEventListener('visibilitychange', syncPlayback);
      video.pause();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      controls
      preload="none"
      poster="/media/motogear-en-moto-poster.webp"
      aria-label="MotoGear instalado y funcionando en una Kawasaki"
      className="aspect-[9/16] max-h-[580px] w-full rounded-2xl object-contain"
    >
      <source src="/media/motogear-en-moto.mp4" type="video/mp4" />
      <a href="/media/motogear-en-moto.mp4">Ver MotoGear en funcionamiento</a>
    </video>
  );
}
