import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Badge } from '@/components/ui/badge';
import SectionShell from '../SectionShell';

function formatAwardBody(body?: string) {
    if (!body) return '';
    const normalized = body.replace(/\r\n/g, '\n');
    const lines = normalized.split('\n');
    const out: string[] = [];
    let inCode = false;

    for (const raw of lines) {
        const line = raw.trim();
        if (line.startsWith('```')) {
            inCode = !inCode;
            continue;
        }
        if (inCode) continue;

        if (!line) {
            if (out.length && out[out.length - 1] !== '') out.push('');
            continue;
        }

        const withoutHeading = line.replace(/^#{1,6}\s+/, '');
        if (withoutHeading.startsWith('- ')) {
            out.push(`• ${withoutHeading.slice(2)}`);
        } else {
            out.push(withoutHeading);
        }
    }

    return out.join('\n').trim();
}

function HoverTypewriter({ active, text, fallback }: { active: boolean; text: string; fallback: string }) {
    const [value, setValue] = useState('');
    const idxRef = useRef(0);

    useEffect(() => {
        let cancelled = false;
        let timer = 0;

        if (active) {
            idxRef.current = 0;
            setValue('');
        }

        const tick = () => {
            if (cancelled) return;

            const typeSpeed = 14;
            const backSpeed = 10;

            if (active) {
                if (idxRef.current >= text.length) return;
                idxRef.current += 1;
                setValue(text.slice(0, idxRef.current));
                timer = window.setTimeout(tick, typeSpeed);
                return;
            }

            if (idxRef.current <= 0) {
                idxRef.current = 0;
                setValue('');
                return;
            }

            idxRef.current -= 1;
            setValue(text.slice(0, idxRef.current));
            timer = window.setTimeout(tick, backSpeed);
        };

        timer = window.setTimeout(tick, active ? 80 : 0);

        return () => {
            cancelled = true;
            window.clearTimeout(timer);
        };
    }, [active, text]);

    return (
        <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
            {active || value ? value : fallback}
        </div>
    );
}

interface Award {
    slug: string;
    title: string;
    description: string;
    tags: string[];
    body?: string;
    link?: string;
    github?: string;
    year: number;
    featured: boolean;
    order: number;
}

interface AwardsSectionProps {
    awards?: Award[];
    isReady?: boolean;
}

export default function AwardsSection({ awards = [], isReady = false }: AwardsSectionProps) {
    const showL = isReady ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 };
    const showR = isReady ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 };
    const showY = isReady ? { y: 0, opacity: 1 } : { y: 15, opacity: 0 };
    const t = (delay: number) =>
        isReady
            ? { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const }
            : { duration: 0.3, delay: 0 };

    const [featuredIndex, setFeaturedIndex] = useState(0);
    const [hovering, setHovering] = useState(false);

    useEffect(() => {
        if (isReady) setFeaturedIndex(0);
    }, [isReady]);

    useEffect(() => {
        setHovering(false);
    }, [featuredIndex]);

    const count = awards.length;
    const canCycle = count > 1;
    const displayIndex = count === 0 ? 0 : featuredIndex + 1;

    const featured = count > 0 ? awards[featuredIndex] : undefined;
    const featuredHref = featured?.link || featured?.github;
    const featuredBodyText = formatAwardBody(featured?.body);
    const listRef = useRef<HTMLDivElement | null>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    const handlePrev = () => {
        if (!canCycle) return;
        setFeaturedIndex((prev) => (prev - 1 + count) % count);
    };

    const handleNext = () => {
        if (!canCycle) return;
        setFeaturedIndex((prev) => (prev + 1) % count);
    };

    useEffect(() => {
        if (!count) return;
        const el = itemRefs.current[featuredIndex];
        if (!el) return;
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, [count, featuredIndex]);

    return (
        <SectionShell
            sidebarLabel="奖项"
            sidebarVerticalText="AWARDS"
            isDark={false}
            tagLine="▼ / HNY0305LIN"
            badgeText="AWARDS"
            heading="获奖奖项"
            metaLine="// SUPER::PORTFOLIO::AWARDS::GET()"
            isReady={isReady}
        >
            {/* Featured + compact list layout */}
            <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-8 mb-10">
                {/* Featured card (60%) */}
                <motion.div
                    className="lg:w-[60%]"
                    initial={{ x: -20, opacity: 0 }}
                    animate={showL}
                    transition={t(0.3)}
                >
                    <AnimatePresence mode="wait">
                        {featured ? (
                            <motion.div
                                key={featured.slug}
                                className="group relative bg-white border p-8 md:p-10 flex flex-col"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                style={{ borderColor: 'rgba(0,0,0,0.10)' }}
                            >
                                <motion.div
                                    className="absolute inset-0 pointer-events-none"
                                    animate={
                                        hovering
                                            ? {
                                                opacity: [0.25, 0.6, 0.25],
                                            }
                                            : { opacity: 0 }
                                    }
                                    transition={
                                        hovering
                                            ? { duration: 1.4, repeat: Infinity, ease: 'easeInOut' }
                                            : { duration: 0.25 }
                                    }
                                    style={{
                                        border: '1px solid',
                                        borderColor: 'rgba(108,229,232,0.55)',
                                        boxShadow: '0 0 0 1px rgba(108,229,232,0.10) inset, 0 0 28px rgba(108,229,232,0.18)',
                                    }}
                                />
                                <span className="text-[5rem] md:text-[7rem] font-black text-black/12 text-display leading-none mb-4">
                                    {String(featuredIndex + 1).padStart(2, '0')}
                                </span>

                                <div className="text-[10px] uppercase tracking-[0.3em] text-black/40 font-medium font-mono mb-2">
                                    {featured.year || '—'}
                                </div>

                                <h3 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] mb-4 text-display">
                                    {featured.title}
                                </h3>

                                <div
                                    className="mb-6 flex-1 min-h-[84px]"
                                    onMouseEnter={() => setHovering(true)}
                                    onMouseLeave={() => setHovering(false)}
                                >
                                    {featuredBodyText ? (
                                        <HoverTypewriter
                                            key={featured.slug}
                                            active={hovering}
                                            text={featuredBodyText}
                                            fallback={featured.description}
                                        />
                                    ) : (
                                        <div className="text-gray-600 text-sm leading-relaxed">
                                            {featured.description}
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {featured.tags.map((tag) => (
                                        <Badge key={tag} variant="outline" className="border-black/10 text-gray-600 rounded-none text-xs">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>

                                {featuredHref && (
                                    <a
                                        href={featuredHref}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs uppercase tracking-widest text-[#0A0A0A] font-bold hover:text-[#6CE5E8] transition-colors duration-300"
                                    >
                                        VIEW AWARD →
                                    </a>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty"
                                className="bg-white border border-black/10 p-8 md:p-10 flex items-center justify-center"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <div className="text-center">
                                    <div className="text-sm font-bold text-[#0A0A0A] text-display mb-2">暂无奖项数据</div>
                                    <div className="text-xs text-black/40 font-mono">请确认 index.astro 已传入 awards</div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {count > 0 && (
                        <motion.div
                            className="mt-2 flex items-center justify-between"
                            initial={{ y: 15, opacity: 0 }}
                            animate={showY}
                            transition={t(0.5)}
                        >
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handlePrev}
                                    disabled={!canCycle}
                                    className="w-10 h-10 border border-black/15 flex items-center justify-center text-black/50 hover:border-[#6CE5E8] hover:text-[#6CE5E8] transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:border-black/10 disabled:text-black/20 disabled:hover:border-black/10 disabled:hover:text-black/20"
                                >
                                    ◀
                                </button>
                                <button
                                    onClick={handleNext}
                                    disabled={!canCycle}
                                    className="w-10 h-10 border border-black/15 flex items-center justify-center text-black/50 hover:border-[#6CE5E8] hover:text-[#6CE5E8] transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:border-black/10 disabled:text-black/20 disabled:hover:border-black/10 disabled:hover:text-black/20"
                                >
                                    ▶
                                </button>
                                <span className="text-xs text-black/40 font-mono ml-2">
                                    {String(displayIndex).padStart(2, '0')} / {String(count).padStart(2, '0')}
                                </span>
                            </div>
                        </motion.div>
                    )}
                </motion.div>

                {/* Compact list (40%) */}
                <motion.div
                    ref={listRef}
                    className="lg:w-[40%] flex flex-col gap-0 max-h-[60vh] lg:max-h-[70vh] overflow-y-auto pr-2"
                    initial={{ x: 20, opacity: 0 }}
                    animate={showR}
                    transition={t(0.4)}
                >
                    {awards.map((award, i) => {
                        const isActive = i === featuredIndex;
                        const href = award.link || award.github;
                        return (
                            <div
                                key={award.slug}
                                ref={(el) => { itemRefs.current[i] = el; }}
                                className={`border-b border-black/10 py-5 px-4 transition-colors duration-300 ${isActive ? 'bg-black/3' : 'hover:bg-black/3'
                                    }`}
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1 min-w-0">
                                        <button
                                            type="button"
                                            onClick={() => setFeaturedIndex(i)}
                                            className="group text-left w-full"
                                        >
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-[10px] text-black/30 font-mono">
                                                    {award.year || '—'}
                                                </span>
                                                <span className="text-[10px] text-black/30 font-mono">
                                                    {String(i + 1).padStart(2, '0')}
                                                </span>
                                            </div>
                                            <div className="text-sm font-bold text-[#0A0A0A] group-hover:text-[#6CE5E8] transition-colors duration-300 mt-1">
                                                {award.title}
                                            </div>
                                            <div className="text-[10px] text-gray-500 mt-2 line-clamp-2">
                                                {award.description}
                                            </div>
                                        </button>
                                        <div className="flex flex-wrap gap-1.5 mt-2">
                                            {award.tags.slice(0, 3).map((tag) => (
                                                <span key={tag} className="text-[10px] text-gray-500">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    {href ? (
                                        <a
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-black/30 hover:text-[#6CE5E8] transition-colors duration-300 text-sm mt-1"
                                        >
                                            ↗
                                        </a>
                                    ) : (
                                        <span className="text-black/15 text-sm mt-1">↗</span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </SectionShell>
    );
}
