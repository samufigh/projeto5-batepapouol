axios.defaults.headers.common['Authorization'] = 'WKgNq8Z2mDPneSiuCRWuHS09'; //autorização

//variáveis e objetos -------------------------------------------------------------------------

//funções -------------------------------------------------------------------------------------
function naoEnviou(res){
    window.location.reload(true);
}

function mostrarMensagens(resposta){
    let main = document.querySelector('.main')
    main.innerHTML='';
    let informacoes = resposta.data;
    console.log(informacoes);   
    for (let i=0; i<informacoes.length; i++){
        let mensagem = informacoes[i]
        if (mensagem.type === 'status'){
            main.innerHTML+=`
            <li data-test="message" class = "caixa" >
                <div> <span>(${mensagem.time})</span> <b>${mensagem.from}</b> ${mensagem.text}</div>
                <p></p>
            </li>
            `
        }
        else{
            main.innerHTML+=`
            <li data-test="message" class = "caixa" >
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
      console.log('Online');
    }, 5000);
}

function enviarMensagem(){
    let msg = document.querySelector('.texto').value;
    console.log(msg);

    const msgEnviada = {
        from: nome,
        to: "Todos",
        text: msg,
        type: 'message'
    }
    let enviou = axios.post('https://mock-api.driven.com.br/api/vm/uol/messages', msgEnviada);
    enviou.then (mostrarMensagens);
    enviou.catch (naoEnviou);
}

function entrou (resposta){
    console.log ('entrou na sala');

    //verificar se esta online
    verificarOnline();

    //exibir mensagens
    console.log('exibir mensagens');
    const promessaMensagens = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');
    promessaMensagens.then( mostrarMensagens );
}

function saiu () {
    nome = prompt ('Digite outro nome, pois esse já está em uso');
    usuario = {
        name: nome
    }
}

//execução ------------------------------------------------------------------------------------

//perguntar o nome do usuario

let nome = prompt('Qual seu nome?');
let usuario = {
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
