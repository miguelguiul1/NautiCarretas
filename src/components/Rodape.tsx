import { NEGOCIO } from '../config'

export function Rodape() {
  return (
    <footer className="border-t border-linha py-10">
      <div className="container-site flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <img
          src="/media/logo-300.webp"
          alt="Nauticarretas"
          width={300}
          height={139}
          loading="lazy"
          className="h-14 w-auto self-start bg-noite"
        />
        <p className="nota text-[0.66rem] leading-relaxed text-nevoa sm:text-right">
          {NEGOCIO.razaoSocial} · {NEGOCIO.endereco.cidade}/{NEGOCIO.endereco.uf}
          <br />
          {NEGOCIO.bio}
        </p>
      </div>
    </footer>
  )
}
