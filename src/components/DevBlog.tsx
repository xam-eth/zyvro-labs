import React from 'react';
import { BlogPost, GameProject } from '../types';
import { BLOG_POSTS, GAME_PROJECTS } from '../utils/constants';
import { sound } from '../utils/soundManager';
import {
  ArrowLeft,
  CalendarDays,
  ChevronRight,
  ExternalLink,
  FileText,
  Fingerprint,
  Newspaper,
  PenLine,
  Timer,
  Cpu
} from 'lucide-react';

interface DevBlogProps {
  activePostId: string | null;
  onSelectPost: (postId: string | null) => void;
  onOpenProject: (project: GameProject) => void;
}

const postProject = (post: BlogPost): GameProject | undefined =>
  GAME_PROJECTS.find((project) => project.id === post.projectId);

/**
 * DEV BLOG — the public development feed. Same industrial OS skin as the rest
 * of the system, but the cards are deliberately compact: the feed is a news
 * wire, not a gallery. Headlines carry the hook; the evidence table carries
 * the proof; every post ends in one action only.
 */
export const DevBlog: React.FC<DevBlogProps> = ({ activePostId, onSelectPost, onOpenProject }) => {
  const activePost = BLOG_POSTS.find((post) => post.id === activePostId) ?? null;

  /* ============================================================
     READER VIEW
  ============================================================ */
  if (activePost) {
    const project = postProject(activePost);
    return (
      <div className="relative min-h-screen pt-20 pb-28 md:pl-20 px-4 md:px-8 max-w-5xl mx-auto select-none">
        {/* Breadcrumb / back wire */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#202020] pb-3 mb-6">
          <button
            onClick={() => {
              sound.playClick();
              onSelectPost(null);
            }}
            onMouseEnter={() => sound.playHover()}
            data-cursor="interact"
            data-cursor-label="BACK"
            className="flex items-center gap-2 text-[11px] font-mono text-[#A0A0A0] hover:text-[#D7FF3F] transition-colors uppercase tracking-widest"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>[ BACK TO UPDATE FEED ]</span>
          </button>
          <div className="flex items-center gap-2 text-[10px] font-mono text-[#666666]">
            <Fingerprint className="w-3.5 h-3.5 text-[#D7FF3F]" />
            <span>SOURCE: {activePost.sourceBranch}</span>
            {postProject(activePost)?.sourcePublic === false && (
              <span className="px-1.5 py-0.5 bg-[#171717] border border-[#292929] text-[#FFB800] tracking-widest">
                PRIVATE REPO // NO CODE LINKS
              </span>
            )}
          </div>
        </div>

        {/* Headline block */}
        <header className="space-y-4 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2 py-0.5 bg-[#D7FF3F] text-[#080808] text-[10px] font-mono font-bold tracking-widest">
              {activePost.code}
            </span>
            <span className="px-2 py-0.5 bg-[#171717] border border-[#292929] text-[10px] font-mono tracking-widest text-[#A0A0A0] uppercase">
              {activePost.category}
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-mono text-[#666666]">
              <CalendarDays className="w-3 h-3" /> {activePost.date}
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-mono text-[#666666]">
              <Timer className="w-3 h-3" /> {activePost.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-[2.6rem] font-black font-display tracking-tight text-white uppercase leading-[1.05]">
            {activePost.title}
          </h1>

          <p className="text-sm md:text-base font-mono text-[#C0C0C0] leading-relaxed max-w-3xl">
            {activePost.deck}
          </p>

          {/* The hook, set as a terminal transmission */}
          <div className="border-l-2 border-[#D7FF3F] bg-[#101010] p-4">
            <div className="flex items-center gap-2 text-[10px] font-mono text-[#D7FF3F] tracking-widest uppercase mb-1.5">
              <PenLine className="w-3.5 h-3.5" />
              <span>HOOK // WHY THIS EXISTS</span>
            </div>
            <p className="text-xs md:text-sm font-mono text-[#E0E0E0] leading-relaxed">{activePost.hook}</p>
          </div>
        </header>

        {/* Hero artwork with calipers */}
        <div className="relative border border-[#262626] bg-[#090909] overflow-hidden mb-8 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#D7FF3F] to-transparent z-20" />
          <span className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#D7FF3F] z-20 pointer-events-none" />
          <span className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#D7FF3F] z-20 pointer-events-none" />
          <span className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#D7FF3F] z-20 pointer-events-none" />
          <span className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#D7FF3F] z-20 pointer-events-none" />
          <img
            src={activePost.heroImage}
            alt={activePost.title}
            className="w-full h-[240px] sm:h-[340px] md:h-[420px] object-cover object-center filter contrast-105"
          />
          <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 bg-[#080808]/90 border border-[#262626] px-3 py-1 text-[10px] font-mono text-[#D7FF3F] font-bold backdrop-blur-md">
            <span className="w-1.5 h-1.5 bg-[#D7FF3F] animate-ping" />
            <span>CAPTURE // {postProject(activePost)?.codename ?? 'ZYVRO'}</span>
          </div>
        </div>

        {/* Body sections */}
        <article className="space-y-8 mb-10">
          {activePost.sections.map((section, idx) => (
            <section key={section.heading}>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="text-[11px] font-mono font-bold text-[#D7FF3F]">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <h2 className="text-sm md:text-base font-bold font-display tracking-widest text-white uppercase">
                  {section.heading}
                </h2>
                <div className="flex-1 h-[1px] bg-[#202020]" />
              </div>
              <div className="space-y-3 pl-0 md:pl-8">
                {section.body.map((paragraph, pIdx) => (
                  <p key={pIdx} className="text-[13px] md:text-sm font-mono text-[#B8B8B8] leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}

          {/* Pull quote */}
          <blockquote className="relative border border-[#262626] bg-[#0c0c0c] p-6 md:p-8">
            <span className="absolute -top-3 left-6 px-2 bg-[#080808] text-[#D7FF3F] font-display text-2xl leading-none">
              &ldquo;
            </span>
            <p className="text-base md:text-xl font-display font-bold text-[#F2F2F2] tracking-wide leading-snug">
              {activePost.pullQuote}
            </p>
            <footer className="mt-3 text-[10px] font-mono text-[#666666] tracking-widest uppercase">
              — {activePost.author}, {activePost.code}
            </footer>
          </blockquote>
        </article>

        {/* Evidence table */}
        <div className="border border-[#202020] bg-[#0c0c0c] mb-8">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#202020] bg-[#101010]">
            <Fingerprint className="w-3.5 h-3.5 text-[#D7FF3F]" />
            <span className="text-[10px] font-mono font-bold text-[#D7FF3F] tracking-widest uppercase">
              EVIDENCE TABLE // EVERY NUMBER, ITS SOURCE
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {activePost.evidence.map((item) => (
              <div key={item.label} className="p-3.5 border-b border-r border-[#1a1a1a] space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono text-[#A0A0A0] tracking-widest uppercase truncate">
                    {item.label}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-[#D7FF3F] whitespace-nowrap">{item.value}</span>
                </div>
                <p className="text-[10px] font-mono text-[#666666] leading-snug">{item.source}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery wire */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Newspaper className="w-3.5 h-3.5 text-[#D7FF3F]" />
            <span className="text-[10px] font-mono font-bold text-[#D7FF3F] tracking-widest uppercase">
              FRAME CAPTURES // {activePost.gallery.length} FILES
            </span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 snap-x">
            {activePost.gallery.map((frame) => (
              <figure key={frame.src} className="shrink-0 w-[240px] sm:w-[300px] snap-start">
                <div className="border border-[#262626] bg-[#0d0d0d] overflow-hidden">
                  <img
                    src={frame.src}
                    alt={frame.caption}
                    className="w-full h-[150px] sm:h-[180px] object-cover object-center filter contrast-105"
                  />
                </div>
                <figcaption className="pt-1.5 text-[9px] font-mono text-[#666666] tracking-wider uppercase leading-snug">
                  {frame.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Single call to action */}
        <div className="border border-[#202020] bg-[#0a0a0a] p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] font-mono text-[#A0A0A0] flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#D7FF3F]" />
            WANT THE BUILD BEHIND THIS UPDATE?
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {project && (
              <button
                onClick={() => {
                  sound.playAccessGranted();
                  onOpenProject(project);
                }}
                onMouseEnter={() => sound.playHover()}
                data-cursor="interact"
                data-cursor-label="OPEN FILE"
                className="px-4 py-2.5 bg-[#D7FF3F] hover:bg-white text-[#080808] font-mono font-bold tracking-widest text-[11px] uppercase transition-all flex items-center gap-2"
              >
                <span>[ OPEN {project.code} FILE ]</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
            {activePost.sourceUrl ? (
              <a
                href={activePost.sourceUrl}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => sound.playHover()}
                data-cursor="interact"
                data-cursor-label="SOURCE"
                className="px-4 py-2.5 border border-[#D7FF3F]/60 text-[#D7FF3F] hover:bg-[#D7FF3F] hover:text-[#080808] font-mono font-bold tracking-widest text-[11px] uppercase transition-all flex items-center gap-2"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>SOURCE BRANCH</span>
              </a>
            ) : (
              <span className="px-4 py-2.5 border border-[#292929] text-[#666666] font-mono font-bold tracking-widest text-[11px] uppercase flex items-center gap-2">
                <Fingerprint className="w-3.5 h-3.5" />
                <span>SOURCE WITHHELD // PRIVATE REPO</span>
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ============================================================
     FEED VIEW — compact wire cards
  ============================================================ */
  const [lead, ...rest] = BLOG_POSTS;
  const leadProject = postProject(lead);

  return (
    <div className="relative min-h-screen pt-20 pb-28 md:pl-20 px-4 md:px-8 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="border-b border-[#202020] pb-4 mb-6 flex flex-col md:flex-row md:items-end justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-mono text-[#D7FF3F] tracking-widest uppercase mb-1">
            <span className="w-2 h-2 bg-[#D7FF3F] animate-pulse" />
            <span>DEV BLOG // BUILD UPDATE WIRE</span>
            <span className="text-[#666666]">|</span>
            <span className="text-[#A0A0A0]">{BLOG_POSTS.length} TRANSMISSIONS</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white uppercase">
            BUILD UPDATES
          </h1>
        </div>
        <p className="text-[11px] font-mono text-[#666666] max-w-md leading-relaxed">
          DEVELOPMENT REPORTS FROM THE GAME REPOSITORIES. ONE HOOK, ONE PROMISE, AND AN EVIDENCE
          TABLE PER POST — IF IT IS NOT BUILT AND TESTED, IT IS NOT PUBLISHED.
        </p>
      </div>

      {/* Lead transmission */}
      <div
        onClick={() => {
          sound.playAccessGranted();
          onSelectPost(lead.id);
        }}
        onMouseEnter={() => sound.playHover()}
        data-cursor="select"
        data-cursor-label="READ UPDATE"
        className="group grid grid-cols-1 md:grid-cols-5 border border-[#262626] bg-[#0e0e0e] hover:border-[#D7FF3F]/60 transition-all duration-300 cursor-pointer overflow-hidden mb-5 shadow-lg hover:shadow-[0_0_30px_rgba(215,255,63,0.12)]"
      >
        <div className="md:col-span-3 relative overflow-hidden bg-[#050505]">
          <img
            src={lead.heroImage}
            alt={lead.title}
            className="w-full h-[200px] md:h-full object-cover object-center filter contrast-105 group-hover:scale-[1.03] transition-transform duration-700"
          />
          <span className="absolute top-3 left-3 px-2 py-0.5 bg-[#D7FF3F] text-[#080808] text-[10px] font-mono font-bold tracking-widest">
            {lead.code} · LATEST
          </span>
        </div>
        <div className="md:col-span-2 p-4 md:p-5 flex flex-col justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-mono text-[#666666]">
              <CalendarDays className="w-3 h-3" /> {lead.date}
              <span className="text-[#333333]">|</span>
              <Timer className="w-3 h-3" /> {lead.readTime}
            </div>
            <h2 className="text-lg md:text-xl font-bold font-display tracking-wide text-white uppercase leading-tight group-hover:text-[#D7FF3F] transition-colors">
              {lead.title}
            </h2>
            <p className="text-[11px] font-mono text-[#A0A0A0] leading-relaxed line-clamp-3">{lead.hook}</p>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-[#1a1a1a] text-[11px] font-mono text-[#D7FF3F]">
            <span className="font-bold tracking-wider">[ READ FULL UPDATE ]</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Compact wire cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {rest.map((post) => (
          <div
            key={post.id}
            onClick={() => {
              sound.playClick();
              onSelectPost(post.id);
            }}
            onMouseEnter={() => sound.playHover()}
            data-cursor="select"
            data-cursor-label="READ"
            className="group border border-[#202020] bg-[#101010] hover:border-[#D7FF3F]/60 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col"
          >
            <div className="relative overflow-hidden bg-[#050505]">
              <img
                src={post.heroImage}
                alt={post.title}
                className="w-full h-28 object-cover object-center filter contrast-105 group-hover:scale-[1.04] transition-transform duration-500"
              />
              <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-[#080808]/90 border border-[#262626] text-[9px] font-mono font-bold text-[#D7FF3F] tracking-widest backdrop-blur-md">
                {post.code}
              </span>
            </div>
            <div className="p-3 flex flex-col gap-2 flex-1">
              <div className="flex items-center gap-2 text-[9px] font-mono text-[#666666]">
                <span>{post.date}</span>
                <span className="text-[#333333]">|</span>
                <span className="uppercase">{post.category}</span>
              </div>
              <h3 className="text-[13px] font-bold font-display tracking-wide text-white uppercase leading-snug line-clamp-2 group-hover:text-[#D7FF3F] transition-colors">
                {post.title}
              </h3>
              <p className="text-[10px] font-mono text-[#888888] leading-relaxed line-clamp-2">{post.hook}</p>
              <div className="mt-auto pt-2 border-t border-[#1a1a1a] flex items-center justify-between text-[10px] font-mono text-[#D7FF3F]">
                <span className="font-bold tracking-wider">[ OPEN ]</span>
                <FileText className="w-3 h-3" />
              </div>
            </div>
          </div>
        ))}

        {/* Project file cross-link card, same compact scale */}
        {leadProject && (
          <div
            onClick={() => {
              sound.playClick();
              onOpenProject(leadProject);
            }}
            onMouseEnter={() => sound.playHover()}
            data-cursor="select"
            data-cursor-label="PROJECT FILE"
            className="group border border-dashed border-[#292929] hover:border-[#D7FF3F]/60 bg-[#0c0c0c] transition-all duration-300 cursor-pointer p-3 flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono text-[#666666] tracking-widest uppercase">PROJECT FILE</span>
              <Cpu className="w-3.5 h-3.5 text-[#D7FF3F]" />
            </div>
            <h3 className="text-[13px] font-bold font-display tracking-wide text-white uppercase leading-snug">
              {leadProject.code} // {leadProject.title}
            </h3>
            <p className="text-[10px] font-mono text-[#888888] leading-relaxed line-clamp-3">
              {leadProject.brief}
            </p>
            <div className="mt-auto pt-2 border-t border-[#1a1a1a] flex items-center justify-between text-[10px] font-mono text-[#D7FF3F]">
              <span className="font-bold tracking-wider">[ OPEN PROJECT ]</span>
              <ChevronRight className="w-3 h-3" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
