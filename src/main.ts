import './style.css'

const cep = document.querySelector<HTMLInputElement>("#cep")!
const logradouro = document.querySelector<HTMLInputElement>("#logradouro")!
const numero = document.querySelector<HTMLInputElement>("#numero")!
const bairro = document.querySelector<HTMLInputElement>("#bairro")!
const cidade = document.querySelector<HTMLInputElement>("#cidade")!
const estado = document.querySelector<HTMLInputElement>("#estado")!

cep.addEventListener('blur', () => {
  consultarCep()
})

function limparFormulario(){
  logradouro.value = ""
  bairro.value = ""
  cidade.value = ""
  estado.value = ""

}

async function consultarCep(){
  const result = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep.value}`)
  const body = await result.json()
  limparFormulario()
  numero.focus()
  logradouro.value = body.street
  bairro.value = body.neighborhood
}