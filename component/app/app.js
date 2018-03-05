
function App(elem){
    this.$elem = elem;
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

    this.player.render();
    this.computer.render();

    this.computer.field_div.addEventListener('click', this.computerPlay.bind(this));
};

App.prototype.computerPlay = function(){
 var cells = this.player.field_div.querySelectorAll('td:not(battlefield__cell_miss)');
 var event = {};
    var num = this.computer._getRandom(cells.length - 1);

 if(cells[num].firstElementChild.classList.contains('battlefield__cell_hit')){
     if(num + 1 == cells.length) {
         num--;
     } else {
         num++;
     }
 }
 event.target = cells[num].firstElementChild;
 setTimeout(this.player._shoot.bind(this.player,event),1000);
};