import React, { useState } from 'react';
import { TransmissionForm } from '../types';
import { CONTACT_EMAIL } from '../utils/constants';
import { sound } from '../utils/soundManager';
import {
  Radio,
  Send,
  CheckCircle2,
  Terminal,
  ShieldCheck,
  Mail,
  RotateCcw,
  Copy
} from 'lucide-react';

const MESSAGE_MAX_LENGTH = 1500;

const EMPTY_FORM: TransmissionForm = {
  from: '',
  callsign: '',
  purpose: 'BUSINESS',
  message: ''
};

/** Builds the prefilled mail subject and body. Nothing is sent by this website. */
const buildMailParts = (form: TransmissionForm) => {
  const subject = `[ZYVRO // ${form.purpose}] ${form.callsign.trim() || form.from.trim()}`;
  const lines = [
    `Name / identifier: ${form.from.trim()}`,
    ...(form.callsign.trim() ? [`Callsign / entity: ${form.callsign.trim()}`] : []),
    `Purpose: ${form.purpose}`,
    '',
    form.message.trim()
  ];
  return { subject, body: lines.join('\n') };
};

const buildMailtoUrl = (subject: string, body: string) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export const TransmissionTerminal: React.FC = () => {
  const [form, setForm] = useState<TransmissionForm>(EMPTY_FORM);
  const [state, setState] = useState<'idle' | 'opened'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [copyResult, setCopyResult] = useState<'idle' | 'copied' | 'failed'>('idle');
  const [mailParts, setMailParts] = useState<{ subject: string; body: string } | null>(null);

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
    if (!form.from.trim()) {
      setError('FROM / IDENTIFIER is required.');
      sound.playFault();
      return;
    }
    if (!form.message.trim()) {
      setError('MESSAGE PACKET DATA is required.');
      sound.playFault();
      return;
    }
    if (form.message.length > MESSAGE_MAX_LENGTH) {
      setError(`MESSAGE must be at most ${MESSAGE_MAX_LENGTH} characters.`);
      sound.playFault();
      return;
    }

    setError(null);
    sound.playClick();

    const parts = buildMailParts(form);
    setMailParts(parts);
    setCopyResult('idle');
    setState('opened');
    window.location.href = buildMailtoUrl(parts.subject, parts.body);
  };

  const handleCopy = async () => {
    if (!mailParts) return;
    sound.playClick();
    try {
      await navigator.clipboard.writeText(`Subject: ${mailParts.subject}\n\n${mailParts.body}`);
      setCopyResult('copied');
    } catch {
      setCopyResult('failed');
    }
  };

  const handleReset = () => {
    sound.playClick();
    setForm(EMPTY_FORM);
    setMailParts(null);
    setError(null);
    setCopyResult('idle');
    setState('idle');
  };

  const messageLength = form.message.length;
  const messageOverLimit = messageLength > MESSAGE_MAX_LENGTH;

  return (
    <div className="relative min-h-screen pt-20 pb-28 md:pl-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col justify-between select-none">

      {/* Header */}
      <div className="border-b border-[#202020] pb-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-mono text-[#D7FF3F] tracking-widest uppercase mb-1">
            <Radio className="w-3.5 h-3.5 text-[#D7FF3F] animate-pulse" />
            <span>COMMUNICATION TERMINAL &amp; DISPATCH</span>
            <span className="text-[#666666]">|</span>
            <span className="text-[#A0A0A0]">MAIL LINK</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white uppercase">
            TRANSMISSION
          </h1>
        </div>

        <div className="flex items-center space-x-2 bg-[#101010] border border-[#262626] px-3 py-1.5 text-xs font-mono text-[#D7FF3F]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#D7FF3F]" />
          <span>PREFILLED MAIL READY</span>
        </div>
      </div>

      {/* Main Terminal Rig */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-auto">

        {/* Left Column: Studio address (4 cols) */}
        <div className="lg:col-span-4 bg-[#0e0e0e] border border-[#262626] p-6 space-y-6 shadow-[0_0_35px_rgba(0,0,0,0.8)]">

          <div className="space-y-2">
            <div className="text-xs font-mono text-[#D7FF3F] font-bold tracking-widest uppercase">
              // STUDIO ADDRESS
            </div>
            <p className="text-xs font-mono text-[#A0A0A0] leading-relaxed">
              Submitting the form opens a prefilled email in your mail app. This website does not send or store the message.
            </p>
          </div>

          <div className="space-y-3 font-mono text-xs border-y border-[#202020] py-4">
            <div>
              <div className="text-[10px] text-[#666666] uppercase mb-0.5">EMAIL</div>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-white hover:text-[#D7FF3F] flex items-center gap-2 font-bold transition-colors break-all"
              >
                <Mail className="w-3.5 h-3.5 text-[#D7FF3F] shrink-0" />
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>

        </div>

        {/* Right Column: Transmission form (8 cols) */}
        <div className="lg:col-span-8 bg-[#0b0b0b] border border-[#262626] p-6 md:p-8 shadow-[0_0_40px_rgba(0,0,0,0.9)] relative">

          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#D7FF3F] to-transparent" />

          {state === 'opened' && mailParts ? (

            /* MAIL OPENED CONFIRMATION SCREEN */
            <div className="py-12 px-6 flex flex-col items-center text-center space-y-6">
              <div className="p-4 bg-[#D7FF3F]/15 border-2 border-[#D7FF3F] rounded-full text-[#D7FF3F]">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl md:text-4xl font-black font-display text-white uppercase tracking-wider">
                  MAIL DRAFT OPENED
                </h2>
                <p className="text-xs font-mono text-[#D0D0D0] max-w-md mx-auto pt-2 leading-relaxed">
                  Your mail app should have opened with the message ready to send. Nothing is stored or sent by this website.
                </p>
                <p className="text-xs font-mono text-[#888888] max-w-md mx-auto leading-relaxed">
                  If nothing opened, copy the message and write to <span className="text-white">{CONTACT_EMAIL}</span> yourself.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={handleCopy}
                  onMouseEnter={() => sound.playHover()}
                  data-cursor="interact"
                  data-cursor-label="COPY"
                  className="px-6 py-3 bg-[#D7FF3F] hover:bg-white text-[#080808] text-xs font-mono font-bold tracking-widest uppercase transition-all flex items-center gap-2"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>COPY MESSAGE</span>
                </button>

                <button
                  onClick={handleReset}
                  onMouseEnter={() => sound.playHover()}
                  data-cursor="interact"
                  data-cursor-label="NEW SIGNAL"
                  className="px-6 py-3 bg-[#181818] hover:bg-[#252525] border border-[#333333] hover:border-[#D7FF3F] text-xs font-mono text-white tracking-widest uppercase transition-all flex items-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#D7FF3F]" />
                  <span>WRITE ANOTHER MESSAGE</span>
                </button>
              </div>

              {copyResult === 'copied' && (
                <div role="status" className="text-xs font-mono text-[#D7FF3F]">
                  MESSAGE COPIED TO CLIPBOARD.
                </div>
              )}
              {copyResult === 'failed' && (
                <div role="status" className="text-xs font-mono text-[#FF3344]">
                  COULD NOT COPY. SELECT THE TEXT MANUALLY OR WRITE TO {CONTACT_EMAIL}.
                </div>
              )}
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
                  STATUS: READY
                </span>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* From / Contact Email */}
                <div className="space-y-1.5 font-mono">
                  <label htmlFor="tx-from" className="text-[11px] text-[#A0A0A0] uppercase block">
                    FROM / IDENTIFIER (EMAIL) *
                  </label>
                  <input
                    id="tx-from"
                    type="email"
                    required
                    placeholder="player@network.com"
                    value={form.from}
                    onChange={(e) => {
                      sound.playKeyTick();
                      setForm(f => ({ ...f, from: e.target.value }));
                    }}
                    className="w-full bg-[#121212] border border-[#2a2a2a] focus:border-[#D7FF3F] text-xs text-white p-3 outline-none placeholder:text-[#555555]"
                  />
                </div>

                {/* Callsign / Name */}
                <div className="space-y-1.5 font-mono">
                  <label htmlFor="tx-callsign" className="text-[11px] text-[#A0A0A0] uppercase block">
                    CALLSIGN / ENTITY NAME
                  </label>
                  <input
                    id="tx-callsign"
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
                <span className="text-[11px] text-[#A0A0A0] uppercase block">
                  PURPOSE / CATEGORY *
                </span>
                <div className="flex flex-wrap gap-2">
                  {purposes.map((p) => {
                    const isSelected = form.purpose === p;
                    return (
                      <button
                        key={p}
                        type="button"
                        aria-pressed={isSelected}
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
                  <label htmlFor="tx-message">MESSAGE PACKET DATA *</label>
                  <span className={messageOverLimit ? 'text-[#FF3344]' : 'text-[#666666]'}>
                    {messageLength} / {MESSAGE_MAX_LENGTH} CHARS
                  </span>
                </div>
                <textarea
                  id="tx-message"
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
                {messageOverLimit && (
                  <div className="text-[11px] text-[#FF3344]">
                    Message is over the {MESSAGE_MAX_LENGTH}-character limit. Shorten it before sending.
                  </div>
                )}
              </div>

              {error && (
                <div role="alert" className="text-xs font-mono text-[#FF3344] border border-[#FF3344]/50 bg-[#FF3344]/10 p-3">
                  {error}
                </div>
              )}

              {/* Submit Action */}
              <button
                type="submit"
                disabled={messageOverLimit}
                onMouseEnter={() => sound.playHover()}
                data-cursor="interact"
                data-cursor-label="OPEN MAIL"
                className="w-full py-4 bg-[#D7FF3F] hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed text-[#080808] font-mono font-bold tracking-widest text-xs uppercase transition-all flex items-center justify-center gap-3 shadow-[0_0_25px_rgba(215,255,63,0.35)]"
              >
                <span className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  <span>[ OPEN IN MAIL APP ]</span>
                </span>
              </button>

            </form>

          )}

        </div>

      </div>

    </div>
  );
};
