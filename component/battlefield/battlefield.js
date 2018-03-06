'use strict';
function Battlefield(obj){

    this.$elem = obj.elem;
    this.fieldType = obj.type;

    // массив с данными кораблей по типам
    this.shipsData	= [
        '',
        // index элемента в массиве равен 1 - значит один корабль
        // 4 - у этого корабля 4 палубы
        // fourdeck - тип корабля (четырёхпалубный)
        [4, 'fourdeck'],
        [3, 'tripledeck'],
        [2, 'doubledeck'],
        [1, 'singledeck']
    ];

    this.killEnemy = 0;
    this.initArr = [];
    this.squadron = [];
}

Battlefield.prototype.render = function(){

    this._randomLocationShips();
    // на основе массива данных генерируется верстка поля
    var cell_str = 'АБВГДЕЖЗИК';
    var div = document.createElement('div');
    div.classList.add('battlefield');
    div.classList.add('battlefield_' + this.fieldType);
    div.innerHTML = '<div class="battlefield__gap"><div class="battlefield__table-placeholder"><table class="battlefield__table">'+
    (this.initArr.map(function(items,i){
        return '<tr class="battlefield-row">' + items.map(function(item,j){
                return '<td class="battlefield__cell ' + (item ? 'battlefield__cell_busy' : 'battlefield__cell_empty') +  '" '
                    + 'data-x="' + j + '" data-y="' + i + '" >' + '<div class="battlefield__cell-content"><span class="z"></span>'
                    +  (j === 0 ? '<div class="marker marker__row">' + (i + 1) + '</div>' : '') + (i === 0 ? '<div class="marker marker__col">' + cell_str[j]  + '</div>' : '')
                    + '</div></td>';
            }).join('') + '</tr>'
    })).join('')
    +'</table></div>'
    + '<div class="battlefield-stat"><div class="ship-types"><div class="ship-type ship-type__len_4 fourdeck"><span class="ship"><span class="ship-part"></span><span class="ship-part"></span><span class="ship-part"></span><span class="ship-part"></span></span></div>'
    +'<div class="ship-type ship-type__len_3 tripledeck"><span class="ship"><span class="ship-part"></span><span class="ship-part"></span><span class="ship-part"></span></span><span class="ship"><span class="ship-part"></span><span class="ship-part"></span><span class="ship-part"></span></span></div>'
    +'<div class="ship-type ship-type__len_2 doubledeck"><span class="ship"><span class="ship-part"></span><span class="ship-part"></span></span><span class="ship"><span class="ship-part"></span><span class="ship-part"></span></span><span class="ship"><span class="ship-part"></span><span class="ship-part"></span></span></div>'
    +'<div class="ship-type ship-type__len_1 singledeck"><span class="ship"><span class="ship-part"></span></span><span class="ship"><span class="ship-part"></span></span><span class="ship"><span class="ship-part"></span></span><span class="ship"><span class="ship-part"></span></span></div></div></div>'
    + '</div>';

    this.field_div = div;

    //обрабатываем нажатие только на поле соперника
    if (this.fieldType == 'rival'){
        div.addEventListener('click',this._shoot.bind(this));
    }
    this.$elem.appendChild(div);
    // если поле создано для игрока, отображаем все его корабли
    if (this.fieldType == 'self'){
        this.squadron.forEach(function(item){
            item.showShip();
        });
    }
};

Battlefield.prototype._shoot = function(event){

    // функция для обстрела кораблей
    var target = event.target;

    if(target.classList.contains('battlefield__cell-content')){
        var td = target.closest('td');
        var x = td.dataset.x;
        var y = td.dataset.y;
        var custom_event = new CustomEvent('gameover',{bubbles: true,
            cancelable: true,
            detail:{
                initiator:this.fieldType
            }});

        td.classList.add((this.initArr[y][x] ? 'battlefield__cell_hit' : 'battlefield__cell_miss'));

        this.killEnemy += this.initArr[y][x];

        var ship = this.getShootedShip(x,y);
        if(ship){
            if(this.fieldType == 'rival'){
                ship.showShip();
            }
            ship.shootOnShip();
        }

        if( this.killEnemy === 20){
            this.field_div.dispatchEvent(custom_event);
        }
    }
};

Battlefield.prototype.getShootedShip = function(x,y){
    // Просматриваем координаты существующих кораблей и ищем среди них те,
    // у которых содержатся переданные координаты
    var squadron  = this.squadron;
    for (var i = 0; i < squadron.length; i++){
        for(var j = 0 ; j < squadron[i].matrix.length; j++){
            // console.log(squadron[i].matrix[j][0],squadron.matrix[j][1],x,y);
            if(squadron[i].matrix[j][0] == y && squadron[i].matrix[j][1] == x){
                squadron[i].hits++;
                return (squadron[i].hits == squadron[i].decks) ? squadron[i] : false;
            }
        }
    }

    return false;
};

Battlefield.prototype.setPlayerName = function(name){
    this.playerName = name;
    //Устанавливает имя игрока для игрового поля
    var div = document.createElement('div');
    div.classList.add('battlefield__label');
    div.textContent = 'Игрок ' + name;
    this.field_div.appendChild(div);
};

Battlefield.prototype._getRandom = function(n){
    // n - максимальное значение, которое хотим получить
    return Math.floor(Math.random() * (n + 1));
};

Battlefield.prototype._randomLocationShips = function() {

    function createMatrix() {
        var x = 10, y = 10, arr = [10];
        for (var i = 0; i < x; i++) {
            arr[i] = [10];
            for(var j = 0; j < y; j++) {
                arr[i][j] = 0;
            }
        }
        return arr;
    }


    this.initArr = createMatrix();

    for (var i = 1, length = this.shipsData.length; i < length; i++) {
        var decks = this.shipsData[i][0];

        for (var j = 0; j < i; j++) {
            // получаем координаты первой палубы и направление расположения палуб (корабля)
            var fc = this.getCoordinatesDecks(decks);

            // добавим объекту 'fc' два новых свойства
            //количество палуб
            fc.decks 	= decks;
            // и уникальное имя корабля, которое будет использоваться в качестве его 'id'
            fc.shipname	= this.shipsData[i][1];
            fc.shipNum =  j;
            // создаём экземпляр объекта корабля с помощью конструктора 'Ships'
            var ship = new Ships(this, fc);
            // генерируем новый корабль и выводим его на экран монитора
            ship.createShip();
        }
    }
};

Battlefield.prototype.getCoordinatesDecks = function(decks) {
    // получаем коэфициенты определяющие направление расположения корабля
    // kx == 0 и ky == 1 — корабль расположен горизонтально,
    // kx == 1 и ky == 0 - вертикально.
    var kx = this._getRandom(1),
        ky = (kx == 0) ? 1 : 0,
        x, y;

    // в зависимости от направления расположения, генерируем
    // начальные координаты
    if (kx == 0) {
        x = this._getRandom(9);
        y = this._getRandom(10 - decks);
    } else {
        x = this._getRandom(10 - decks);
        y = this._getRandom(9);
    }

    // проверяем валидность координат всех палуб корабля:
    // нет ли в полученных координатах или соседних клетках ранее
    // созданных кораблей
    var result = this.checkLocationShip(x, y, kx, ky, decks);
    // если координаты невалидны, снова запускаем функцию
    if (!result) return this.getCoordinatesDecks(decks);

    // создаём объект, свойствами которого будут начальные координаты и
    // коэфициенты определяющие направления палуб

    return {
        x: x,
        y: y,
        kx: kx,
        ky: ky
    };
};

Battlefield.prototype.checkLocationShip = function(x, y, kx, ky, decks) {
    // зарегистрируем переменные
    var fromX, toX, fromY, toY;

    // формируем индексы начала и конца цикла для строк
    // если координата 'x' равна нулю, то это значит, что палуба расположена в самой верхней строке,
    // т. е. примыкает к верхней границе и началом цикла будет строка с индексом 0
    // в противном случае, нужно начать проверку со строки с индексом на единицу меньшим, чем у
    // исходной, т.е. находящейся выше исходной строки
    fromX = (x == 0) ? x : x - 1;
    // если условие истинно - это значит, что корабль расположен вертикально и его последняя палуба примыкает
    // к нижней границе игрового поля
    // поэтому координата 'x' последней палубы будет индексом конца цикла
    if (x + kx * decks == 10 && kx == 1) toX = x + kx * decks;
    // корабль расположен вертикально и между ним и нижней границей игрового поля есть, как минимум, ещё
    // одна строка, координата этой строки и будет индексом конца цикла
    else if (x + kx * decks < 10 && kx == 1) toX = x + kx * decks + 1;
    // корабль расположен горизонтально вдоль нижней границы игрового поля
    else if (x == 9 && kx == 0) toX = x + 1;
    // корабль расположен горизонтально где-то по середине игрового поля
    else if (x < 9 && kx == 0) toX = x + 2;

    // формируем индексы начала и конца цикла для столбцов
    // принцип такой же, как и для строк
    fromY = (y == 0) ? y : y - 1;
    if (y + ky * decks == 10 && ky == 1) toY = y + ky * decks;
    else if (y + ky * decks < 10 && ky == 1) toY = y + ky * decks + 1;
    else if (y == 9 && ky == 0) toY = y + 1;
    else if (y < 9 && ky == 0) toY = y + 2;

    // запускаем циклы и проверяем выбранный диапазон ячеек
    // если значение текущей ячейки равно 1 (там есть палуба корабля)
    // возвращаем false
    for (var i = fromX; i < toX; i++) {
        for (var j = fromY; j < toY; j++) {
            if (this.initArr[i][j] == 1) return false;
        }
    }
    return true;
};


