import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface GallerySectionProps {
  isReady?: boolean;
}

interface Photo {
  src: string;
  title: string;
  subtitle: string;
  tag: string;
}

const PHOTO_CDN_PERFIX = 'https://image34.567890123.xyz';

const photos: Photo[] = [
  { src: '/portfolio/1.webp', title: '海景', subtitle: '福建平潭 · 2024', tag: '自然' },
  { src: '/portfolio/2.webp', title: '创新创业大赛', subtitle: '预警前线 · 2023', tag: '科技' },
  { src: '/portfolio/3.webp', title: '创新创业大赛', subtitle: '活土壤 · 2024', tag: '科技' },
  { src: '/portfolio/4.webp', title: '区块链', subtitle: 'Gateio · 2023', tag: 'Web3' },
  { src: '/portfolio/5.webp', title: '图像识别', subtitle: 'TensorFlow · 2023', tag: '科技' },
  { src: '/portfolio/6.webp', title: '图像识别', subtitle: 'OpenCV · 2024', tag: '科技' },
];

export default function GallerySection({ isReady = false }: GallerySectionProps) {
  const showL = isReady ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 };
  const showY = isReady ? { y: 0, opacity: 1 } : { y: 15, opacity: 0 };
  const t = (delay: number) =>
    isReady
      ? { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const }
      : { duration: 0.3, delay: 0 };

  const [index, setIndex] = useState(0);
  // 即使使用全量渲染，direction 依然有助于确定非当前图片的静止位置
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (isReady) setIndex(0);
  }, [isReady]);

  const navigate = useCallback(
    (next: number) => {
      if (next < 0 || next >= photos.length || next === index) return;
      setDirection(next > index ? 1 : -1);
      setIndex(next);
    },
    [index],
  );

  const handlePrev = () => navigate(index - 1);
  const handleNext = () => navigate(index + 1);

  const current = photos[index];
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden pt-16 md:pt-20">
      <div className="flex flex-1 min-h-0">
        {/* Desktop: left sidebar strip */}
        <motion.div
          className="hidden md:flex w-[120px] lg:w-[160px] bg-[#6CE5E8] shrink-0 flex-col items-center justify-between py-10 relative overflow-hidden"
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={isReady ? { clipPath: 'inset(0 0 0% 0)' } : { clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.6, delay: 0, ease: [0.22, 1, 0.36, 1] }}
        >
          <div />
          <motion.span
            className="vertical-text text-black font-black text-lg lg:text-xl tracking-[0.3em] uppercase select-none"
            initial={{ opacity: 0 }}
            animate={isReady ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            GALLERY
          </motion.span>
          <motion.span
            className="text-black/60 text-xs font-bold tracking-wider"
            initial={{ opacity: 0 }}
            animate={isReady ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            影集
          </motion.span>
        </motion.div>

        {/* Main content area */}
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex-1 flex flex-col lg:flex-row min-h-0">
            {/* Left metadata panel — desktop only */}
            <motion.div
              className="hidden lg:flex w-[280px] xl:w-[320px] shrink-0 flex-col justify-between px-8 xl:px-10 py-10 border-r border-white/8"
              initial={{ x: -20, opacity: 0 }}
              animate={showL}
              transition={t(0.2)}
            >
              {/* Top info */}
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-mono mb-6">
                  ▼ / Hny0305Lin
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.tag}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-2 mb-6">
                      <span className="inline-block w-5 h-3.5 bg-white -skew-x-12" />
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#F0F0F0]">
                        {current.tag}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="h-px bg-white/8 mb-6" />

                <div className="mb-5">
                  <p className="text-[10px] uppercase tracking-widest text-white/30 font-mono mb-1.5">
                    // 主题
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.h3
                      key={current.title}
                      className="text-2xl xl:text-3xl font-black text-[#F0F0F0] text-display"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {current.title}
                    </motion.h3>
                  </AnimatePresence>
                </div>

                <div className="mb-8">
                  <p className="text-[10px] uppercase tracking-widest text-white/30 font-mono mb-1.5">
                    // 信息
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={current.subtitle}
                      className="text-sm text-gray-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {current.subtitle}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>

              {/* Bottom: oversized number */}
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/20 font-mono mb-1">
                  HNY0305LIN
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/15 font-bold mb-2">
                  PHOTOGRAPHY
                </div>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={index}
                    className="block text-[7rem] xl:text-[8rem] font-black text-white/4 text-display leading-none -ml-1"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {pad(index + 1)}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Image area */}
            <div className="flex-1 relative min-h-0 flex flex-col">
              {/* Image container */}
              <motion.div
                className="relative overflow-hidden bg-[#111] h-[55svh] min-h-[280px] md:h-[60svh] lg:h-auto lg:flex-1 lg:min-h-[420px]"
                initial={{ opacity: 0 }}
                animate={isReady ? { opacity: 1 } : { opacity: 0 }}
                transition={t(0.15)}
              >
                {photos.map((photo, i) => {
                  // 计算每张图片相对于当前 index 的状态
                  const isActive = i === index;
                  const isBefore = i < index;
                  // 如果是当前图片，x=0。如果在左边，x=-100(或-40)。如果在右边，x=100(或40)。
                  const xPos = isActive ? 0 : isBefore ? -40 : 40;

                  return (
                    <motion.img
                      key={photo.src}
                      src={`${PHOTO_CDN_PERFIX}${photo.src}`}
                      alt={photo.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      animate={{
                        opacity: isActive ? 1 : 0,
                        x: xPos,
                        scale: isActive ? 1 : 1.02, // 细微缩放效果
                        zIndex: isActive ? 10 : 0,
                        // 当图片变的不活跃时，禁用指针事件，防止误触
                        pointerEvents: isActive ? 'auto' : 'none',
                      }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      draggable={false}
                      loading="eager"
                    />
                  );
                })}

                {/* Right-edge vertical text */}
                <motion.div
                  className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:block z-20 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={isReady ? { opacity: 1 } : { opacity: 0 }}
                  transition={t(0.5)}
                >
                  <span className="vertical-text text-[10px] font-bold uppercase tracking-[0.4em] text-white/20 select-none">
                    THROUGH THE LENS
                  </span>
                </motion.div>

                {/* Corner crosshairs */}
                <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/20 hidden md:block z-20" />
                <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/20 hidden md:block z-20" />
              </motion.div>

              {/* Mobile: photo info overlay at bottom of image */}
              <motion.div
                className="lg:hidden px-5 py-4 border-b border-white/8"
                initial={{ y: 15, opacity: 0 }}
                animate={showY}
                transition={t(0.3)}
              >
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-block w-3 h-2 bg-white -skew-x-12" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                        {current.tag}
                      </span>
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.h3
                        key={current.title}
                        className="text-xl font-black text-[#F0F0F0] text-display"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {current.title}
                      </motion.h3>
                    </AnimatePresence>
                    <p className="text-xs text-gray-500 mt-0.5">{current.subtitle}</p>
                  </div>
                  <span className="text-3xl font-black text-white/6 text-display leading-none">
                    {pad(index + 1)}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom: navigation bar */}
          <motion.div
            className="shrink-0 h-12 md:h-14 border-t border-white/8 flex items-center justify-between px-5 md:px-8 bg-[#0A0A0A] relative z-20"
            initial={{ y: 15, opacity: 0 }}
            animate={showY}
            transition={t(0.5)}
          >
            {/* Left: decorative tag */}
            <span className="text-[10px] text-white/25 font-mono uppercase tracking-wider hidden md:inline">
              ▼ / GALLERY
            </span>

            {/* Right: navigation controls */}
            <div className="flex items-center gap-3 ml-auto">
              <button
                onClick={handlePrev}
                disabled={index === 0}
                className="w-8 h-8 border border-white/15 flex items-center justify-center text-white/40 hover:border-[#6CE5E8] hover:text-[#6CE5E8] transition-colors duration-300 disabled:opacity-20 disabled:hover:border-white/15 disabled:hover:text-white/40 text-xs"
              >
                ◀
              </button>
              <span className="text-xs text-white/40 font-mono tabular-nums min-w-16 text-center">
                {pad(index + 1)} / {pad(photos.length)}
              </span>
              <button
                onClick={handleNext}
                disabled={index === photos.length - 1}
                className="w-8 h-8 border border-white/15 flex items-center justify-center text-white/40 hover:border-[#6CE5E8] hover:text-[#6CE5E8] transition-colors duration-300 disabled:opacity-20 disabled:hover:border-white/15 disabled:hover:text-white/40 text-xs"
              >
                ▶
              </button>
            </div>
          </motion.div>

          {/* Footer bar */}
          <motion.div
            className="shrink-0 border-t border-white/8 bg-[#0A0A0A] px-5 md:px-8 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-1.5 md:gap-0 relative z-20"
            initial={{ y: 15, opacity: 0 }}
            animate={showY}
            transition={t(0.6)}
          >
            <p className="text-[10px] text-white/30 font-mono uppercase tracking-wider">
              &copy; {(new Date().getFullYear())} 林孟嘉 <span className="text-white/15">&middot;</span> Built with
              Astro
            </p>
            <div className="flex items-center gap-3 text-[10px] text-white/20 font-mono">
              <a
                href="https://beian.miit.gov.cn/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#6CE5E8] text-display transition-colors duration-300"
              >
                域名备案 - 闽ICP备2026003001号-1
              </a>
              <a
                href="https://beian.mps.gov.cn/#/query/webSearch?code=44162302000035"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#6CE5E8] text-display transition-colors duration-300"
              >
                公安网监 - 闽公网安备35010302000932号
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
