import React, { useState } from 'react';
import { ARCHIVE_LOGS } from '../utils/constants';
import { ArchiveEntry } from '../types';
import { sound } from '../utils/soundManager';
import { 
  BookOpen, 
  Search, 
  Tag, 
  User, 
  Lock, 
  FileText
} from 'lucide-react';

export const ArchiveDatabase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeLog, setActiveLog] = useState<ArchiveEntry | null>(ARCHIVE_LOGS[0]);
  const [declassifiedIds, setDeclassifiedIds] = useState<string[]>([]);

  const categories = ['ALL', 'WORLD DESIGN', 'AI LOGIC', 'COMBAT TEST', 'AUDIO SYNTHESIS', 'CLASSIFIED'];

  const filteredLogs = ARCHIVE_LOGS.filter((log) => {
    const matchesCategory = selectedCategory === 'ALL' || log.category === selectedCategory;
    const matchesSearch = 
      log.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSelectLog = (log: ArchiveEntry) => {
    sound.playClick();
    setActiveLog(log);
  };

  const handleDeclassify = (logId: string) => {
    sound.playAccessGranted();
    setDeclassifiedIds(prev => [...prev, logId]);
  };

  return (
    <div className="relative min-h-screen pt-20 pb-28 md:pl-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col justify-between select-none">
      
      {/* Top Header */}
      <div className="border-b border-[#202020] pb-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-mono text-[#D7FF3F] tracking-widest uppercase mb-1">
            <BookOpen className="w-3.5 h-3.5 text-[#D7FF3F]" />
            <span>DEVELOPMENT DATABASE &amp; LORE LOGS</span>
            <span className="text-[#666666]">|</span>
            <span className="text-[#A0A0A0]">ARCHIVE ENGINE</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white uppercase">
            ARCHIVE // LOGS
          </h1>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-[#666666] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="SEARCH DATABASE..."
            value={searchQuery}
            onChange={(e) => {
              sound.playKeyTick();
              setSearchQuery(e.target.value);
            }}
            className="w-full bg-[#101010] border border-[#292929] focus:border-[#D7FF3F] text-xs font-mono text-white pl-9 pr-3 py-2 outline-none uppercase placeholder:text-[#555555]"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex space-x-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                sound.playHover();
                setSelectedCategory(cat);
              }}
              data-cursor="select"
              data-cursor-label={cat}
              className={`px-3 py-1 text-xs font-mono tracking-wider uppercase border transition-all whitespace-nowrap ${
                isSelected
                  ? 'bg-[#D7FF3F] text-[#080808] border-[#D7FF3F] font-bold shadow-[0_0_12px_rgba(215,255,63,0.3)]'
                  : 'bg-[#101010] text-[#888888] border-[#222222] hover:text-white hover:border-[#383838]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Main Archive Split View: Left List (5 cols), Right Reader Terminal (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Logs Index Column */}
        <div className="lg:col-span-5 space-y-3">
          {filteredLogs.length === 0 ? (
            <div className="p-8 text-center bg-[#101010] border border-[#222222] text-xs font-mono text-[#666666]">
              NO MATCHING ARCHIVE RECORDS FOUND.
            </div>
          ) : (
            filteredLogs.map((log) => {
              const isSelected = activeLog?.id === log.id;
              const isLocked = log.isClassified && !declassifiedIds.includes(log.id);

              return (
                <div
                  key={log.id}
                  onClick={() => handleSelectLog(log)}
                  onMouseEnter={() => sound.playHover()}
                  data-cursor="select"
                  data-cursor-label={log.code}
                  className={`p-4 border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-[#141414] border-[#D7FF3F] shadow-[0_0_20px_rgba(215,255,63,0.15)]'
                      : 'bg-[#0e0e0e] border-[#202020] hover:border-[#333333] hover:bg-[#121212]'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#D7FF3F]" />
                  )}

                  <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
                    <span className="text-[#D7FF3F] font-bold tracking-widest">{log.code}</span>
                    <span className="text-[#666666]">{log.build}</span>
                  </div>

                  <h3 className="text-sm font-bold font-display text-white tracking-wide uppercase mb-1.5 line-clamp-1">
                    {log.title}
                  </h3>

                  <p className="text-xs font-mono text-[#888888] line-clamp-2 leading-relaxed">
                    {log.summary}
                  </p>

                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#1a1a1a] text-[10px] font-mono text-[#555555]">
                    <span>{log.category}</span>
                    {isLocked ? (
                      <span className="text-[#FF3344] flex items-center gap-1 font-bold">
                        <Lock className="w-3 h-3" /> CLASSIFIED
                      </span>
                    ) : (
                      <span className="text-[#A0A0A0] flex items-center gap-1">
                        <FileText className="w-3 h-3" /> READ ENTRY
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right: Reader Terminal View */}
        <div className="lg:col-span-7 bg-[#0b0b0b] border border-[#262626] p-6 shadow-[0_0_40px_rgba(0,0,0,0.8)] relative min-h-[500px]">
          
          {activeLog ? (
            <div className="space-y-6">
              
              {/* Terminal Meta Header */}
              <div className="border-b border-[#202020] pb-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#D7FF3F] font-bold tracking-widest">{activeLog.code}</span>
                  <span className="text-[#888888]">{activeLog.timestamp}</span>
                </div>

                <h2 className="text-2xl md:text-3xl font-black font-display text-white uppercase leading-snug">
                  {activeLog.title}
                </h2>

                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#A0A0A0] pt-1">
                  <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-[#D7FF3F]" /> {activeLog.author}</span>
                  <span>|</span>
                  <span className="flex items-center gap-1"><Tag className="w-3.5 h-3.5 text-[#D7FF3F]" /> {activeLog.category}</span>
                  <span>|</span>
                  <span className="text-white">{activeLog.build}</span>
                </div>
              </div>

              {/* Document Content / Redaction Handling */}
              {activeLog.isClassified && !declassifiedIds.includes(activeLog.id) ? (
                
                /* Locked Classified View */
                <div className="p-8 bg-[#121212] border border-[#FF3344]/40 text-center space-y-4 my-6">
                  <div className="inline-flex p-3 bg-[#FF3344]/10 border border-[#FF3344]/30 rounded-full text-[#FF3344]">
                    <Lock className="w-6 h-6 animate-pulse" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-base font-bold font-display text-white uppercase tracking-wider">
                      CLASSIFIED DEVELOPMENT LOG
                    </h3>
                    <p className="text-xs font-mono text-[#888888] max-w-md mx-auto">
                      This entry contains sensitive internal architectural decisions and studio post-mortem protocols.
                    </p>
                  </div>

                  <button
                    onClick={() => handleDeclassify(activeLog.id)}
                    onMouseEnter={() => sound.playHover()}
                    data-cursor="interact"
                    data-cursor-label="DECLASSIFY"
                    className="px-6 py-2.5 bg-[#FF3344] hover:bg-white text-[#080808] text-xs font-mono font-bold tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(255,51,68,0.3)]"
                  >
                    [ OVERRIDE &amp; DECLASSIFY LOG ]
                  </button>
                </div>

              ) : (

                /* Declassified Full Text */
                <div className="space-y-4 text-xs md:text-sm font-mono text-[#D0D0D0] leading-relaxed">
                  
                  <div className="p-3 bg-[#141414] border-l-2 border-[#D7FF3F] text-xs italic text-[#A0A0A0]">
                    "SUMMARY // {activeLog.summary}"
                  </div>

                  {activeLog.content.map((paragraph, idx) => (
                    <p key={idx} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}

                  <div className="pt-6 border-t border-[#202020] flex items-center justify-between text-xs text-[#666666]">
                    <span>STATUS: DECLASSIFIED // VERIFIED</span>
                    <span>ZYVRO LABS ARCHIVE SYSTEM</span>
                  </div>

                </div>

              )}

            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-xs font-mono text-[#666666]">
              SELECT A RECORD FROM THE ARCHIVE INDEX.
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
