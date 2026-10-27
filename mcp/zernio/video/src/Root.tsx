import React from 'react';
import { Composition } from 'remotion';
import { ZyvroTeaser, TOTAL } from './Teaser';
import { VegaLedgerRead, VEGA_TOTAL } from './Vega';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="ZyvroTeaser" component={ZyvroTeaser} durationInFrames={TOTAL} fps={30} width={1280} height={720} />
    <Composition id="VegaLedgerRead" component={VegaLedgerRead} durationInFrames={VEGA_TOTAL} fps={30} width={1280} height={720} />
  </>
);
