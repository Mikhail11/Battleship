function Ships(player, fc) {
    // на каком поле создаётся данный корабль
    this.player 	= player;
    // уникальное имя корабля
    this.shipname 	= fc.shipname;
    // уникальный номер корабля
    this.shipNum 	= fc.shipNum;
    //количество палуб
    this.decks		= fc.decks;
    // координата X первой палубы
    this.x0			= fc.x;
    // координата Y первой палубы
    this.y0			= fc.y;
    // направлении расположения палуб
    this.kx			= fc.kx;
    this.ky 		= fc.ky;
    // счётчик попаданий
    this.hits 		= 0;
    // массив с координатами палуб корабля
    this.matrix		= [];



}

Ships.prototype.createShip = function() {
    var k		= 0, // счётчик циклов
        x		= this.x0,
        y		= this.y0,
        kx		= this.kx,
        ky		= this.ky,
        decks	= this.decks,
        player	= this.player;

    // количество циклов будет равно количеству палуб создаваемого корабля
    while (k < decks) {
        // записываем координаты корабля в матрицу игрового поля
        // теперь наглядно должно быть видно зачем мы создавали два
        // коэфициента направления палуб
        // если коэфициент равен 1, то соотвествующая координата будет
        // увеличиваться при каждой итерации
        // если равен нулю, то координата будет оставаться неизменной
        // таким способом мы очень сократили и унифицировали код
        // значение 1, записанное в ячейку двумерного массива, говорит о том, что
        // по данным координатам находится палуба некого корабля
        player.initArr[x + k * kx][y + k * ky] = 1;
        // записываем координаты корабля в матрицу экземпляра корабля
        this.matrix.push([x + k * kx, y + k * ky]);
        k++;
    }

    // заносим информацию о созданном корабле в массив эскадры
    player.squadron.push(this);

};

Ships.prototype.showShip = function() {
    // if(this.decks == 4) debugger;
    // создаём новый элемент с указанным тегом
    var kx = this.kx;
    var ky = this.ky;
    var div	 = document.createElement('div');
    div.classList.add('ship-box');
    div.dataset['length'] = this.decks;
    if(!kx && ky) {
        div.dataset.position = 'h';
        div.style.width = 2 * this.decks + 'em';
        div.style.height = 2 + 'em';
        div.style.paddingBottom = '0px';
        div.style.paddingRight = (this.decks - 1) + 'px';
    }

    if(kx && !ky) {
        div.dataset.position = 'v';
        div.style.height  = 2 * this.decks + 'em';
        div.style.width = 2 + 'em';
        div.style.paddingRight  = '0px';
        div.style.paddingBottom = (this.decks - 1) + 'px';
    }

    // находим стартовую ячейку к торой прикрепляем корабль

    var content = this.player.field_div.querySelector('table').rows[this.x0].cells[this.y0].querySelector('.battlefield__cell-content');
    this.shipBox = div;
    if(this.player.initArr[this.x0][this.y0])
    content.appendChild(div);
};

Ships.prototype.shootOnShip = function(){
    if(this.hits === this.decks){
        this.shipBox.classList.add('ship-box_done');
        // this.player.field_div.querySelectorAll(this.shipname + '> .ship')[this.shipNum].classList.add('ship__killed');
        this.player.field_div.querySelectorAll('.'+ this.shipname + '> .ship')[this.shipNum].classList.add('ship__killed');
    }
};