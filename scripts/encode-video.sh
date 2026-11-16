#!/usr/bin/env bash
# encode-video.sh — compress a video for web / GitHub Pages
#
# Usage:
#   bash scripts/encode-video.sh [SOURCE] [NAME]
#
#   SOURCE  raw video in video/ (gitignored)   default: "video/Kisanii EPK final.mov"
#   NAME    output basename in public/video/   default: "epk"
#
# Output: public/video/NAME.mp4 + public/video/NAME.webm  (target ≤ 25 MB each)
#
# Tune size via env vars (higher = smaller file, lower quality):
#   CRF_X264 (default 28)   CRF_VP9 (default 36)
#   e.g. CRF_X264=30 CRF_VP9=38 bash scripts/encode-video.sh "video/foo.mov" foo
set -euo pipefail

SRC="${1:-video/Kisanii EPK final.mov}"
NAME="${2:-epk}"
CRF_X264="${CRF_X264:-28}"
CRF_VP9="${CRF_VP9:-36}"
OUTDIR="public/video"
MP4="$OUTDIR/$NAME.mp4"
WEBM="$OUTDIR/$NAME.webm"

if [[ ! -f "$SRC" ]]; then
  echo "ERROR: source file not found: $SRC" >&2
  exit 1
fi

mkdir -p "$OUTDIR"

echo "▶ Encoding MP4 (H.264, CRF $CRF_X264) …"
ffmpeg -y -i "$SRC" \
  -c:v libx264 -preset slow -crf "$CRF_X264" \
  -vf "scale='min(1280,iw)':-2" \
  -c:a aac -b:a 128k \
  -movflags +faststart \
  "$MP4"

echo "▶ Encoding WebM (VP9, CRF $CRF_VP9) …"
ffmpeg -y -i "$SRC" \
  -c:v libvpx-vp9 -crf "$CRF_VP9" -b:v 0 \
  -vf "scale='min(1280,iw)':-2" \
  -c:a libopus -b:a 96k \
  "$WEBM"

echo ""
echo "✔ Done. File sizes:"
du -sh "$MP4" "$WEBM"
