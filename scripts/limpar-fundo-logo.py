"""Uniformiza o fundo da logo em exatamente #0B1023 (o JPEG original tem ruído de compressão no fundo),
para a logo se fundir ao cabeçalho sólido sem mostrar retângulo. Uso: python3 limpar-fundo-logo.py entrada saida.png"""
import sys
from PIL import Image

FUNDO = (11, 16, 35)
im = Image.open(sys.argv[1]).convert('RGB')
px = im.load()
for y in range(im.height):
    for x in range(im.width):
        r, g, b = px[x, y]
        # escuro e azulado = fundo; o dourado da logo tem vermelho alto e fica intacto
        if r < 40 and g < 42 and b < 62:
            px[x, y] = FUNDO
im.save(sys.argv[2])
