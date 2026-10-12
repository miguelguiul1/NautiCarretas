#!/usr/bin/env bash
# Gera os assets otimizados de public/media a partir dos originais em materiais/.
# Requer: ImageMagick (convert) e ffmpeg. Remove todos os metadados (EXIF/GPS).
set -euo pipefail
SRC="${1:-materiais}"
OUT="public/media"
mkdir -p "$OUT"

# img <origem> <nome> [operações extras do ImageMagick]
img() {
  local src="$SRC/$1" name="$2"; shift 2
  convert "$src" -auto-orient "$@" -strip -resize '1600x1600>' "$OUT/tmp.png"
  for w in full 720; do
    local resize=() suffix=""
    if [ "$w" = 720 ]; then resize=(-resize '720x>'); suffix="-720"; fi
    convert "$OUT/tmp.png" "${resize[@]}" -strip -quality 80 -interlace Plane "$OUT/$name$suffix.jpg"
    convert "$OUT/tmp.png" "${resize[@]}" -strip -quality 74 -define webp:method=6 "$OUT/$name$suffix.webp"
  done
  rm "$OUT/tmp.png"
}

# Rodoviárias
img ac334ce2-image.jpg rodoviaria-lateral -crop 1080x780+0+540 +repage   # corta pessoa ao fundo
img 30f3879f-image.jpg rodoviaria-traseira
img 6ed50493-image.jpg rodoviaria-lago
img 99cb8dfd-image.jpg rodoviaria-frente \
  -region 52x26+852+398 -blur 0x8 +region                                 # borra placa do carro ao fundo
# Encalhe
img ccbb72d0-image.jpg jetski-frente
img 4beb39e8-image.jpg jetski-lateral -crop 1080x760+0+580 +repage        # corta pessoas ao fundo
img 4beb39e8-image.jpg anatomia-jetski -crop 1080x660+0+620 +repage       # base da seção "Peça por peça"
img d823d494-image.jpg jetski-perfil
img c63a273a-image.jpg jetski-traseira
img 862e8fb8-image.jpg encalhe-madeira-verniz -crop 640x948+0+0 +repage    # corta o funcionário pintando

# Logo (fundo #0B1023 embutido)
LOGO="$SRC/848e7077-image.jpg"
convert "$LOGO" -crop 820x380+130+318 +repage -strip "$OUT/tmp-logo.png"
python3 -I "$(dirname "$0")/limpar-fundo-logo.py" "$OUT/tmp-logo.png" "$OUT/logo.png"   # fundo exato #0B1023
convert "$OUT/logo.png" -strip -define webp:lossless=true "$OUT/logo.webp"
convert "$OUT/logo.png" -filter Lanczos -resize 300x -strip "$OUT/tmp-logo-300.png"
python3 -I "$(dirname "$0")/limpar-fundo-logo.py" "$OUT/tmp-logo-300.png" "$OUT/tmp-logo-300.png"   # reamostragem pode reintroduzir variação
convert "$OUT/tmp-logo-300.png" -strip -define webp:lossless=true "$OUT/logo-300.webp"
convert "$LOGO" -crop 420x420+330+200 +repage -strip "$OUT/tmp-icon.png"
convert "$LOGO" -crop 800x260+140+310 +repage -resize 800x -strip "$OUT/tmp-emblem.png"
convert -size 512x512 xc:'#0B1023' \( "$OUT/tmp-emblem.png" -resize 470x \) -gravity center -composite -strip "$OUT/tmp-icon.png"
convert "$OUT/tmp-icon.png" -resize 180x180 public/apple-touch-icon.png
convert "$OUT/tmp-icon.png" -resize 32x32 public/favicon-32.png
convert "$OUT/tmp-icon.png" -resize 192x192 public/icon-192.png
convert "$OUT/tmp-icon.png" \( -clone 0 -resize 16x16 \) \( -clone 0 -resize 32x32 \) \( -clone 0 -resize 48x48 \) -delete 0 public/favicon.ico
convert -size 1200x630 xc:'#0B1023' \( "$LOGO" -crop 820x380+130+318 +repage -resize 900x \) -gravity center -composite -strip -quality 86 public/og-image.jpg
rm "$OUT"/tmp-*.png

# Vídeos (mudos, sem metadados). clip <origem> <nome> <início> <duração> <filtro> [instante do poster]
# O instante do poster é o quadro mais nítido do trecho (variância do laplaciano medida nos originais).
clip() {
  local src="$SRC/$1" name="$2" ss="$3" t="$4" vf="$5"
  local poster="${6:-$(awk "BEGIN{print $ss+1.5}")}"
  ffmpeg -v error -y -ss "$ss" -t "$t" -i "$src" -an -map_metadata -1 -vf "$vf" \
    -c:v libx264 -profile:v high -preset slow -crf 27 -pix_fmt yuv420p -movflags +faststart "$OUT/$name.mp4"
  ffmpeg -v error -y -ss "$ss" -t "$t" -i "$src" -an -map_metadata -1 -vf "$vf" \
    -c:v libvpx-vp9 -b:v 0 -crf 40 -row-mt 1 -deadline good -cpu-used 2 "$OUT/$name.webm"
  # poster sempre na resolução nativa (sem o scale do vídeo)
  ffmpeg -v error -y -ss "$poster" -i "$src" -frames:v 1 -map_metadata -1 -vf "${vf/,scale=540:-2/}" "$OUT/tmp-poster.png"
  convert "$OUT/tmp-poster.png" -strip -quality 85 "$OUT/$name-poster.jpg"
  convert "$OUT/tmp-poster.png" -strip -quality 82 "$OUT/$name-poster.webp"
  rm "$OUT/tmp-poster.png"
}
# Vídeo 1: oficina, carreta de encalhe de madeira. 0–9 s tem pessoa e o final mostra alguém na porta: não usados.
clip b21e5f0b-nauticarretas_20261012_170754178.mp4 encalhe-bercos 15.5 13 "crop=720:1040:0:120,fps=30" 20.1
# Vídeo 2: bote na carreta. 0–9 s e após ~21 s aparecem pessoas: não usados.
clip 460d7541-nauticarretas_20261012_170807763.mp4 bote-carreta 14 7 "crop=720:1040:0:160,scale=540:-2,fps=30" 15.5   # 540 px: grama pesa muito em 720
# Vídeo 4: carreta de encalhe de madeira com placa. 0–21 s tem pessoa (selfie): não usado.
V4=ee0ec02c-nauticarretas_20261012_173309212.mp4
clip $V4 hero-oficina 22 13 "crop=720:1100:0:90,fps=30"
# Quadros parados na resolução nativa do vídeo (720 px), no instante mais nítido.
still() { ffmpeg -v error -y -ss "$2" -i "$SRC/$1" -frames:v 1 -map_metadata -1 -vf "$4" "$OUT/tmp-still.png"
  convert "$OUT/tmp-still.png" -strip -quality 86 "$OUT/$3.jpg"; convert "$OUT/tmp-still.png" -strip -quality 84 "$OUT/$3.webp"; rm "$OUT/tmp-still.png"; }
still $V4 30.9 placa-nauticarretas "crop=720:560:0:420"
still $V4 24.5 encalhe-madeira-engate "crop=720:1040:0:120"
# Vídeo 3: só pessoas falando — não publicado até confirmação.
ls -la "$OUT"
