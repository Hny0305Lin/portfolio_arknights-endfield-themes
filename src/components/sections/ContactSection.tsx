import { motion } from 'motion/react';
import { Github, Mail, Twitter } from 'lucide-react';
import SectionShell from '../SectionShell';

interface ContactSectionProps {
  isReady?: boolean;
}

export default function ContactSection({ isReady = false }: ContactSectionProps) {
  const show = isReady ? { y: 0, opacity: 1 } : { y: 15, opacity: 0 };
  const t = (delay: number) =>
    isReady
      ? { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const }
      : { duration: 0.3, delay: 0 };

  const socialLinks = [
    { icon: Github, label: 'GitHub', url: 'https://github.com/Hny0305Lin' },
    { icon: Mail, label: 'Email', url: 'mailto:lmj-mc@outlook.com' },
  ];

  return (
    <SectionShell
      sidebarLabel="联系"
      sidebarVerticalText="CONTACT"
      isDark={true}
      tagLine="▼ / HNY0305LIN"
      badgeText="CONTACT"
      heading="联系我"
      metaLine="// SUPER::PORTFOLIO::CONTACT::GET()"
      isReady={isReady}
    >
      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 mb-12">
        {/* Left: Large CTA statement (55%) */}
        <motion.div
          className="lg:w-[55%]"
          initial={{ y: 15, opacity: 0 }}
          animate={show}
          transition={t(0.3)}
        >
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#F0F0F0] text-display leading-[0.95] mb-6">
            LET'S WORK
            <br />
            <span className="text-[#6CE5E8]">TOGETHER</span>
          </h3>

          <p className="text-gray-400 text-base mb-8">
            有项目想要合作？或者只是想打个招呼？随时联系我！
          </p>
        </motion.div>

        {/* Right: Direct info (45%) */}
        <motion.div
          className="lg:w-[45%]"
          initial={{ y: 15, opacity: 0 }}
          animate={show}
          transition={t(0.4)}
        >
          <div className="border border-white/8 p-6 md:p-8 mb-6">
            <h3 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-6">
              <span className="inline-block w-3 h-2 bg-white -skew-x-12" />
              CONTACT
            </h3>
            <div className="h-px bg-white/8 mb-6" />
            <div className="space-y-5">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">邮箱</p>
                <p className="text-[#F0F0F0] text-sm">lmj-mc@outlook.com</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">位置</p>
                <p className="text-[#F0F0F0] text-sm">中国 福建 福州 台江区</p>
              </div>
            </div>
          </div>

          {/* Status indicator */}
          <div className="border border-[#6CE5E8]/30 p-5">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#6CE5E8] animate-pulse" />
              <span className="text-[#F0F0F0] font-bold text-sm uppercase tracking-wider">
                开放合作
              </span>
            </div>
            <p className="text-gray-500 text-xs mt-2">开放远程合作机会</p>
          </div>
        </motion.div>
      </div>

      {/* Social links as flat rectangles */}
      <motion.div
        className="mb-8"
        initial={{ y: 15, opacity: 0 }}
        animate={show}
        transition={t(0.5)}
      >
        <div className="flex flex-wrap gap-3">
          {socialLinks.map((social, i) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-3 border border-white/10 text-white hover:bg-[#6CE5E8] hover:text-black hover:border-[#6CE5E8] transition-all duration-300"
                aria-label={social.label}
                initial={{ y: 8, opacity: 0 }}
                animate={show}
                transition={t(0.55 + i * 0.06)}
              >
                <Icon size={16} />
                <span className="text-xs font-bold uppercase tracking-wider">{social.label}</span>
              </motion.a>
            );
          })}
        </div>
      </motion.div>

      {/* Footer bar */}
      <motion.div
        className="bg-[#6CE5E8] py-4 px-6 -mx-6 md:-mx-10 lg:-mx-16 flex items-center justify-between"
        initial={{ y: 15, opacity: 0 }}
        animate={show}
        transition={t(0.65)}
      >
        <p className="text-black font-bold text-xs uppercase tracking-wider">
          &copy; 2025 HNY0305LIN
        </p>
        <p className="text-black/50 text-[10px] uppercase tracking-wider">
          Built with React & Astro
        </p>
      </motion.div>
    </SectionShell>
  );
}
