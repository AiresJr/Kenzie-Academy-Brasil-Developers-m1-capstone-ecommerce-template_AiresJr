totalSoma = 0;

function createCard() {
    let div = document.createElement('div');
    div.setAttribute('class', 'cardCamisetas');
    let ul = document.createElement('ul');

    for (let i = 0; i < data.length; i++) {
        let dataList = data[i];

        let li = document.createElement('li');
        let img = document.createElement('img');
        img.setAttribute('class', 'imgVitrine');
        img.src = dataList.img
        img.alt = dataList.nameItem

        let div1 = document.createElement('div');
        div1.setAttribute('class', 'tag1');

        let span = document.createElement('span');
        span.innerText = dataList.tag;

        let div2 = document.createElement('div');
        div2.setAttribute('class', 'product');

        let span1 = document.createElement('span');
        span1.innerText = dataList.nameItem;

        let p = document.createElement('p');
        p.innerText = dataList.description;

        let span2 = document.createElement('span');
        span2.setAttribute('class', 'price')
        span2.innerText = `R$ ${dataList.value},00`;

        let div3 = document.createElement('div');
        let button = document.createElement('button');
        button.setAttribute('id', dataList.id)
        button.setAttribute('class', 'btn_carro')
        button.innerText = dataList.addCart

        div.append(ul, li, img, div1, span, div2, span1, p, span2, div3, button);
        ul.appendChild(li)
        li.append(img, div1, span, div2, span1, p, span2, div3, button);
        div1.appendChild(span);
        div2.appendChild(span1);
        div3.appendChild(button);

    }
    let list = document.querySelector('.cards');
    list.appendChild(div);


}
createCard();

let botoes = document.querySelectorAll('.btn_carro');
let carroCount = 0;

for (let i = 0; i < botoes.length; i++) {
    let botao = botoes[i];

    botao.addEventListener('click', function (e) {
        let idElemento = e.target.id;
        let id = parseInt(idElemento)

        let item = procuraItem(id)

        let card = criarCardCarro(item);

        let lista = document.querySelector('.listaCarro');
        lista.appendChild(card);

        carroCount++;

        document.querySelector('#itemQuantidade').innerHTML = `${carroCount}`

        totalSoma += item.value;

        document.querySelector('.totalValor').innerHTML = `R$${totalSoma.toFixed(2)}`
    })
}

function procuraItem(id) {
    for (let i = 0; i < data.length; i++) {
        let item = data[i];
        if (id == item.id) {
            return item;
        }
    }
    return 'Erro'
}

function criarCardCarro(item) {

    let li = document.createElement('li');
    li.setAttribute('class', 'liItem');

    let img = document.createElement('img');
    img.setAttribute('class', 'imgItem');
    let span = document.createElement('span');
    span.setAttribute('class', 'spanItem');
    let span1 = document.createElement('span');
    span1.setAttribute('class', 'spanValor');
    let button = document.createElement('button');


    li.id = 'f_' + item.id;
    img.src = item.img;
    span.innerText = item.nameItem;
    span1.innerText = `R$ ${item.value},00`;
    button.innerText = 'Remover';
    button.id = 'fav_' + item.id;


    button.addEventListener('click', function (e) {


        li.remove();
        carroCount--;
        document.querySelector('#itemQuantidade').innerHTML = `${carroCount}`
        totalSoma -= item.value;
        document.querySelector('.totalValor').innerHTML = `R$${totalSoma.toFixed(2)}`
        
   
    })

    li.append(img, span, span1, button);
    button.classList.add('productButton');

    return li;

}