import { motion } from 'motion/react';
import SectionShell from '../SectionShell';

interface Skill {
  name: string;
  level: number;
  category: string;
}

interface SkillsSectionProps {
  isReady?: boolean;
}

export default function SkillsSection({ isReady = false }: SkillsSectionProps) {
  const showL = isReady ? { x: 0, opacity: 1 } : { x: -15, opacity: 0 };
  const showY = isReady ? { y: 0, opacity: 1 } : { y: 15, opacity: 0 };
  const t = (delay: number) =>
    isReady
      ? { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const }
      : { duration: 0.3, delay: 0 };

  const skills: Skill[] = [
    { name: 'HTML5', level: 100, category: 'FRONTEND' },
    { name: 'Astro', level: 90, category: 'FRONTEND' },
    { name: 'Vue.js', level: 79, category: 'FRONTEND' },
    { name: 'React', level: 78, category: 'FRONTEND' },
    { name: 'Next.js', level: 72, category: 'FRONTEND' },

    { name: 'TailwindCSS', level: 80, category: 'STYLING' },
    { name: 'CSS Animations', level: 78, category: 'STYLING' },

    { name: 'Java', level: 100, category: 'LANGUAGES' },
    { name: 'C#', level: 99, category: 'LANGUAGES' },
    { name: 'C++', level: 97, category: 'LANGUAGES' },
    { name: 'C', level: 90, category: 'LANGUAGES' },
    { name: 'Lua', level: 89, category: 'LANGUAGES' },
    { name: 'PHP', level: 88, category: 'LANGUAGES' },
    { name: 'Python', level: 85, category: 'LANGUAGES' },
    { name: 'TypeScript', level: 80, category: 'LANGUAGES' },
    { name: 'Rust', level: 77, category: 'LANGUAGES' },
    { name: 'Golang', level: 66, category: 'LANGUAGES' },

    { name: 'MySQL', level: 95, category: 'DATABASE' },
    { name: 'SQLServer', level: 88, category: 'DATABASE' },

    { name: 'Qt', level: 100, category: 'TOOLS & BACKEND' },
    { name: 'Node.js', level: 98, category: 'TOOLS & BACKEND' },
    { name: 'Nginx', level: 96, category: 'TOOLS & BACKEND' },
    { name: 'Markdown', level: 95, category: 'TOOLS & BACKEND' },
    { name: 'Hexo', level: 95, category: 'TOOLS & BACKEND' },
    { name: 'XML', level: 92, category: 'TOOLS & BACKEND' },
    { name: 'NestJS', level: 90, category: 'TOOLS & BACKEND' },
    { name: 'Docker', level: 87, category: 'TOOLS & BACKEND' },
    { name: 'Git', level: 85, category: 'TOOLS & BACKEND' },
    { name: 'GitHub', level: 85, category: 'TOOLS & BACKEND' },
    { name: 'Gitee', level: 85, category: 'TOOLS & BACKEND' },
    { name: 'Tauri', level: 83, category: 'TOOLS & BACKEND' },
    { name: 'LCEDA', level: 78, category: 'TOOLS & BACKEND' },

    { name: 'Android', level: 99, category: 'MOBILE & OS' },
    { name: 'Rocky', level: 95, category: 'MOBILE & OS' },
    { name: 'Ubuntu', level: 92, category: 'MOBILE & OS' },
    { name: 'HarmonyOS', level: 88, category: 'MOBILE & OS' },

    { name: 'Embedded', level: 96, category: 'IOT & EMBEDDED' },
    { name: 'MQTT', level: 95, category: 'IOT & EMBEDDED' },
    { name: 'ThingsBoard', level: 95, category: 'IOT & EMBEDDED' },
    { name: 'YourenIOT', level: 93, category: 'IOT & EMBEDDED' },
    { name: 'HomeAssistant', level: 92, category: 'IOT & EMBEDDED' },
    { name: 'NearLink', level: 85, category: 'IOT & EMBEDDED' },

    { name: 'OpenCV', level: 97, category: 'AI & CV' },
    { name: 'TensorFlow', level: 93, category: 'AI & CV' },
    { name: 'PaddlePaddle', level: 92, category: 'AI & CV' },
    { name: 'HuggingFace', level: 90, category: 'AI & CV' },

    { name: 'Blockchain', level: 100, category: 'BLOCKCHAIN' },
    { name: 'BitCoin', level: 95, category: 'BLOCKCHAIN' },
    { name: 'Ethereum', level: 90, category: 'BLOCKCHAIN' },
    { name: 'Solana', level: 88, category: 'BLOCKCHAIN' },
    { name: 'IPFS', level: 88, category: 'BLOCKCHAIN' },
    { name: 'Web3', level: 80, category: 'BLOCKCHAIN' },

    { name: 'Filmora', level: 90, category: 'DESIGN & MEDIA' },
    { name: 'Douyin', level: 88, category: 'DESIGN & MEDIA' },
    { name: 'Photoshop', level: 80, category: 'DESIGN & MEDIA' },
  ];

  // Group by category preserving insertion order
  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const categories = Object.keys(grouped);

  return (
    <SectionShell
      sidebarLabel="技能"
      sidebarVerticalText="SKILLS"
      isDark={false}
      tagLine="▼ / HNY0305LIN"
      badgeText="SKILLS"
      heading="技能专长"
      metaLine="// SUPER::PORTFOLIO::SKILLS::GET()"
      isReady={isReady}
    >
      {/* Category rows */}
      <div className="space-y-8 mb-12">
        {categories.map((category, ci) => (
          <motion.div
            key={category}
            initial={{ x: -15, opacity: 0 }}
            animate={showL}
            transition={t(0.3 + ci * 0.08)}
          >
            {/* Category label + separator */}
            <div className="flex items-center gap-4 mb-4">
              <span className="inline-block w-3 h-2 bg-[#0A0A0A] -skew-x-12 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#0A0A0A] whitespace-nowrap">
                {category}
              </span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Skill names inline */}
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {grouped[category].map((skill) => (
                <span
                  key={skill.name}
                  className={`text-base ${skill.level >= 90
                    ? 'font-bold text-[#0A0A0A]'
                    : skill.level >= 80
                      ? 'font-medium text-gray-700'
                      : 'font-normal text-gray-500'
                    }`}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom separator + quote */}
      <motion.div
        initial={{ y: 15, opacity: 0 }}
        animate={showY}
        transition={t(0.6)}
      >
        <div className="h-px bg-gray-200 mb-8" />
        <p className="text-gray-500 text-sm leading-relaxed max-w-2xl">
          Love alone could waken love! 只有爱才能唤醒爱。
        </p>
      </motion.div>
    </SectionShell>
  );
}
