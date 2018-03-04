'use strict';
function Battlefield(obj){

    this.$elem = obj.elem;
    this.fieldType = obj.type;


    this.killedEnemy = 0;

    this.initArr = [
        [0,1,1,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]
    ];
}

// Battlefield.prototype._createCell = function(x,y,type){
//   var cell_str = 'АБВГДЕЖЗИК';
//   return '<td class="battlefield__cell ' + (type ? 'battlefield__cell_busy' : 'battlefield__cell_empty') +  '" '
//       + 'data-x="' + x + '" data-y="' + y + '" >' + '<div class="battlefield__cell-content"><span class="z"></span>'
//       +  (x === 0 ? '<div class="marker marker__row">' + (+y + 1) + '</div>' : '') + (y === 0 ? '<div class="marker marker__col">' + cell_str[x]  + '</div>' : '')
//       + '</div></td>';
// };

Battlefield.prototype.render = function(){
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
    + '<div class="battlefield-stat"><div class="ship-types"><div class="ship-type ship-type__len_4"><span class="ship"><span class="ship-part"></span><span class="ship-part"></span><span class="ship-part"></span><span class="ship-part"></span></span></div><div class="ship-type ship-type__len_3"><span class="ship"><span class="ship-part"></span><span class="ship-part"></span><span class="ship-part"></span></span><span class="ship"><span class="ship-part"></span><span class="ship-part"></span><span class="ship-part"></span></span></div><div class="ship-type ship-type__len_2"><span class="ship"><span class="ship-part"></span><span class="ship-part"></span></span><span class="ship"><span class="ship-part"></span><span class="ship-part"></span></span><span class="ship"><span class="ship-part"></span><span class="ship-part"></span></span></div><div class="ship-type ship-type__len_1"><span class="ship"><span class="ship-part"></span></span><span class="ship"><span class="ship-part"></span></span><span class="ship"><span class="ship-part"></span></span><span class="ship"><span class="ship-part"></span></span></div></div></div>'
    + '</div>';

    this._field_div = div;
    div.addEventListener('click',this._shoot.bind(this));
    this.$elem.appendChild(div);
};

Battlefield.prototype._shoot = function(event){
    var target = event.target;

    if(target.classList.contains('battlefield__cell-content')){
        var td = target.closest('td');
        var x = td.dataset.x;
        var y = td.dataset.y;

        td.classList.add((this.initArr[y][x] ? 'battlefield__cell_hit' : 'battlefield__cell_miss'));
    }
};

Battlefield.prototype.setPlayerName = function(name){
    var div = document.createElement('div');
    div.classList.add('battlefield__label');
    div.textContent = 'Игрок ' + name;
    this._field_div.appendChild(div);
};

Battlefield.prototype._createRandomCoordinate = function( ){
    return Math.floor(Math.random() * 10) + 1;
};

Battlefield.prototype.init = function(){

};