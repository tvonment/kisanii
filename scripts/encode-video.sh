#!/usr/bin/env bash
# encode-video.sh — compress EPK video for web / GitHub Pages
# Source: video/Kisanii EPK final.mov  (gitignored)
# Output: public/video/epk.mp4 + public/video/epk.webm  (≤ 25 MB each)
set -euo pipefail

SRC="video/Kisanii EPK final.mov"
OUTDIR="public/video"
MP4="$OUTDIR/epk.mp4"
WEBM="$OUTDIR/epk.webm"

if [[ ! -f "$SRC" ]]; then
  echo "ERROR: source file not found: $SRC" >&2
  exit 1
fi

mkdir -p "$OUTDIR"

echo "▶ Encoding MP4 (H.264) …"
ffmpeg -y -i "$SRC" \
  -c:v libx264 -preset slow -crf 28 \
  -vf "scale='min(1280,iw)':-2" \
  -c:a aac -b:a 128k \
  -movflags +faststart \
  "$MP4"

echo "▶ Encoding WebM (VP9) …"
ffmpeg -y -i "$SRC" \
  -c:v libvpx-vp9 -crf 36 -b:v 0 \
  -vf "scale='min(1280,iw)':-2" \
  -c:a libopus -b:a 96k \
  "$WEBM"

echo ""
echo "✔ Done. File sizes:"
du -sh "$MP4" "$WEBM"
