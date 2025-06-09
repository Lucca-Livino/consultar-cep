import './style.css'

// Elementos de input
const cep = document.querySelector<HTMLInputElement>("#cep")!
const logradouro = document.querySelector<HTMLInputElement>("#logradouro")!
const numero = document.querySelector<HTMLInputElement>("#numero")!
const bairro = document.querySelector<HTMLInputElement>("#bairro")!
const estado = document.querySelector<HTMLSelectElement>("#estados")!
const cidade = document.querySelector<HTMLSelectElement>("#cidades")!

cep.addEventListener('blur', () => {
  consultarCep()
})

estado.addEventListener('change', () => {
  const uf = estado.value
  if (uf && uf !== "Selecione...") {
    carregarCidades(uf)
  } else {
    cidade.innerHTML = "<option value=''>Selecione...</option>"
  }
})


function limparFormulario() {
  logradouro.value = ""
  bairro.value = ""
  cidade.innerHTML = "<option value=''>Selecione...</option>"
  estado.value = "Selecione..."
}

async function consultarCep() {

    const result = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep.value}`)
    const body = await result.json()

    limparFormulario()
    numero.focus()

    logradouro.value = body.street
    bairro.value = body.neighborhood
    estado.value = body.state

    await carregarCidades(body.state)
    cidade.value = body.city

}

async function carregarEstados() {
    const result = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
    const estados = await result.json()

    estado.innerHTML = "<option value=''>Selecione...</option>"

    estados.forEach((uf: any) => {
      const option = document.createElement('option')
      option.value = uf.sigla
      option.textContent = uf.nome
      estado.appendChild(option)
    })

}

async function carregarCidades(siglaEstado: string) {
    const result = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${siglaEstado}/municipios?orderBy=nome`)
    const cidades = await result.json()

    cidade.innerHTML = "<option value=''>Selecione...</option>"

    cidades.forEach((c: any) => {
      const option = document.createElement('option')
      option.value = c.nome
      option.textContent = c.nome
      cidade.appendChild(option)
    })

}

carregarEstados()
