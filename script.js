axios.defaults.headers.common['Authorization'] = 'WKgNq8Z2mDPneSiuCRWuHS09'; //autorização

//variáveis e objetos -------------------------------------------------------------------------


//funções -------------------------------------------------------------------------------------

/*function mostrarUsuarios ( resposta ){ 
    console.log ( resposta );
    let main = document.querySelector('.main')
    let informacoes = resposta.data;

    let user = [informacoes];

    for (let i=0; i<informacoes.length; i++){
        let nick = informacoes[i]
        main.innerHTML+=`
            <li class = "user" >
                <h1><b>${nick.name}</b> entra na sala...${i}</h1>
            </li>
        `
    }
} */
//------
function mostrarMensagens(resposta){
    let main = document.querySelector('.main')
    main.innerHTML='';
    let informacoes = resposta.data;

    for (let i=0; i<informacoes.length; i++){
        let mensagem = informacoes[i]
        if ((mensagem.text == 'entra na sala...') || (mensagem.text == 'sai da sala...')){
            main.innerHTML+=`
            <li class = "caixa" >
                <div> <span>(${mensagem.time})</span> <b>${mensagem.from}</b> ${mensagem.text}</div>
                <p></p>
            </li>
            `
        }
        else{
            main.innerHTML+=`
            <li class = "caixa" >
                <div> <span>(${mensagem.time})</span> <b>${mensagem.from}</b> para <b  class = "todos" >${mensagem.to}</b>: ${mensagem.text}</div>
                <p></p>
            </li>
            `
        }
    }
}

function verificarOnline(){
    setInterval(function() {
      axios.post('https://mock-api.driven.com.br/api/vm/uol/status', usuario);
      console.log('foii');
    }, 5000);
}
//------
function entrou (resposta){
    console.log ('deu certo');

    //verificar se esta online
    verificarOnline();

    //exibir pessoas que saíram da sala

    //exibir mensagens
    console.log('oi');
    const promessaMensagens = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');
    promessaMensagens.then( mostrarMensagens );
}

function saiu () {
    alert('saiu');

}

//execução ------------------------------------------------------------------------------------

//perguntar o nome do usuario

const nome = prompt('Qual seu nome?');
const usuario = {
    name: nome
}

//mandar meu usuário pro servidor
const promessaUser = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', usuario);

promessaUser.then ( entrou );
setInterval(function() {
    axios.get('https://mock-api.driven.com.br/api/vm/uol/messages').then( mostrarMensagens )
    console.log('atualizou');
}, 3000);
promessaUser.catch ( saiu );
