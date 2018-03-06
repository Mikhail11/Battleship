
function App(elem,playerName){
    this.$elem = elem;
    this.gameOver = false;
    this.playerName = playerName;
    this.winner = {};
}

App.prototype.init = function (){
    var mainDiv = document.createElement('div');
    mainDiv.classList.add('battlefields');
    this.player = new Battlefield({
        elem : mainDiv,
        type: 'self'
    });

    this.computer = new Battlefield({
        elem : mainDiv,
        type: 'rival'
    });

    this.$elem.appendChild(mainDiv);


    //строим поля для игры
    this.player.render();
    this.computer.render();

    //добавляем имена игроков
    this.computer.setPlayerName('Компьютер');
    this.player.setPlayerName(this.playerName);


    //Инициализируем объект победителя, для определения результата

    this.winner['self'] = this.computer.playerName;
    this.winner['rival'] = this.player.playerName;

    mainDiv.addEventListener('gameover',this.gameOverShow.bind(this));

    this.computer.field_div.addEventListener('click', this.computerPlay.bind(this));
};

App.prototype.gameOverShow = function(event){
    this.gameOver = true;
};

App.prototype.computerPlay = function(){
 if (this.gameOver) return false;
 var cells = this.player.field_div.querySelectorAll('td:not(battlefield__cell_miss)');
 var shoot_cells = Array.from(cells).filter(function(item){
     return (!item.classList.contains('battlefield__cell_hit'));
 });
 var event = {};
    var num = this.computer._getRandom(shoot_cells.length - 1);

 event.target = shoot_cells[num].firstElementChild;
    this.player._shoot(event);
 // setTimeout(this.player._shoot.bind(this.player,event),1000);
};