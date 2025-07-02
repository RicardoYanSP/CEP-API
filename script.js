

const consultarCep = () => {

    console.log('chamou a API')
    const cep = document.getElementById('cep').value

    let uri = `https://cep.awesomeapi.com.br/json/${cep}`

    console.log(`URI: ${uri}`)
    fetch(uri)
    .then(response => response.json())
    .then(json => {
        console.log(json)
    
        document.getElementById('rua').value = json.address
        document.getElementById('bairro').value = json.district
        document.getElementById('cidade').value = json.city
        document.getElementById('uf').value = json.state
        
        fetchMunicipios(json.state)
    

    })
}

const fetchEstados = () => {
    let uri = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome'
    console.log(`URI: ${uri}`)

    fetch(uri)
    .then(response => response.json())
    .then(data => {
        console.log(data)

        let options = '<option select>Selecione...</option>'

        data.forEach(estado => {
            options = options + `<option value="${estado.sigla}">${estado.nome} (${estado.sigla})</option>`     
        })

        document.getElementById('uf').innerHTML = options

    });

}

fetchEstados()



const fetchMunicipios = (uf) => {
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
    .then(response => response.json())
    .then(json => {
        console.log(json)

        let options = '<option selected>Escolha</option>'

        json.forEach(cidade => {
            options = options + `<option value="${cidade.nome}">${cidade.nome}</option>`
        })
        document.getElementById('cidade').innerHTML = options
    })
}
fetchMunicipios()