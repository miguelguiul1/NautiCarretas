// Tira screenshots em 320, 390 e 1440 px e verifica console, 404 e rolagem horizontal.
// Uso: npm run build && npm run screenshots   (sobe o vite preview sozinho)
import { spawn } from 'node:child_process'
import { existsSync, mkdirSync } from 'node:fs'
import { chromium } from '@playwright/test'

const PORTA = 4173
const URL_BASE = `http://localhost:${PORTA}/`
const LARGURAS = [320, 390, 1440]
mkdirSync('screenshots/secoes', { recursive: true })

const servidor = spawn('npx', ['vite', 'preview', '--port', String(PORTA), '--strictPort'], {
  stdio: 'ignore',
})
await new Promise((r) => setTimeout(r, 2500))

const exe = ['/opt/pw-browsers/chromium', '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'].find(
  (p) => existsSync(p),
)
const proxy = process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY, bypass: 'localhost,127.0.0.1' } : undefined
const browser = await chromium.launch({ executablePath: exe, proxy })
let falhou = false

for (const largura of LARGURAS) {
  for (const movimento of ['no-preference', 'reduce']) {
    const ctx = await browser.newContext({
      viewport: { width: largura, height: largura < 800 ? 844 : 900 },
      deviceScaleFactor: 1,
      reducedMotion: movimento,
      ignoreHTTPSErrors: false,
    })
    const page = await ctx.newPage()
    const erros = []
    page.on('console', (m) => m.type() === 'error' && erros.push(m.text()))
    page.on('pageerror', (e) => erros.push(e.message))
    page.on('response', (r) => r.status() >= 400 && erros.push(`${r.status()} ${r.url()}`))
    await page.goto(URL_BASE, { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)

    // Rola a página inteira para disparar lazy-load e animações de entrada
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 400) {
        window.scrollTo(0, y)
        await new Promise((r) => setTimeout(r, 150))
      }
      window.scrollTo(0, 0)
    })
    // fullPage do Chromium não pinta imagens lazy/async fora da viewport: força carregamento síncrono
    await page.evaluate(async () => {
      document.querySelectorAll('img').forEach((i) => {
        i.loading = 'eager'
        i.decoding = 'sync'
      })
      await Promise.all([...document.images].filter((i) => i.offsetParent).map((i) => i.decode().catch(() => {})))
    })
    const pendentes = await page.evaluate(() =>
      [...document.images].filter((i) => i.offsetParent !== null && !i.complete).map((i) => i.currentSrc || i.src),
    )
    if (pendentes.length) console.log('   imagens pendentes:', pendentes)
    await page.waitForTimeout(1200)

    const { scrollW, innerW } = await page.evaluate(() => ({
      scrollW: document.documentElement.scrollWidth,
      innerW: window.innerWidth,
    }))
    const sufixo = movimento === 'reduce' ? '-reduced-motion' : ''
    if (movimento === 'no-preference') {
      await page.screenshot({ path: `screenshots/home-${largura}.png`, fullPage: true })
      await page.screenshot({ path: `screenshots/hero-${largura}.png` })
      await page.locator('#anatomia').screenshot({ path: `screenshots/anatomia-${largura}.png` })
      // interação: seleciona a catraca e abre a galeria
      await page.locator('#peca-catraca').click()
      await page.locator('#anatomia').screenshot({ path: `screenshots/anatomia-catraca-${largura}.png` })
      await page.locator('#oficina ul button').nth(1).click()
      await page.waitForTimeout(600)
      await page.screenshot({ path: `screenshots/lightbox-${largura}.png` })
      await page.keyboard.press('Escape')
      await page.locator('#orcamento label', { hasText: 'De encalhe · lancha' }).click()
      await page.locator('#orcamento label', { hasText: 'Manutenção' }).first().click()
      await page.locator('#orcamento label', { hasText: 'Revisão e troca de rolamentos' }).click()
      await page.locator('#orcamento').screenshot({ path: `screenshots/orcamento-${largura}.png` })

      // Botão flutuante do WhatsApp: visível na galeria, escondido na seção de orçamento
      const flutuante = page.locator('a[aria-label="Conversar no WhatsApp"]').last()
      const opacidade = () => flutuante.evaluate((el) => getComputedStyle(el).opacity)
      await page.locator('#oficina').scrollIntoViewIfNeeded()
      await page.waitForTimeout(500)
      const naGaleria = await opacidade()
      await page.locator('#orcamento h2').scrollIntoViewIfNeeded()
      await page.waitForTimeout(500)
      const noOrcamento = await opacidade()
      const zapsNoCabecalho = await page.locator('header a[href*="wa.me"]').evaluateAll(
        (els) => els.filter((e) => e.offsetParent !== null).length,
      )
      console.log(
        `   flutuante: galeria opacity=${naGaleria}, orçamento opacity=${noOrcamento} · links de WhatsApp visíveis no cabeçalho: ${zapsNoCabecalho}`,
      )
      if (naGaleria !== '1' || noOrcamento !== '0' || zapsNoCabecalho) falhou = true

      // Uma captura por seção (cabeçalho e botão flutuante escondidos só nessas capturas, para não cobrir o conteúdo)
      await page.addStyleTag({ content: 'header, a[aria-label="Conversar no WhatsApp"] { visibility: hidden !important }' })
      for (const [nome, seletor] of [
        ['1-hero', '#topo'],
        ['2-frentes', '#o-que-fazemos'],
        ['3-anatomia', '#anatomia'],
        ['4-oficina', '#oficina'],
        ['5-quem-faz', '#quem-faz'],
        ['6-orcamento', '#orcamento'],
        ['7-contato', '#contato'],
        ['8-rodape', 'footer'],
      ]) {
        await page.locator(seletor).screenshot({ path: `screenshots/secoes/${nome}-${largura}.png` })
      }
    }
    const status = scrollW > innerW ? `ROLAGEM HORIZONTAL (${scrollW} > ${innerW})` : 'sem rolagem horizontal'
    console.log(`[${largura}px${sufixo}] ${status} · ${erros.length} erro(s)`)
    erros.forEach((e) => console.log('   ', e))
    if (scrollW > innerW || erros.length) falhou = true
    await ctx.close()
  }
}

await browser.close()
servidor.kill()
process.exit(falhou ? 1 : 0)
