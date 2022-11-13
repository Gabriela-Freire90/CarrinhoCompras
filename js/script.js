/*variavel carregando as estruturas de html*/

/*variavel array para o carrinho*/
let cart =[];
let modalQt = 0;
/*localiza o primeiro elemento da classe*/
const c = (el) => document.querySelector(el);
/*localiza todos os itens da classe*/
const cs = (el) => document.querySelectorAll(el);


/*pegando tudo que vem do banco modelsJson (models.js), formato array
map: mapear
vai pegar cada itém usando um index e vai para a função*/
modelsJson.map((item, index) => {

    /*pegar o .models-item que esta dentro do .models
    para pegar tudo que esta dendro dele, cloneNode(true), se for cloneNode(false) ele não pega as subdivisões da div
    let modelsItem = document.querySelector('.models .models-item').cloneNode(true);
    é a mesma coisa escrita a cima, atribuindo a variavel c*/
    let modelsItem = c('.models .models-item').cloneNode(true);

    /*criar um atributo para colocar no elemento, para ajustar a sequencia dos dados*/
    /*guardando o index, fica fisivel no html da pagina*/
    modelsItem.setAttribute('data-key', index);

    /*buscanco as informações imagem no arquivo models.js e retornando na classe do src dentro da tag img*/
    modelsItem.querySelector('.models-item--img img').src = item.img;

    /*buscanco as informações de preço no arquivo models.js e retornando na classe do html,
    como ele é array tenho que informar qual eu quero ex: price[2], o mais caro
    para colocar em 2 casas decimais o valor: toFixed(2)*/
    modelsItem.querySelector('.models-item--price').innerHTML = `R$ ${item.price[2].toFixed(2)}`;

    /*buscanco as informações de name e description no arquivo models.js e retornando na classe do html*/
    modelsItem.querySelector('.models-item--name').innerHTML = item.name;
    modelsItem.querySelector('.models-item--desc').innerHTML = item.description;

    /*quando clico na tag a, adiciona um evento, fazendo a função e*/
    modelsItem.querySelector('a').addEventListener('click', (e) => {
        /*evitar carga de trabalho*/
        e.preventDefault();
        /*pegando o elemento e dizendo pra pegar o elemento mais proximo a ele  que tenha a classe .models-item*/
        /*vai pegar o valor que esta na data-key e colocar na variavel key
        definindo o valor da modalQt = 1*/
        let key = e.target.closest('.models-item').getAttribute('data-key');
        modalQt = 1;
        /*vai executar no html e vai por a função no clique
        vai puxar a imagem*/
        c('.modelsBig img').src = modelsJson[key].img;
        /*vai executar no html e vai por a função no clique
       vai puxar o nome dos avioes*/
        c('.modelsInfo h1').innerHTML = modelsJson[key].name;
        /*vai executar no html e vai por a função no clique
        vai puxar a descrição dos avioes*/
        c('.modelsInfo--desc').innerHTML = modelsJson[key].description;
        /*vai executar no html e vai por a função no clique
       vai puxar o preço dos avioes, porém como varia ele vai para as condições...
        c('.modelsInfo--actualPrice').innerHTML = `R$ ${modelsJson[key].price[2].toFixed(2)}`;*/
        /*remover a escala pre-selecionada pelo html*/
        c('.modelsInfo--size.selected').classList.remove('selected');

        /*pegar o conjunto de informações da classe dos tamanhos
        cs = pegar tudo, forEach = dentro de cada um dos elemento
        executar a função dos elementos size(elemento) e sizeIndex (ordem do elemento)*/
        cs('.modelsInfo--size').forEach((size, sizeIndex) => {
            /*selecionar o modelo maior pegando a posição 2 onde esta as maiores medidas*/
            if (sizeIndex == 2) {
                size.classList.add('selected');
                /*vai puxar o preço do aviao que esta na posição 2*/
                c('.modelsInfo--actualPrice').innerHTML = `R$ ${modelsJson[key].price[sizeIndex].toFixed(2)}`;
            }
            /*preenchendo a informação do size, com o sizes do arquivo models.js
            com a infomação do banco (ordem do elemento)*/
            size.innerHTML = modelsJson[key].sizes[sizeIndex];

            /*a outra forma de fazer é colocar no html dentro do span os nomes PEQUENO, MÉDIO E GRANDE
            e aqui falando pra ele puxar o span
            size.querySelector('span').innerHTML = modelsJson[key].sizes[sizeIndex];*/
        });

        /*atribuindo o valor da variavel modalQt para a classe modelsInfo--qt*/
        c('.modelsInfo--qt').innerHTML = modalQt;
        /*colocando uma opacidade 0, para que a aba suma no começo*/
        c('.modelsWindowArea').style.opcity = 0;
        /*acionando o modo display que estava desligado no css*/
        c('.modelsWindowArea').style.display = 'flex';
        setTimeout(() => {
            /*colocando uma opacidade 1, para que a aba apareça, fazendo a transição no tempo de 200ms*/
            c('.modelsWindowArea').style.opcity = 1;
        }, 200);
    })
    /*preenchendo no site, append=acrescentar
    document.querySelector('.models-area').append(modelsItem);
    é a mesma coisa escrita a cima atribuindo a variavel c*/
    c('.models-area').append(modelsItem);
});

/*---------------------------criar ação no mode mobile---------------------------*/

/*fechar janela*/
function closeModal() {
    c('.modelsWindowArea').style.opcity = 0;
    setTimeout(() => {
        /*mandando sumir o display (fechar a janela), fazendo a transição no tempo de 500ms*/
        c('.modelsWindowArea').style.display = 'none';
    }, 500);
}

/*pegar o conjunto de informações da classe dos botoes de cancelar
cs = pegar tudo, forEach = dentro de cada um dos elemento, item esta no moda array
cria um evento que quando ocorre o clique aciona a função close modal*/
cs('.modelsInfo--cancelButton, .modelsInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal);
});

/*botar mais e menos do carrinho */
c('.modelsInfo--qtmenos').addEventListener('click', () => {
    /*não deixar o valor ficar negativo*/
    if (modalQt > 1) {
        /*vai diminuindo de 1 em 1 na variavel*/
        modalQt--;
        /*salva o valor na classe modelsInfo--qt*/
        c('.modelsInfo--qt').innerHTML = modalQt;
    }
});
c('.modelsInfo--qtmais').addEventListener('click', () => {
    /*vai incrementando de 1 em 1 na variavel*/
    modalQt++;
    /*salva o valor na classe modelsInfo--qt*/
    c('.modelsInfo--qt').innerHTML = modalQt;
});

/*mudar o modelo selecionado*/
/*pegar o conjunto de informações da classe dos tamanhos
cs = pegar tudo, forEach = dentro de cada um dos elemento
executar a função dos elementos size(elemento) e sizeIndex (ordem do elemento)*/
cs('.modelsInfo--size').forEach((size, sizeIndex) => {
    /*quando clico, adiciona um evento, fazendo a função e*/
    size.addEventListener('click', (e) => {
        /*remover a escala pre-selecionada pelo html*/
        c('.modelsInfo--size.selected').classList.remove('selected');
        /*seleciona o elemento da escala escala clicada
        e.target.classList.add('selected');*/
        /*para evitar problemas, vamos selecionar o size pois assim posso colocar
        outros dados na div e ele reconhecer o click, tipo o spam*/
        size.target.classList.add('selected');
    });
});

/*-----BOTAO CARRINHO DE COMPRAS */

c('.modelsInfo--addButton').addEventListener('click', ()=>{
    //Qual modelo escolhido?
    //Qual tamanho que escolheu?
    //Quantidade?
});


//aula 11 - min 30