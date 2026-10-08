import React, { useState } from 'react';
import { TransmissionForm } from '../types';
import { sound } from '../utils/soundManager';
import { 
  Radio, 
  Send, 
  CheckCircle2, 
  Terminal, 
  ShieldCheck, 
  Mail, 
  MessageSquare, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

export const TransmissionTerminal: React.FC = () => {
  const [form, setForm] = useState<TransmissionForm>({
    from: '',
    callsign: '',
    frequency: 'BAND-142.9 MHz',
    purpose: 'BUSINESS',
    message: ''
  });

  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle');

  const purposes: TransmissionForm['purpose'][] = [
    'BUSINESS',
    'COLLABORATION',
    'PRESS',
    'TALENT',
    'CLASSIFIED'
  ];

  const handlePurposeSelect = (purpose: TransmissionForm['purpose']) => {
    sound.playHover();
    setForm(prev => ({ ...prev, purpose }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.from.trim() || !form.message.trim()) {
      sound.playFault();
      return;
    }

    sound.playClick();
    setState('sending');

    // Simulate encrypted dispatch
    setTimeout(() => {
      sound.playAccessGranted();
      setState('sent');
    }, 1200);
  };

  const handleReset = () => {
    sound.playClick();
    setForm({
      from: '',
      callsign: '',
      frequency: 'BAND-142.9 MHz',
      purpose: 'BUSINESS',
      message: ''
    });
    setState('idle');
  };

  return (
    <div className="relative min-h-screen pt-20 pb-28 md:pl-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col justify-between select-none">
      
      {/* Header */}
      <div className="border-b border-[#202020] pb-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-mono text-[#D7FF3F] tracking-widest uppercase mb-1">
            <Radio className="w-3.5 h-3.5 text-[#D7FF3F] animate-pulse" />
            <span>COMMUNICATION TERMINAL &amp; DISPATCH</span>
            <span className="text-[#666666]">|</span>
            <span className="text-[#A0A0A0]">SECURE UPLINK</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white uppercase">
            TRANSMISSION
          </h1>
        </div>

        <div className="flex items-center space-x-2 bg-[#101010] border border-[#262626] px-3 py-1.5 text-xs font-mono text-[#D7FF3F]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#D7FF3F]" />
          <span>ENCRYPTED DISPATCH READY</span>
        </div>
      </div>

      {/* Main Terminal Rig */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-auto">
        
        {/* Left Column: Direct Studio Frequencies & Spec (4 cols) */}
        <div className="lg:col-span-4 bg-[#0e0e0e] border border-[#262626] p-6 space-y-6 shadow-[0_0_35px_rgba(0,0,0,0.8)]">
          
          <div className="space-y-2">
            <div className="text-xs font-mono text-[#D7FF3F] font-bold tracking-widest uppercase">
              // STUDIO FREQUENCIES
            </div>
            <p className="text-xs font-mono text-[#A0A0A0] leading-relaxed">
              Open a direct transmission to our core systems for publishing, investment, press briefings, or technical collaboration.
            </p>
          </div>

          <div className="space-y-3 font-mono text-xs border-y border-[#202020] py-4">
            <div>
              <div className="text-[10px] text-[#666666] uppercase mb-0.5">DIRECT SYSTEM DISPATCH</div>
              <a 
                href="mailto:contact@zyvro.com"
                className="text-white hover:text-[#D7FF3F] flex items-center gap-2 font-bold transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#D7FF3F]" />
                contact@zyvro.com
              </a>
            </div>

            <div>
              <div className="text-[10px] text-[#666666] uppercase mb-0.5">COMMUNITY NETWORK</div>
              <div className="text-[#D0D0D0] flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-[#D7FF3F]" />
                discord.gg/zyvro
              </div>
            </div>

            <div>
              <div className="text-[10px] text-[#666666] uppercase mb-0.5">LOCATION / ORIGIN</div>
              <div className="text-[#D0D0D0]">
                LAT: 37.7749° N // LON: 122.4194° W
              </div>
            </div>
          </div>

          <div className="p-3 bg-[#141414] border-l-2 border-[#D7FF3F] text-[11px] font-mono text-[#888888]">
            "Signals transmitted through this console are parsed directly by our game architects. No PR automated bot responses."
          </div>

        </div>

        {/* Right Column: Interactive Transmission Terminal (8 cols) */}
        <div className="lg:col-span-8 bg-[#0b0b0b] border border-[#262626] p-6 md:p-8 shadow-[0_0_40px_rgba(0,0,0,0.9)] relative">
          
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#D7FF3F] to-transparent" />

          {state === 'sent' ? (
            
            /* SUCCESS CONFIRMATION SCREEN */
            <div className="py-12 px-6 flex flex-col items-center text-center space-y-6">
              <div className="p-4 bg-[#D7FF3F]/15 border-2 border-[#D7FF3F] rounded-full text-[#D7FF3F] animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl md:text-4xl font-black font-display text-white uppercase tracking-wider">
                  TRANSMISSION SENT
                </h2>
                <div className="text-sm font-mono text-[#D7FF3F] tracking-widest font-bold">
                  SIGNAL RECEIVED // THANK YOU, PLAYER.
                </div>
                <p className="text-xs font-mono text-[#888888] max-w-md mx-auto pt-2">
                  Your encrypted packet has been logged into the ZYVRO queue. An operative will reply over your specified frequency.
                </p>
              </div>

              <button
                onClick={handleReset}
                onMouseEnter={() => sound.playHover()}
                data-cursor="interact"
                data-cursor-label="NEW SIGNAL"
                className="px-6 py-3 bg-[#181818] hover:bg-[#252525] border border-[#333333] hover:border-[#D7FF3F] text-xs font-mono text-white tracking-widest uppercase transition-all flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#D7FF3F]" />
                <span>DISPATCH ANOTHER TRANSMISSION</span>
              </button>
            </div>

          ) : (

            /* TRANSMISSION FORM */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="flex items-center justify-between border-b border-[#202020] pb-3">
                <div className="flex items-center space-x-2 text-xs font-mono text-white font-bold uppercase">
                  <Terminal className="w-4 h-4 text-[#D7FF3F]" />
                  <span>OPEN TRANSMISSION CHANNEL</span>
                </div>
                <span className="text-[10px] font-mono text-[#666666]">
                  STATUS: CARRIER READY
                </span>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* From / Contact Email */}
                <div className="space-y-1.5 font-mono">
                  <label className="text-[11px] text-[#A0A0A0] uppercase block">
                    FROM / IDENTIFIER (EMAIL) *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="player@network.com"
                    value={form.from}
                    onChange={(e) => {
                      sound.playKeyTick();
                      setForm(f => ({ ...f, from: e.target.value }));
                    }}
                    className="w-full bg-[#121212] border border-[#2a2a2a] focus:border-[#D7FF3F] text-xs text-white p-3 outline-none uppercase placeholder:text-[#555555]"
                  />
                </div>

                {/* Callsign / Name */}
                <div className="space-y-1.5 font-mono">
                  <label className="text-[11px] text-[#A0A0A0] uppercase block">
                    CALLSIGN / ENTITY NAME
                  </label>
                  <input
                    type="text"
                    placeholder="OPERATIVE // ORG"
                    value={form.callsign}
                    onChange={(e) => {
                      sound.playKeyTick();
                      setForm(f => ({ ...f, callsign: e.target.value }));
                    }}
                    className="w-full bg-[#121212] border border-[#2a2a2a] focus:border-[#D7FF3F] text-xs text-white p-3 outline-none uppercase placeholder:text-[#555555]"
                  />
                </div>

              </div>

              {/* Purpose Selector Pills */}
              <div className="space-y-2 font-mono">
                <label className="text-[11px] text-[#A0A0A0] uppercase block">
                  PURPOSE / CATEGORY *
                </label>
                <div className="flex flex-wrap gap-2">
                  {purposes.map((p) => {
                    const isSelected = form.purpose === p;
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => handlePurposeSelect(p)}
                        className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider border transition-all ${
                          isSelected
                            ? 'bg-[#D7FF3F] text-[#080808] border-[#D7FF3F] font-bold shadow-[0_0_12px_rgba(215,255,63,0.3)]'
                            : 'bg-[#121212] text-[#888888] border-[#262626] hover:text-white hover:border-[#444444]'
                        }`}
                      >
                        [ {p} ]
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5 font-mono">
                <div className="flex justify-between items-center text-[11px] text-[#A0A0A0] uppercase">
                  <span>MESSAGE PACKET DATA *</span>
                  <span className="text-[#666666]">{form.message.length} CHARS</span>
                </div>
                <textarea
                  required
                  rows={5}
                  placeholder="COMPOSE TRANSMISSION DATA..."
                  value={form.message}
                  onChange={(e) => {
                    sound.playKeyTick();
                    setForm(f => ({ ...f, message: e.target.value }));
                  }}
                  className="w-full bg-[#121212] border border-[#2a2a2a] focus:border-[#D7FF3F] text-xs text-white p-3 outline-none resize-none font-mono placeholder:text-[#555555]"
                />
              </div>

              {/* Submit Action */}
              <button
                type="submit"
                disabled={state === 'sending'}
                onMouseEnter={() => sound.playHover()}
                data-cursor="interact"
                data-cursor-label="DISPATCH SIGNAL"
                className="w-full py-4 bg-[#D7FF3F] hover:bg-white text-[#080808] font-mono font-bold tracking-widest text-xs uppercase transition-all flex items-center justify-center gap-3 shadow-[0_0_25px_rgba(215,255,63,0.35)]"
              >
                {state === 'sending' ? (
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>ENCRYPTING &amp; DISPATCHING PACKET...</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    <span>[ SEND TRANSMISSION ]</span>
                  </span>
                )}
              </button>

            </form>

          )}

        </div>

      </div>

    </div>
  );
};
