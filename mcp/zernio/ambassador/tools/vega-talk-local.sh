#!/usr/bin/env bash
# vega-talk-local.sh — photoreal talking-head upgrade for the Vega Arunika presenter.
#
# WHY THIS EXISTS
#   The sandbox-built cut (mcp/zernio/video/out/vega-field-report-w44.mp4) animates Vega with a
#   photo-puppet rig (mouth/eye state variants switched by the VO RMS envelope). It ships
#   everywhere because it needs zero ML weights.
#   Photoreal lip-sync (FaceFusion lip_syncer / SadTalker) needs model weights hosted on
#   GitHub Releases / HuggingFace / Google Drive — none reachable from the CI sandbox.
#   On YOUR machine they download fine. This script produces a drop-in photoreal clip.
#
# WHAT YOU GET
#   out/vega-talk-photoreal.mp4 — the chosen portrait, lips driven by vo-ledger-w44.mp3.
#   Drop it into mcp/zernio/video/public/talk/ and flip PRESENTER_MODE in VegaScenes.tsx
#   (snippet in TOOLS.md) to replace the puppet layer with the photoreal plate.
#
# USAGE
#   bash mcp/zernio/ambassador/tools/vega-talk-local.sh
#
# REQUIREMENTS (owner machine, one-time)
#   - python 3.10+, git, ffmpeg+ffprobe on PATH
#   - ~6 GB disk for FaceFusion models (auto-downloaded on first run)
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"
AMB="$REPO_ROOT/mcp/zernio/ambassador"
VIDEO="$REPO_ROOT/mcp/zernio/video"
WORK="${VEGA_TALK_WORKDIR:-$HOME/.zyvro/vega-talk}"
mkdir -p "$WORK"

PORTRAIT="$AMB/vega-arunika-portrait.jpg"
VO="$AMB/vo-ledger-w44.mp3"
OUT="$VIDEO/out/vega-talk-photoreal.mp4"
[ -f "$PORTRAIT" ] || { echo "missing portrait: $PORTRAIT"; exit 1; }
[ -f "$VO" ] || { echo "missing VO: $VO"; exit 1; }

echo "== [1/4] FaceFusion checkout"
if [ ! -d "$WORK/facefusion" ]; then
  git clone --depth 1 https://github.com/facefusion/facefusion.git "$WORK/facefusion"
fi
cd "$WORK/facefusion"

echo "== [2/4] python env"
if [ ! -x "$WORK/ffvenv/bin/python" ]; then
  python3 -m venv "$WORK/ffvenv"
  "$WORK/ffvenv/bin/python" -m pip install --upgrade pip
  "$WORK/ffvenv/bin/python" -m pip install -r requirements.txt
fi

echo "== [3/4] lip-sync render (CPU; ~10-25 min for 41 s on 8 cores)"
# edtalk_256 = highest quality; wav2lip_gan_96 = fastest fallback.
LIP_SYNCER="${VEGA_LIP_SYNCER:-edtalk_256}"
"$WORK/ffvenv/bin/python" facefusion.py run \
  --processors lip_syncer \
  --lip-syncer-model "$LIP_SYNCER" \
  --source-audio "$VO" \
  --target-image "$PORTRAIT" \
  --output-path "$WORK/vega-talk-raw.mp4" \
  --output-video-fps 30 \
  --execution-providers cpu \
  --log-level error

echo "== [4/4] normalize to 1280x720@30 (presenter plate framing)"
ffmpeg -y -v error -i "$WORK/vega-talk-raw.mp4" \
  -vf "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720" \
  -r 30 -c:v libx264 -preset medium -crf 19 -pix_fmt yuv420p -an "$OUT"

mkdir -p "$VIDEO/public/talk"
cp "$OUT" "$VIDEO/public/talk/vega-talk-photoreal.mp4"
echo
echo "DONE: $OUT"
echo "Also copied to: $VIDEO/public/talk/vega-talk-photoreal.mp4"
echo "Next: set PRESENTER_MODE='photoreal' in mcp/zernio/video/src/VegaScenes.tsx (see tools/TOOLS.md)."
