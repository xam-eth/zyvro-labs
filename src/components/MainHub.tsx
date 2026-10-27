import React, { useEffect, useRef } from 'react';
import { GameProject, SystemSection } from '../types';
import {
  GAME_PROJECTS,
  SYSTEM_METADATA,
  BLOG_POSTS,
  ARCHIVE_LOGS,
  LAB_EXPERIMENTS,
  latestPostForProject
} from '../utils/constants';
import { sound } from '../utils/soundManager';
import {
  Play,
  ChevronRight,
  Layers,
  FlaskConical,
  BookOpen,
  ShieldAlert,
  Cpu,
  ExternalLink,
  Newspaper
} from 'lucide-react';

interface MainHubProps {
  onSelectProject: (project: GameProject) => void;
  onNavigate: (section: SystemSection) => void;
  onOpenBlog: (postId: string) => void;
}

/**
 * MAIN HUB — command center.
 *
 * Redesign note (25 Oct 2026): the old full-bleed 4K hero viewport is gone.
 * The hub now opens on a compact wire of CORE SELL CARDS — one small card per
 * active build, carrying its photo, status, two selling points and exactly two
 * actions (enter world / read update). Same industrial skin, a fraction of the
 * pixels, and no single game monopolises the first screen anymore.
 */
export const MainHub: React.FC<MainHubProps> = ({ onSelectProject, onNavigate, onOpenBlog }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Interactive 3D Particle Matrix Canvas (background ambience)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const nodeCount = 40;
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.4 + 0.15,
    }));

    let mouseX = width / 2;
    let mouseY = height / 2;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', onMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = 'rgba(215, 255, 63, 0.025)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        ctx.fillStyle = `rgba(215, 255, 63, ${node.alpha})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dist = Math.hypot(node.x - other.x, node.y - other.y);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(215, 255, 63, ${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }

        const mouseDist = Math.hypot(node.x - mouseX, node.y - mouseY);
        if (mouseDist < 160) {
          ctx.strokeStyle = `rgba(215, 255, 63, ${0.25 * (1 - mouseDist / 160)})`;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.stroke();
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div className="relative min-h-screen pt-16 pb-24 md:pl-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col justify-between select-none">
      {/* Background Interactive Particle Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <canvas ref={canvasRef} className="w-full h-full opacity-60" />
      </div>

      {/* ========================================================
          STATE BANNER
      ======================================================== */}
      <div className="relative z-10 pt-4 md:pt-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#202020] pb-3 mb-4">
          <div className="flex items-center space-x-3">
            <span className="px-2 py-0.5 bg-[#171717] border border-[#292929] text-[10px] font-mono tracking-widest text-[#D7FF3F] uppercase">
              COMMAND CENTER // ROOT_SYS
            </span>
            <span className="text-xs text-[#A0A0A0] font-mono hidden sm:inline">
              ZYVRO LABS DIGITAL WORLD
            </span>
          </div>

          <div className="flex items-center space-x-4 text-xs font-mono text-[#666666]">
            <span className="flex items-center gap-1.5 text-[#D7FF3F]">
              <Cpu className="w-3.5 h-3.5 animate-pulse" />
              <span>KERNEL: ACTIVE</span>
            </span>
            <span className="hidden md:inline">BUILD: {SYSTEM_METADATA.build}</span>
          </div>
        </div>
      </div>

      {/* ========================================================
          PROJECT WIRE // CORE SELL CARDS (compact, no giant hero)
      ======================================================== */}
      <div className="relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#202020] pb-2 mb-3">
          <div className="flex items-center space-x-2 text-[10px] font-mono text-[#D7FF3F] tracking-widest uppercase">
            <Layers className="w-3.5 h-3.5" />
            <span>PROJECT WIRE // CORE SELL CARDS</span>
            <span className="text-[#666666]">|</span>
            <span className="text-[#A0A0A0]">{GAME_PROJECTS.length} ACTIVE BUILDS</span>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('projects');
            }}
            onMouseEnter={() => sound.playHover()}
            data-cursor="interact"
            data-cursor-label="SELECTION DECK"
            className="text-[10px] font-mono text-[#A0A0A0] hover:text-[#D7FF3F] tracking-widest uppercase transition-colors"
          >
            [ FULL SELECTION DECK → ]
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
          {GAME_PROJECTS.map((project) => (
            <div
              key={project.id}
              className="group relative border border-[#202020] bg-[#101010] hover:border-[#D7FF3F]/60 transition-all duration-300 overflow-hidden flex flex-col hover:shadow-[0_0_18px_rgba(215,255,63,0.12)]"
            >
              {/* Photo strip */}
              <div className="relative overflow-hidden bg-[#050505]">
                <img
                  src={project.images.cover}
                  alt={project.title}
                  className="w-full h-24 object-cover object-center filter contrast-105 group-hover:scale-[1.05] transition-transform duration-500"
                />
                <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-[#080808]/90 border border-[#262626] text-[9px] font-mono font-bold text-[#D7FF3F] tracking-widest backdrop-blur-md">
                  {project.code}
                </span>
                <span className="absolute top-2 right-2 px-1.5 py-0.5 bg-[#080808]/90 border border-[#262626] text-[9px] font-mono text-[#FFB800] tracking-widest backdrop-blur-md">
                  {project.status}
                </span>
                {project.featured && (
                  <span className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-[#D7FF3F] text-[#080808] text-[8px] font-mono font-bold tracking-widest">
                    FIRST RELEASE
                  </span>
                )}
              </div>

              {/* Core sell body */}
              <div className="p-3 flex flex-col gap-2 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-[13px] font-bold font-display tracking-wide text-white uppercase leading-tight group-hover:text-[#D7FF3F] transition-colors">
                    {project.title}
                  </h3>
                  <span title={`THREAT: ${project.threatLevel}`}>
                    <ShieldAlert className="w-3.5 h-3.5 text-[#FFB800] shrink-0 mt-0.5" />
                  </span>
                </div>
                <p className="text-[9px] font-mono text-[#666666] tracking-wider uppercase leading-snug">
                  {project.genre}
                </p>

                <ul className="space-y-1">
                  {project.coreSell.slice(0, 2).map((sell) => (
                    <li key={sell} className="flex items-start gap-1.5 text-[10px] font-mono text-[#A0A0A0] leading-snug">
                      <span className="text-[#D7FF3F] mt-px">▸</span>
                      <span className="line-clamp-2">{sell}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-2 border-t border-[#1a1a1a] flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      sound.playAccessGranted();
                      onSelectProject(project);
                    }}
                    onMouseEnter={() => sound.playHover()}
                    data-cursor="interact"
                    data-cursor-label="ENTER WORLD"
                    className="px-2.5 py-1.5 bg-[#D7FF3F] hover:bg-white text-[#080808] font-mono font-bold text-[9px] tracking-widest uppercase transition-all flex items-center gap-1"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>ENTER</span>
                  </button>
                  <button
                    onClick={() => {
                      sound.playClick();
                      const post = latestPostForProject(project.id);
                      if (post) onOpenBlog(post.id);
                      else onNavigate('blog');
                    }}
                    onMouseEnter={() => sound.playHover()}
                    data-cursor="interact"
                    data-cursor-label="BUILD UPDATE"
                    className="px-2.5 py-1.5 bg-[#121212] hover:bg-[#1f1f1f] border border-[#292929] hover:border-[#D7FF3F] text-[#A0A0A0] hover:text-[#D7FF3F] font-mono font-bold text-[9px] tracking-widest uppercase transition-all flex items-center gap-1"
                  >
                    <Newspaper className="w-3 h-3" />
                    <span>UPDATE</span>
                  </button>
                  <span className="ml-auto text-[8px] font-mono text-[#555555] truncate" title={project.build}>
                    {project.build}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================
          DEV BLOG // LATEST BUILD UPDATE WIRE (COMPACT CARDS)
      ======================================================== */}
      <div className="relative z-10 mt-6">
        <div className="flex items-center justify-between gap-3 border-b border-[#202020] pb-2 mb-3">
          <div className="flex items-center space-x-2 text-[10px] font-mono text-[#D7FF3F] tracking-widest uppercase">
            <Newspaper className="w-3.5 h-3.5" />
            <span>DEV BLOG // LATEST BUILD UPDATE</span>
            <span className="text-[#666666]">|</span>
            <span className="text-[#A0A0A0]">{BLOG_POSTS.length} TRANSMISSIONS FILED</span>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('blog');
            }}
            onMouseEnter={() => sound.playHover()}
            data-cursor="interact"
            data-cursor-label="ALL UPDATES"
            className="text-[10px] font-mono text-[#A0A0A0] hover:text-[#D7FF3F] tracking-widest uppercase transition-colors"
          >
            [ ALL UPDATES → ]
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* Lead transmission: the newest filed update */}
          <div
            onClick={() => {
              sound.playAccessGranted();
              onOpenBlog(BLOG_POSTS[0].id);
            }}
            onMouseEnter={() => sound.playHover()}
            data-cursor="select"
            data-cursor-label="READ UPDATE"
            className="lg:col-span-2 group grid grid-cols-1 sm:grid-cols-5 border border-[#262626] bg-[#0e0e0e] hover:border-[#D7FF3F]/60 transition-all duration-300 cursor-pointer overflow-hidden shadow-lg hover:shadow-[0_0_25px_rgba(215,255,63,0.12)]"
          >
            <div className="sm:col-span-2 relative overflow-hidden bg-[#050505]">
              <img
                src={BLOG_POSTS[0].heroImage}
                alt={BLOG_POSTS[0].title}
                className="w-full h-32 sm:h-full object-cover object-center filter contrast-105 group-hover:scale-[1.04] transition-transform duration-700"
              />
              <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-[#D7FF3F] text-[#080808] text-[9px] font-mono font-bold tracking-widest">
                {BLOG_POSTS[0].code} · LATEST
              </span>
            </div>
            <div className="sm:col-span-3 p-3.5 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[9px] font-mono text-[#666666] uppercase">
                <span>{BLOG_POSTS[0].date}</span>
                <span className="text-[#333333]">|</span>
                <span>{BLOG_POSTS[0].category}</span>
                <span className="text-[#333333]">|</span>
                <span>{BLOG_POSTS[0].readTime}</span>
              </div>
              <h3 className="text-sm md:text-base font-bold font-display tracking-wide text-white uppercase leading-snug group-hover:text-[#D7FF3F] transition-colors line-clamp-2">
                {BLOG_POSTS[0].title}
              </h3>
              <p className="text-[10px] font-mono text-[#888888] leading-relaxed line-clamp-2">
                {BLOG_POSTS[0].hook}
              </p>
              <div className="mt-auto pt-2 border-t border-[#1a1a1a] flex items-center justify-between text-[10px] font-mono text-[#D7FF3F]">
                <span className="font-bold tracking-wider">[ READ FULL UPDATE ]</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Two compact follow-ups */}
          <div className="flex flex-col gap-3">
            {BLOG_POSTS.slice(1, 3).map((post) => (
              <div
                key={post.id}
                onClick={() => {
                  sound.playClick();
                  onOpenBlog(post.id);
                }}
                onMouseEnter={() => sound.playHover()}
                data-cursor="select"
                data-cursor-label="READ"
                className="group flex-1 flex gap-3 border border-[#202020] bg-[#101010] hover:border-[#D7FF3F]/60 transition-all duration-300 cursor-pointer p-2 overflow-hidden"
              >
                <img
                  src={post.heroImage}
                  alt={post.title}
                  className="w-20 h-full min-h-[64px] object-cover object-center shrink-0 filter contrast-105"
                />
                <div className="min-w-0 flex flex-col gap-1 py-0.5 pr-1">
                  <span className="text-[9px] font-mono text-[#666666] uppercase">
                    {post.code} · {post.date}
                  </span>
                  <h4 className="text-[11px] font-bold font-display tracking-wide text-white uppercase leading-snug line-clamp-2 group-hover:text-[#D7FF3F] transition-colors">
                    {post.title}
                  </h4>
                  <span className="mt-auto text-[9px] font-mono font-bold text-[#D7FF3F] tracking-wider">[ OPEN ]</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================
          COMPACT SECTOR INDEX (SMALLER CARDS, SAME SKIN)
      ======================================================== */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3 my-6">
        {[
          {
            term: 'SECTOR // 01',
            title: 'PROJECT WORLDS',
            icon: <Layers className="w-4 h-4 text-[#D7FF3F] group-hover:scale-110 transition-transform" />,
            desc: 'Tactical simulations, survival horror complexes and void exploration engines.',
            foot: `[ ${GAME_PROJECTS.length} ACTIVE BUILDS ]`,
            go: 'projects' as SystemSection
          },
          {
            term: 'SECTOR // 02',
            title: 'ZYVRO LAB R&D',
            icon: <FlaskConical className="w-4 h-4 text-[#D7FF3F] group-hover:scale-110 transition-transform" />,
            desc: 'Live canvas experiments: creature kinematics, terrain matrices, gravity solvers.',
            foot: `[ ${LAB_EXPERIMENTS.length} PROTOTYPES ]`,
            go: 'lab' as SystemSection
          },
          {
            term: 'SECTOR // 03',
            title: 'DEV ARCHIVE',
            icon: <BookOpen className="w-4 h-4 text-[#D7FF3F] group-hover:scale-110 transition-transform" />,
            desc: 'Design documents, AI logic studies and combat post-mortems from the repos.',
            foot: `[ ${ARCHIVE_LOGS.length} LOGS ]`,
            go: 'archive' as SystemSection
          },
          {
            term: 'SECTOR // 04',
            title: 'DEV BLOG',
            icon: <Newspaper className="w-4 h-4 text-[#D7FF3F] group-hover:scale-110 transition-transform" />,
            desc: 'Build update wire: one hook, one promise, one evidence table per post.',
            foot: `[ ${BLOG_POSTS.length} UPDATES ]`,
            go: 'blog' as SystemSection
          }
        ].map((card) => (
          <div
            key={card.term}
            onClick={() => {
              sound.playClick();
              onNavigate(card.go);
            }}
            onMouseEnter={() => sound.playHover()}
            data-cursor="select"
            data-cursor-label={card.title}
            className="group relative p-3.5 bg-[#101010] border border-[#202020] hover:border-[#D7FF3F]/60 transition-all duration-300 cursor-pointer overflow-hidden hover:shadow-[0_0_18px_rgba(215,255,63,0.12)] flex flex-col justify-between"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-[#D7FF3F] opacity-0 group-hover:opacity-100 transition-opacity" />
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-mono text-[#A0A0A0] tracking-widest uppercase">{card.term}</span>
                {card.icon}
              </div>
              <h3 className="text-sm font-bold font-display text-white tracking-wider mb-1 group-hover:text-[#D7FF3F] transition-colors uppercase">
                {card.title}
              </h3>
              <p className="text-[10px] text-[#A0A0A0] font-mono leading-relaxed line-clamp-2">{card.desc}</p>
            </div>
            <div className="pt-2 mt-2 border-t border-[#1a1a1a] flex items-center justify-between text-[10px] font-mono text-[#D7FF3F]">
              <span className="font-bold tracking-wider">{card.foot}</span>
              <ExternalLink className="w-3 h-3" />
            </div>
          </div>
        ))}
      </div>

      {/* ========================================================
          BOTTOM SYSTEM MANIFESTO STRIP
      ======================================================== */}
      <div className="relative z-10 border border-[#202020] bg-[#0c0c0c] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#A0A0A0]">
        <div className="flex items-center space-x-3">
          <span className="text-[#D7FF3F] font-bold">SYS // IDENTIFIER:</span>
          <span>ZYVRO LABS IS A DIGITAL WORLD. NOT A CORPORATE HOMEPAGE.</span>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('origin');
            }}
            className="text-white hover:text-[#D7FF3F] underline underline-offset-4 tracking-wider"
          >
            VIEW ORIGIN MANIFESTO →
          </button>
        </div>
      </div>
    </div>
  );
};
