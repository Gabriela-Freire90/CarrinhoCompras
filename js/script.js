/*variavel carregando as estruturas de html*/

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
    como ele é array tenho que informar qual eu quero ex: price[0]
    para colocar em 2 casas decimais o valor: toFixed(2)*/
    modelsItem.querySelector('.models-item--price').innerHTML = `R$ ${item.price[0].toFixed(2)}`;

    /*buscanco as informações de name e description no arquivo models.js e retornando na classe do html*/
    modelsItem.querySelector('.models-item--name').innerHTML = item.name;
    modelsItem.querySelector('.models-item--desc').innerHTML = item.description;

    /*quando clico na tag a, adiciona um evento, fazendo a função e*/
    modelsItem.querySelector('a').addEventListener('click', (e) => {
        /*evitar carga de trabalho*/
        e.preventDefault();
        /*pegando o elemento e dizendo pra pegar o elemento mais proximo a ele  que tenha a classe .models-item*/
        /*vai pegar o valor que esta na data-key e colocar na variavel key*/
        let key = e.target.closest('.models-item').getAttribute('data-key;')
        /*vai pegar o valor que esta na data-key e colocar na variavel key*/
        c('.modelsBig img').src = modelsJson[key.img];
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
/*aula 09 - min 41 */