import React, { useState } from 'react';
import { TransmissionForm } from '../types';
import { sound } from '../utils/soundManager';
import { CONTACT_EMAIL, GITHUB_PROFILE_URL } from '../utils/constants';
import {
  Radio,
  Send,
  Terminal,
  Mail,
  Github,
  Copy,
  RotateCcw,
  Info
} from 'lucide-react';

const MESSAGE_LIMIT = 1500;

const PURPOSES: TransmissionForm['purpose'][] = ['BUSINESS', 'PARTNERSHIP', 'PRESS', 'PLAYER FEEDBACK'];

const EMPTY_FORM: TransmissionForm = {
  from: '',
  callsign: '',
  purpose: 'BUSINESS',
  message: ''
};

function buildSubject(form: TransmissionForm): string {
  const who = form.callsign.trim() || form.from.trim();
  return `[ZYVRO // ${form.purpose}] ${who}`;
}

function buildBody(form: TransmissionForm): string {
  const lines = [`Name / email: ${form.from.trim()}`];
  if (form.callsign.trim()) lines.push(`Organisation: ${form.callsign.trim()}`);
  lines.push(`Purpose: ${form.purpose}`, '', form.message.trim());
  return lines.join('\n');
}

type CopyState = 'idle' | 'copied' | 'failed';

/** Contact page. With no verified mailbox it shows the verified GitHub route only. */
export const TransmissionTerminal: React.FC = () => {
  const [form, setForm] = useState<TransmissionForm>(EMPTY_FORM);
  const [state, setState] = useState<'idle' | 'opened'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [copyState, setCopyState] = useState<CopyState>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!CONTACT_EMAIL) return;
    if (!form.from.trim() || !form.message.trim()) {
      sound.playFault();
      setError('Your email and a message are both required.');
      return;
    }
    if (form.message.length > MESSAGE_LIMIT) {
      sound.playFault();
      setError(`The message is longer than ${MESSAGE_LIMIT} characters.`);
      return;
    }
    setError(null);
    sound.playClick();
    const mailtoUrl =
      `mailto:${CONTACT_EMAIL}` +
      `?subject=${encodeURIComponent(buildSubject(form))}` +
      `&body=${encodeURIComponent(buildBody(form))}`;
    setState('opened');
    window.location.href = mailtoUrl;
  };

  const handleCopy = async () => {
    const text = `To: ${CONTACT_EMAIL}\nSubject: ${buildSubject(form)}\n\n${buildBody(form)}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopyState('copied');
      sound.playAccessGranted();
    } catch {
      setCopyState('failed');
      sound.playFault();
    }
  };

  const handleReset = () => {
    sound.playClick();
    setForm(EMPTY_FORM);
    setCopyState('idle');
    setError(null);
    setState('idle');
  };

  const inputClass =
    'w-full bg-[#121212] border border-[#2a2a2a] focus:border-[#D7FF3F] text-sm text-white p-3 outline-none placeholder:text-[#555555]';

  return (
    <div className="relative min-h-screen pt-20 pb-28 md:pl-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="border-b border-[#202020] pb-4 mb-6">
        <div className="flex items-center space-x-2 text-[11px] font-mono text-[#D7FF3F] tracking-widest uppercase mb-1">
          <Radio className="w-3.5 h-3.5" aria-hidden="true" />
          <span>CONTACT</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white uppercase">
          TRANSMISSION
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 bg-[#0e0e0e] border border-[#262626] p-6 space-y-5">
          <div className="space-y-2">
            <div className="text-xs font-mono text-[#D7FF3F] font-bold tracking-widest uppercase">// HOW TO REACH US</div>
            <p className="text-xs font-mono text-[#A0A0A0] leading-relaxed">
              Zyvro Labs is one founder. Messages about partnerships, ecosystem programmes, press or the games are read by the founder personally.
            </p>
          </div>

          <div className="space-y-4 font-mono text-xs border-t border-[#202020] pt-4">
            {CONTACT_EMAIL && (
              <div>
                <div className="text-[10px] text-[#666666] uppercase mb-1">EMAIL</div>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center gap-2 min-h-[44px] text-white hover:text-[#D7FF3F] font-bold transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#D7FF3F]" aria-hidden="true" />
                  {CONTACT_EMAIL}
                </a>
              </div>
            )}
            <div>
              <div className="text-[10px] text-[#666666] uppercase mb-1">SOURCE &amp; DEVELOPMENT</div>
              <a
                href={GITHUB_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 min-h-[44px] text-white hover:text-[#D7FF3F] font-bold transition-colors"
              >
                <Github className="w-3.5 h-3.5 text-[#D7FF3F]" aria-hidden="true" />
                {GITHUB_PROFILE_URL.replace('https://', '')}
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 bg-[#0b0b0b] border border-[#262626] p-6 md:p-8 relative">
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#D7FF3F] to-transparent" />

          {!CONTACT_EMAIL ? (
            <div className="py-10 flex flex-col items-start space-y-4 font-mono">
              <div className="flex items-center gap-2 text-white text-sm font-bold uppercase">
                <Info className="w-4 h-4 text-[#D7FF3F]" aria-hidden="true" />
                <span>EMAIL CONTACT IS BEING SET UP</span>
              </div>
              <p className="text-sm text-[#A0A0A0] leading-relaxed max-w-xl">
                Until the zyvrolabs.com mailbox is live, the fastest verified way to reach the founder is through GitHub, where every game on this site is developed in the open.
              </p>
              <a
                href={GITHUB_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="inline-flex items-center gap-2 min-h-[44px] px-5 bg-[#D7FF3F] hover:bg-white text-[#080808] text-xs font-bold tracking-widest uppercase transition-colors"
              >
                <Github className="w-4 h-4" aria-hidden="true" />
                OPEN GITHUB PROFILE
              </a>
            </div>
          ) : state === 'opened' ? (
            <div className="py-8 space-y-5 font-mono">
              <h2 className="text-2xl md:text-3xl font-black font-display text-white uppercase">CHECK YOUR MAIL APP</h2>
              <p className="text-sm text-[#A0A0A0] leading-relaxed max-w-xl">
                Your mail app should have opened with this message ready to send. This website does not store or send anything itself. If nothing opened, copy the message and send it to <span className="text-white font-bold">{CONTACT_EMAIL}</span>.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 min-h-[44px] px-5 bg-[#D7FF3F] hover:bg-white text-[#080808] text-xs font-bold tracking-widest uppercase transition-colors"
                >
                  <Copy className="w-4 h-4" aria-hidden="true" />
                  COPY MESSAGE
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 min-h-[44px] px-5 border border-[#333333] hover:border-[#D7FF3F] text-white text-xs tracking-widest uppercase transition-colors"
                >
                  <RotateCcw className="w-4 h-4 text-[#D7FF3F]" aria-hidden="true" />
                  WRITE ANOTHER
                </button>
                <span role="status" className="text-xs">
                  {copyState === 'copied' && <span className="text-[#D7FF3F]">Copied to clipboard.</span>}
                  {copyState === 'failed' && <span className="text-[#FF6B6B]">Could not copy. Select and copy the text manually.</span>}
                </span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 font-mono" noValidate>
              <div className="flex items-center space-x-2 text-xs text-white font-bold uppercase border-b border-[#202020] pb-3">
                <Terminal className="w-4 h-4 text-[#D7FF3F]" aria-hidden="true" />
                <span>COMPOSE A MESSAGE</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="tx-from" className="text-[11px] text-[#A0A0A0] uppercase block">YOUR EMAIL *</label>
                  <input
                    id="tx-from"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.from}
                    onChange={(e) => setForm((f) => ({ ...f, from: e.target.value }))}
                    className={inputClass}
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="tx-org" className="text-[11px] text-[#A0A0A0] uppercase block">NAME / ORGANISATION</label>
                  <input
                    id="tx-org"
                    type="text"
                    autoComplete="organization"
                    value={form.callsign}
                    onChange={(e) => setForm((f) => ({ ...f, callsign: e.target.value }))}
                    className={inputClass}
                  />
                </div>
              </div>

              <fieldset className="space-y-2">
                <legend className="text-[11px] text-[#A0A0A0] uppercase block">PURPOSE *</legend>
                <div className="flex flex-wrap gap-2">
                  {PURPOSES.map((p) => {
                    const isSelected = form.purpose === p;
                    return (
                      <button
                        key={p}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => {
                          sound.playHover();
                          setForm((f) => ({ ...f, purpose: p }));
                        }}
                        className={`min-h-[44px] px-3 text-xs uppercase tracking-wider border transition-all ${
                          isSelected
                            ? 'bg-[#D7FF3F] text-[#080808] border-[#D7FF3F] font-bold'
                            : 'bg-[#121212] text-[#A0A0A0] border-[#262626] hover:text-white hover:border-[#444444]'
                        }`}
                      >
                        [ {p} ]
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[11px] text-[#A0A0A0] uppercase">
                  <label htmlFor="tx-msg">MESSAGE *</label>
                  <span className={form.message.length > MESSAGE_LIMIT ? 'text-[#FF6B6B]' : 'text-[#666666]'}>
                    {form.message.length} / {MESSAGE_LIMIT}
                  </span>
                </div>
                <textarea
                  id="tx-msg"
                  required
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className={`${inputClass} resize-none`}
                />
              </div>

              {error && (
                <p role="alert" className="text-xs text-[#FF6B6B]">{error}</p>
              )}

              <button
                type="submit"
                onMouseEnter={() => sound.playHover()}
                className="w-full min-h-[48px] bg-[#D7FF3F] hover:bg-white text-[#080808] font-bold tracking-widest text-xs uppercase transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
                <span>OPEN IN MY MAIL APP</span>
              </button>
              <p className="text-[11px] text-[#666666]">
                This opens your own mail app with the message filled in. Nothing is stored or sent by this website.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
