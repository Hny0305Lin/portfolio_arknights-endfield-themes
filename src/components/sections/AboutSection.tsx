import { motion } from 'motion/react';
import { useCountUp } from '@/hooks/useCountUp';
import SectionShell from '../SectionShell';

function StatCounter({ value, label, suffix, isReady }: { value: number; label: string; suffix: string; isReady: boolean }) {
  const { ref, value: count } = useCountUp(value, 1.2, isReady);

  return (
    <div className="flex items-baseline gap-2 py-3 border-b border-gray-200 last:border-b-0">
      <span ref={ref} className="text-3xl md:text-4xl font-black text-[#6CE5E8] tabular-nums">
        {count}
      </span>
      <span className="text-2xl font-black text-[#6CE5E8]">{suffix}</span>
      <span className="text-xs uppercase tracking-widest text-gray-500 font-medium ml-2">{label}</span>
    </div>
  );
}

interface AboutSectionProps {
  isReady?: boolean;
}

export default function AboutSection({ isReady = false }: AboutSectionProps) {
  const showL = isReady ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 };
  const showR = isReady ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 };
  const showY = isReady ? { y: 0, opacity: 1 } : { y: 15, opacity: 0 };
  const t = (delay: number) =>
    isReady
      ? { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const }
      : { duration: 0.3, delay: 0 };

  const stats = [
    { value: 10, label: '年开发经验', suffix: '+' },
    { value: 50, label: '份项目完成', suffix: '+' },
    { value: 10, label: '份解决方案', suffix: '+' },
    { value: Infinity, label: '技术栈', suffix: '' },
    { value: 99, label: '满意度', suffix: '%' },
  ];

  const techStack = [
    'C#',
    'C',
    'C++',
    'Java',
    'MySQL',
    'PHP',
    'Rust',
    'Node',
    'Golang',
    'Next.js',
    'React',
    'MQTT',
    'SQL',
    'Git',
    'GitHub',
    'NestJS',
    'Vue',
    'Lua',
    'HTML5',
    'TypeScript',
    'XML',
    'Markdown',
    'Astro',
    'Nginx',
    'Embedded',
    'Rocky',
    'Android',
    'HarmonyOS',
    'NearLink',
    'HomeAssistant',
    'Hexo',
    'Gitee',
    'GitHub',
    'Git',
    'LCEDA',
    'Photoshop',
    'Filmora',
    'Douyin',
    'OpenCV',
    'PaddlePaddle',
    'TensorFlow',
    'HuggingFace',
    'Blockchain',
    'IPFS',
    'BitCoin',
    'Web3',
  ];

  return (
    <SectionShell
      sidebarLabel="关于"
      sidebarVerticalText="ABOUT"
      isDark={false}
      tagLine="▼ / HNY0305LIN"
      badgeText="ABOUT"
      heading="关于我"
      metaLine="// SUPER::PORTFOLIO::ABOUT::GET()"
      isReady={isReady}
    >
      {/* Two-column asymmetric layout */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 mb-12">
        {/* Left column — editorial intro (55%) */}
        <motion.div
          className="lg:w-[55%]"
          initial={{ x: -20, opacity: 0 }}
          animate={showL}
          transition={t(0.3)}
        >
          <p className="text-xl md:text-2xl lg:text-3xl font-bold text-[#0A0A0A] leading-snug mb-6">
            🌏 居住于中国，福建福州。
          </p>
          <p className="text-base text-gray-500 leading-relaxed mb-8">
            🤗 我是一个Java语言和Android软件应用开发的程序员。
          </p>
          <p className="text-base text-gray-500 leading-relaxed mb-8">
            🔭 我正在研究物联网应用专业、人工智能、嵌入式创新等内容。
          </p>
          <p className="text-base text-gray-500 leading-relaxed mb-8">
            🌊 我始终坚信比起涉足传统行业，互联网更像是海阔天空。
          </p>
          <p className="text-base text-gray-500 leading-relaxed mb-8">
            🌱 现在我开创了一家软件开发公司，名称叫: 芯异构（福州）信息科技有限公司。
          </p>
          <a
            href="https://www.haohanyh.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#6CE5E8] hover:text-[#0A0A0A] transition-colors duration-300 mb-8"
          >
            访问芯异构官网 →
          </a> <a
            href="https://aiqicha.baidu.com/company_detail_63223161956329"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#6CE5E8] hover:text-[#0A0A0A] transition-colors duration-300 mb-8"
          >
            在互联网上查看我公司 →
          </a>

          {/* Specialty labels */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-bold text-[#0A0A0A] uppercase tracking-wider">
            <span>计算机运维</span>
            <span className="text-[#6CE5E8]">·</span>
            <span>前端开发</span>
            <span className="text-[#6CE5E8]">·</span>
            <span>安卓应用</span>
            <span className="text-[#6CE5E8]">·</span>
            <span>数据库</span>
            <span className="text-[#6CE5E8]">·</span>
            <span>嵌入式</span>
            <span className="text-[#6CE5E8]">·</span>
            <span>图像处理</span>
            <span className="text-[#6CE5E8]">·</span>
            <span>物联网</span>
            <span className="text-[#6CE5E8]">·</span>
            <span>区块链</span>
            <span className="text-[#6CE5E8]">·</span>
            <span>人工智能</span>
          </div>
        </motion.div>

        {/* Right column — stats stacked (45%) */}
        <motion.div
          className="lg:w-[45%]"
          initial={{ x: 20, opacity: 0 }}
          animate={showR}
          transition={t(0.4)}
        >
          <div className="border border-gray-200 bg-white p-6 md:p-8">
            <h3 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-4">
              <span className="inline-block w-3 h-2 bg-[#0A0A0A] -skew-x-12" />
              KEY NUMBERS
            </h3>
            {stats.map((stat, i) => (
              <StatCounter key={i} {...stat} isReady={isReady} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Tech stack — single horizontal row */}
      <motion.div
        initial={{ y: 15, opacity: 0 }}
        animate={showY}
        transition={t(0.5)}
      >
        <h3 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-4">
          <span className="inline-block w-3 h-2 bg-[#0A0A0A] -skew-x-12" />
          TECH STACK
        </h3>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech, i) => (
            <motion.span
              key={tech}
              className="text-sm px-4 py-2 border border-[#6CE5E8]/30 bg-[#6CE5E8]/5 text-gray-700 font-medium hover:-translate-y-0.5 transition-transform duration-300"
              initial={{ y: 8, opacity: 0 }}
              animate={showY}
              transition={t(0.55 + i * 0.02)}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </SectionShell>
  );
}
