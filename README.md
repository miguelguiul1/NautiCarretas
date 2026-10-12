# Nauticarretas: site

Site de página única da Nauticarretas LTDA (Fábio Roberto), feito para converter em conversa no WhatsApp.
React + TypeScript + Vite + Tailwind v4. O Radix Dialog (primitivo do shadcn/ui) é usado no menu mobile e no lightbox. Não tem backend.

## Rodar local

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # gera dist/
npm run preview      # serve dist/ em http://localhost:4173
npm run lint
npm run screenshots  # depois do build: screenshots em 390 e 1440 px + checagem de console/404/rolagem horizontal
```

## Estrutura

- `src/config.ts`: dados confirmados do negócio, links de WhatsApp/mapa/Instagram e a chave `MOSTRAR_PENDENCIAS`
- `src/data/anatomia.ts`: peças e serviços do desenho técnico (seção "Peça por peça")
- `src/data/galeria.ts`: fotos e vídeos da seção "Oficina"
- `src/data/antesDepois.ts`: pares antes/depois (a seção só aparece quando a lista tiver itens)
- `src/components/`: uma seção por arquivo; `DesenhoCarreta.tsx` é o SVG técnico
- `scripts/process-assets.sh`: gera `public/media` a partir dos originais em `materiais/` (fora do git), sem metadados/GPS
- `screenshots/`: capturas em 390 e 1440 px

## Pendências (TODO-CONFIRMAR)

Procure por `TODO-CONFIRMAR` no código. Os textos provisórios aparecem com a marca "a confirmar" enquanto
`MOSTRAR_PENDENCIAS = true` (em `src/config.ts`).

1. Lista de serviços de manutenção (rolamentos, catracas, ganchos, rodagem central, chassi, galvanização, berços).
2. O que é "rodagem central" e onde ela fica na carreta.
3. A relação atual com a Estrela Náutica (ela vende barcos e as carretas desses barcos vêm da Nauticarretas?).
4. Domínio definitivo (canonical, og:url e og:image com URL absoluta).

## Material que falta

- Logo com fundo transparente (PNG ou SVG). A atual tem o fundo azul `#0B1023` embutido e por isso é sempre aplicada sobre essa cor.
- Fotos de antes e depois de reformas (mesmo enquadramento).
- Autorização para usar imagens com pessoas (Fábio e equipe). Hoje nenhum quadro com gente é publicado.
- Fotos de carretas de lancha e de veleiro.
