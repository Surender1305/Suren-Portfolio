'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';

/* ─── Skill Data ─── */
const ROW_1 = [
  'Flutter',
  'Dart',
  'Next.js',
  'React',
  'TypeScript',
  'OpenAI API',
  'LangChain',
  'Python',
  'Django',
  'TensorFlow Lite',
];

const ROW_2 = [
  'Supabase',
  'PostgreSQL',
  'Pinecone',
  'ChromaDB',
  'Hugging Face',
  'REST API',
  'Git',
  'GitHub',
  'Figma',
];

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

const CATEGORIES: SkillCategory[] = [
  {
    title: 'AI & Machine Learning',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 2a10 10 0 0 1 7.54 16.59A10 10 0 1 1 4.46 5.41 10 10 0 0 1 12 2z" />
        <path d="M12 6v12" />
        <path d="M6 12h12" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    skills: ['OpenAI API', 'LangChain', 'TensorFlow Lite', 'Pinecone / Vector DBs'],
  },
  {
    title: 'Mobile',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    skills: ['Flutter', 'Dart', 'React Native', 'PyTorch Mobile'],
  },
  {
    title: 'Frontend & Design',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    skills: ['Next.js', 'React', 'TypeScript', 'TailwindCSS', 'Figma'],
  },
  {
    title: 'Backend & Cloud',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    ),
    skills: ['Python', 'Django', 'FastAPI', 'Firebase', 'Supabase', 'PostgreSQL'],
  },
];

/* ─── Animation Variants ─── */
const sectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const marqueeContainerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const gridContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

/* ─── Skill Pill ─── */
function SkillPill({ name }: { name: string }) {
  return (
    <span
      className="inline-flex shrink-0 items-center rounded-full border border-glass-border
        bg-glass-bg px-6 py-3 text-sm font-medium text-white/80
        backdrop-blur-md transition-all duration-300
        hover:border-accent/20 hover:bg-white/[0.06] hover:text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]"
    >
      {name}
    </span>
  );
}

/* ─── Marquee Row ─── */
function MarqueeRow({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) {
  const prefersReduced = useReducedMotion();

  return (
    <div
      className="group relative flex overflow-hidden"
      aria-label={`Skills: ${items.join(', ')}`}
    >
      {/* Fade masks on left & right edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent md:w-32"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent md:w-32"
      />

      {/* Scrolling track — duplicate for seamless loop */}
      <div
        className={`flex shrink-0 gap-4 ${
          prefersReduced
            ? ''
            : reverse
              ? 'animate-marquee-reverse'
              : 'animate-marquee'
        } group-hover:[animation-play-state:paused]`}
      >
        {items.map((skill) => (
          <SkillPill key={skill} name={skill} />
        ))}
        {/* Duplicate for seamless infinite loop */}
        {items.map((skill) => (
          <SkillPill key={`dup-${skill}`} name={skill} />
        ))}
      </div>
    </div>
  );
}

/* ─── Category Card ─── */
function CategoryCard({ category }: { category: SkillCategory }) {
  return (
    <motion.div
      variants={cardVariants}
      className="glass group relative flex flex-col gap-4 p-6 transition-all duration-500
        hover:border-accent/15 hover:bg-white/[0.04]
        hover:shadow-[0_0_40px_rgba(59,130,246,0.06)]"
    >
      {/* Subtle corner glow on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-px -top-px h-20 w-20 rounded-tr-2xl
          bg-gradient-to-bl from-accent/5 to-transparent opacity-0 transition-opacity
          duration-500 group-hover:opacity-100"
      />

      {/* Icon */}
      <div
        className="flex h-10 w-10 items-center justify-center rounded-lg
          border border-glass-border bg-white/[0.03] text-accent transition-colors
          duration-300 group-hover:border-accent/20 group-hover:bg-accent/[0.08]"
      >
        {category.icon}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold tracking-wide text-white">
        {category.title}
      </h3>

      {/* Skills list */}
      <ul className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <li
            key={skill}
            className="rounded-full border border-glass-border bg-white/[0.02] px-3 py-1
              text-xs font-medium text-muted transition-all duration-300
              group-hover:border-white/10 group-hover:text-white/70"
          >
            {skill}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ═══════════════════════════════════════
   Skills Component
   ═══════════════════════════════════════ */
export default function Skills() {
  return (
    <section
      id="skills"
      aria-label="Skills and Technologies"
      className="section-padding relative overflow-hidden bg-background"
    >
      <motion.div
        className="mx-auto max-w-7xl"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* ── Heading ── */}
        <motion.div variants={headingVariants} className="mb-16 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-muted">
            What I Work With
          </p>
          <h2 className="text-gradient text-4xl font-bold md:text-6xl">
            Skills &amp; Technologies
          </h2>
        </motion.div>

        {/* ── Marquee Rows ── */}
        <motion.div
          variants={marqueeContainerVariants}
          className="mb-20 flex flex-col gap-4"
        >
          <MarqueeRow items={ROW_1} />
          <MarqueeRow items={ROW_2} reverse />
        </motion.div>

        {/* ── Category Grid ── */}
        <motion.div
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.title} category={category} />
          ))}
        </motion.div>
      </motion.div>

      {/* ── Bottom divider ── */}
      <div
        aria-hidden="true"
        className="line-divider absolute bottom-0 left-0 right-0"
      />
    </section>
  );
}
