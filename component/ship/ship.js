function Ship(){

}


document.addEventListener("DOMContentLoaded", init);
function init(){

    var main_x;
    var main_y;

    var index=0;
    var index2=0;
    var suma=0;


    /*KILLED ships*/
    var killed=0;
    var killedEnemy=0;

    var myCreator={
        mainArray:[
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0]
        ],


        createDirection:        function(y,x,n){
            var element;
            var total_left=0;
            var total_right=0;
            var total_up=0;
            var total_bottom=0;
            var last_element=n;
            index++;

            /* FIRST RIGHT ROTATE **********************************************/
            console.log('Start to turn right');
            for(var i=0;i<n;i++){
                element=this.mainArray[y][x+i];
                console.log('y= '+y+'|x= |'+x+'| '+this.mainArray[y][x+i]+' i '+i+' element: '+element+' total_right '+total_right);

                if(element==undefined||element==NaN||x+n-1>10){
                    total_right+=1;
                    console.log('catched  right error'+' total_right '+total_right);
                    break;
                }


                total_right+=element;
            }

            if(total_right==0){return 1;}

            /*END RIGHT ROTATE**********************************************/

            else if(total_right>0||total_right==NaN||total_right==undefined){
                console.log('Start to turn left');
                for(var i=0;i<n;i++){
                    element=this.mainArray[y][x-i];
                    console.log('y= '+y+'| x= '+x+' |'+this.mainArray[y][x-i]+' i '+i+'element: '+element+' total_left '+total_left);

                    if(element==undefined||element==NaN||x-n+1<1){
                        total_left+=1;
                        console.log('catched  left error'+' total_left '+total_left+'element '+element);
                        break;
                    }


                    total_left+=element;

                }
            } if(total_left==0){return 3;} //------------------------------------> main my error

            else if(total_left>0||total_left==NaN||total_left==undefined){
                console.log('Start turned UP');
                for(var i=0;i<n;i++){
                    element=this.mainArray[y-i][x];


                    console.log('y= '+y+' |x= '+x+' |'+this.mainArray[y-i][x]+' i '+i+' element: '+element+' total_up '+total_up);
                    if(element==undefined||element==NaN||y-n+1<1){
                        total_up+=1;
                        console.log('catched  up error'+' total_up '+total_up+'element '+element);
                        break;
                    }



                    total_up+=element;

                }

            }
            if(total_up==0){return 0;}

            else if(total_up>0||total_left==NaN||total_left==undefined){
                console.log('Start to turn BOTTOM');
                for(var i=0;i<n;i++){
                    element=this.mainArray[y+i][x];
                    console.log('y= '+y+' |x= '+x+' |'+this.mainArray[y+i][x]+' i '+i+' element: '+element+' total_bottom '+total_bottom);
                    if(element==undefined||element==NaN||y+n-1>10){
                        total_bottom+=1;
                        console.log('catched  bottom error'+' total_bottom '+total_bottom+'element '+element);
                        break;
                    }

                    total_bottom+=element;

                }

                if(total_bottom==0){return 2;}


            }



        },//end createDirection


        countOne:function(){
            var indexOne=0;
            for(var i=1;i<11;i++){
                for(var j=1;j<11;j++){
                    var element=this.mainArray[i][j];

                    if(element==1){
                        indexOne++;
                    }

                }

            }

            return indexOne;

        },

        createRandomCoordinateX:function(){

            var x=Math.floor(Math.random() * 10) + 1;

            return x;
        },
        createRandomCoordinateY:function(){
            var y=Math.floor(Math.random() * 10) + 1;
            return y;
        },

        createShip:             function(n){



            do{
                var myX=this.createRandomCoordinateX();
                var myY=this.createRandomCoordinateY();
                var direction=this.createDirection(myY,myX,n);




            }while(

            (this.mainArray[myY][myX]!=0) && (direction==undefined)

                ) ; /*Problem, in some examples I can not create '2' because it is out of array             */



            console.log('myY ='+myY+' '+'myX ='+myX);






            console.log('direction='+direction +'index '+index);
            console.log('**********************************************');


            switch(direction){

                case 1:


                    this.mainArray[myY][myX]=1;

                    for (var i=0; i<n;i++){
                        this.mainArray[myY][myX+i]=1;//create main ship

                        this.mainArray[myY+1][myX-1]=2;//left
                        this.mainArray[myY-1][myX-1]=2;
                        this.mainArray[myY][myX-1]=2;

                        this.mainArray[myY][myX+n]=2;//right
                        this.mainArray[myY+1][myX+n]=2;
                        this.mainArray[myY-1][myX+n]=2;

                        this.mainArray[myY+1][myX+i]=2;//bottom
                        this.mainArray[myY-1][myX+i]=2;//up



                    } //for END
                    break;//case 3 end
                case 3:


                    this.mainArray[myY][myX]=1;

                    for (var i=0; i<n;i++){
                        this.mainArray[myY][myX-i]=1;//create main ship

                        this.mainArray[myY][myX+1]=2;
                        this.mainArray[myY+1][myX+1]=2;

                        this.mainArray[myY+1][myX-i]=2;

                        this.mainArray[myY][myX-n]=2;
                        this.mainArray[myY-1][myX-n]=2;

                        this.mainArray[myY-1][myX-i]=2;
                        this.mainArray[myY-1][myX+1]=2;
                        this.mainArray[myY+1][myX+n]=2;

                    } //for END
                    break;

                case 0:


                    this.mainArray[myY][myX]=1;

                    for (var i=0; i<n;i++){
                        this.mainArray[myY-i][myX]=1;//create main ship

                        this.mainArray[myY-i][myX-1]=2;
                        this.mainArray[myY+1][myX-1]=2;

                        this.mainArray[myY+1][myX]=2;

                        this.mainArray[myY+1][myX+1]=2;
                        this.mainArray[myY-i][myX+1]=2;

                        this.mainArray[myY-n][myX]=2;
                        this.mainArray[myY-n][myX+1]=2;
                        this.mainArray[myY-n][myX-1]=2;

                    } //for END
                    break;
                case 2:


                    this.mainArray[myY][myX]=1;

                    for (var i=0; i<n;i++){
                        this.mainArray[myY+i][myX]=1;//create main ship

                        this.mainArray[myY-1][myX]=2;
                        this.mainArray[myY-1][myX+1]=2;
                        this.mainArray[myY+i][myX-1]=2;
                        this.mainArray[myY+i][myX+1]=2;
                        this.mainArray[myY+n][myX+1]=2;
                        this.mainArray[myY+n][myX]=2;
                        this.mainArray[myY+n][myX-1]=2;
                        this.mainArray[myY-1][myX-1]=2;


                    } //for END
                    break;




            }//switch end

        }, //createShip function END

        search:  function (){
            for (var i=1;i<11;i++){
                for (var j=1;j<11;j++){
                    var element=this.draftArray[i][j];

                    if(element==1){
                        var zeroTop=this.draftArray[i-1][j];
                        var zeroBottom=this.draftArray[i+1][j];
                        var zeroLeft=this.draftArray[i][j-1];
                        var zeroRight=this.draftArray[i][j+1];

                        if(zeroTop==0&&i!=1){
                            console.log('Top');
                            search_direction=1;
                            //if(i==1){continue;}
                            return [search_direction,i-1,j];
                        }
                        if(zeroBottom==0&&i!=10){
                            console.log('Bottom');
                            search_direction=0;
                            //if(i==10){continue;}
                            return [search_direction,i+1,j];
                        }
                        if(zeroLeft==0&&j!=1){
                            console.log('Left');
                            search_direction=3;
                            //if(j==1){continue;}
                            return [search_direction,i,j-1];
                        }
                        if(zeroRight==0&&j!=10){
                            console.log('Right');
                            search_direction=2;
                            // if(j==10){continue;}
                            return [search_direction,i,j+1];
                        } else {
                            continue;
                            /* search_direction=4; return [search_direction,0];*/
                        }
                    }//element 1



                }
            }
        },


        shooting: function(){
            if(killed==20){
                alert("YOU LOOSE, refresh page please");


            }


            var mainShoot=this.search();
            switch (mainShoot){

                case undefined:
                    do{ // shoot coordinate 100% will not repeat


                        var shootX=Math.floor(Math.random() * 10) + 1;
                        var shootY=Math.floor(Math.random() * 10) + 1;

                    }while(this.draftArray[shootY][shootX]!=0);
                    break;

                default:

                    //do{
                    var shootX=mainShoot[2]; // описати щоб по самих краях не стріляти
                    var shootY=mainShoot[1];
                    // }while ((shootY<1&&shootY>10)&&(shootX<1&&shootX>10));
                    break;

            }

            console.log("fire "+mainShoot);


            console.log("Enemy shoot : "+" X "+shootX+"| Y "+shootY);
            console.log('suma'+suma);
            if(iAm.mainArray[shootY][shootX]==1){
                killed++;
                suma++;
                this.draftArray[shootY][shootX]=1;

                this.draftArray[shootY-1][shootX+1]=2;
                this.draftArray[shootY-1][shootX-1]=2;
                this.draftArray[shootY+1][shootX-1]=2;
                this.draftArray[shootY+1][shootX+1]=2;

                alliesField.rows[shootY-1].cells[shootX+1].style.backgroundColor="gray";
                alliesField.rows[shootY-1].cells[shootX+1].style.color="transparent";


                alliesField.rows[shootY-1].cells[shootX-1].style.backgroundColor="gray";
                alliesField.rows[shootY-1].cells[shootX-1].style.color="transparent";


                alliesField.rows[shootY+1].cells[shootX-1].style.backgroundColor="gray";
                alliesField.rows[shootY+1].cells[shootX-1].style.color="transparent";


                alliesField.rows[shootY+1].cells[shootX+1].style.backgroundColor="gray";
                alliesField.rows[shootY+1].cells[shootX+1].style.color="transparent";




                alliesField.rows[shootY].cells[shootX].style.backgroundColor="black";
                alliesField.rows[shootY].cells[shootX].style.color="transparent";

                return 0;
            } else {alliesField.rows[shootY].cells[shootX].style.backgroundColor="gray";
                this.draftArray[shootY][shootX]=2;
                alliesField.rows[shootY].cells[shootX].style.color="transparent";
                return 1;}

        },

        draftArray:[
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0]
        ],





    }//Object END


    var myNum;
    /* RESET FUNCTION */
    function reset(){
        for(var i=1;i<11;i++){
            for(var j=1;j<11;j++){
                myCreator.mainArray[i][j]=0;
            }

        }
    }





    function generate(){
        myCreator.createShip(4);

        myCreator.createShip(3);
        myCreator.createShip(3);

        myCreator.createShip(2);
        myCreator.createShip(2);
        myCreator.createShip(2);


        myCreator.createShip(1);
        myCreator.createShip(1);
        myCreator.createShip(1);
        myCreator.createShip(1);



        myNum=myCreator.countOne();

        /*------------------------------------------SHOW IN CONSOLE ENEMY TABLE */
        for(var i=1;i<11;i++){
            for(var j=1;j<11;j++){
                console.log(
                    myCreator.mainArray[i][1]+' '+
                    myCreator.mainArray[i][2]+' '+
                    myCreator.mainArray[i][3]+' '+
                    myCreator.mainArray[i][4]+' '+
                    myCreator.mainArray[i][5]+' '+
                    myCreator.mainArray[i][6]+' '+
                    myCreator.mainArray[i][7]+' '+
                    myCreator.mainArray[i][8]+' '+
                    myCreator.mainArray[i][9]+' '+
                    myCreator.mainArray[i][10]+'|'+i


                );
            }

        }

        /*------------------------------------------END SHOW IN CONSOLE ENEMY TABLE */



        /*COUNT QUANTITY OF '1', IF 20 -> ALL SHIPS ARE CREATED */
        console.log('myNum : '+ myNum);
        if (myNum==20){
            alert("Succesfuly!!!");
        }
        /*COUNT .....*/



    } //---------------------------------------end Generate function


    /* 100% guarentee*/
    if(myNum!=20){
        do{
            reset();
            generate();
            drawEnemyField();
        }while(myNum!=20);
    }
    /*100...*/




    /* COPY MAIN ARRAY TO HTML TABLE, DRAW ENEMY FIELD, BLACK, RED AND BLUE BOXES */
    function drawEnemyField(){
        var enemyField = document.getElementById("myTable");

        for(var i=1;i<11;i++){
            for(var j=1;j<11;j++){
                enemyField.rows[j].cells[i].innerHTML=myCreator.mainArray[j][i];


            }

        }

//create black border

        for(var i=0;i<12;i++){
            for(var j=0;j<12;j++){
                if(j==0||j==11){

                    enemyField.rows[j].cells[i].style.color="black";
                    enemyField.rows[j].cells[i].style.backgroundColor="gray";
                    enemyField.rows[j].cells[i].className ="table_border";
                    enemyField.rows[j].cells[i].style.borderStyle="none";
                    enemyField.rows[j].cells[i].innerHTML=i;

                    if(j==11){
                        enemyField.rows[j].cells[i].innerHTML="";
                    }

                    if(i==11&&j==0){
                        enemyField.rows[j].cells[i].innerHTML="";
                    }

                    if(i==0&j==0){
                        enemyField.rows[j].cells[i].innerHTML="";
                    }


                } else if(i==0||i==11){



                    enemyField.rows[j].cells[i].style.backgroundColor="gray";
                    enemyField.rows[j].cells[i].style.color="black";
                    enemyField.rows[j].cells[i].className ="table_border";
                    enemyField.rows[j].cells[i].style.borderStyle="none";


                    enemyField.rows[j].cells[i].innerHTML=j;

                    if(i==11){
                        enemyField.rows[j].cells[i].innerHTML="";
                    }



                }
                /*
                 enemyField.rows[j].cells[i].innerHTML=myCreator.mainArray[j][i];
                 if(enemyField.rows[j].cells[i].innerHTML==1){
                 enemyField.rows[j].cells[i].style.backgroundColor="red";
                 enemyField.rows[j].cells[i].style.color="red";
                 }
                 */

            }

        }




        var table = document.getElementById("myTable");
        if (table != null) {
            for (var i = 0; i < table.rows.length; i++) {
                for (var j = 0; j < table.rows[i].cells.length; j++)

                    if(i!=0&&i!=11&j!=0&&j!=11){

                        table.rows[i].cells[j].onclick = function () {




                            tableText(this);
                            var clickedY=tableText(this)[0];
                            var clickedX=tableText(this)[1];

                            if(myCreator.mainArray[clickedY][clickedX]==1){
                                suma++;

                                killedEnemy++;
                                if(killedEnemy==20){
                                    alert("Congratulations, you win!, please refresh page");
                                }

                                console.log('you shoot enemy '+' y '+clickedY+'| x '+clickedX);
                            }    else {
                                do{
                                    var enemy=myCreator.shooting();

                                }while(enemy!=1);
                            }



                        };

                    }// IF && many

            }
        }

        function tableText(tableCell) {
            // alert(tableCell.innerHTML);
//("row "+tableCell.parentNode.rowIndex+"|"+"cell "+tableCell.cellIndex);
            main_y=tableCell.parentNode.rowIndex;
            main_x=tableCell.cellIndex;
            //console.log("main y "+main_y+"|"+"main x "+main_x);

            if( tableCell.innerHTML==1){
                tableCell.style.backgroundColor="Crimson";
                tableCell.style.color="Crimson";

                // main_y=tableCell.parentNode.rowIndex;



            }

            else if(tableCell.innerHTML==0||tableCell.innerHTML==2){
                tableCell.style.backgroundColor="CornflowerBlue ";
                tableCell.style.color="CornflowerBlue ";


            }

            return [main_y,main_x];


        }

    } // end drawEnemyField





    var iAm={

        mainArray:[
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0]
        ]





    }//end object iAm


//Seting myCreator properties ti allies field, not all!
    iAm.createDirection=myCreator.createDirection;
    iAm.countOne=myCreator.countOne;

    iAm.createRandomCoordinateX=myCreator.createRandomCoordinateX;
    iAm.createRandomCoordinateY=myCreator.createRandomCoordinateY;
    iAm.createShip=myCreator.createShip;


    var myNum2;
    /* RESET FUNCTION */
    function reset_my(){
        for(var i=1;i<11;i++){
            for(var j=1;j<11;j++){
                iAm.mainArray[i][j]=0;
            }

        }
    }




    function generate_my(){
        iAm.createShip(4);

        iAm.createShip(3);
        iAm.createShip(3);

        iAm.createShip(2);
        iAm.createShip(2);
        iAm.createShip(2);

        iAm.createShip(1);
        iAm.createShip(1);
        iAm.createShip(1);
        iAm.createShip(1);





        myNum2=iAm.countOne();

        /*------------------------------------------SHOW IN CONSOLE ENEMY TABLE */
        for(var i=1;i<11;i++){
            for(var j=1;j<11;j++){
                console.log(
                    iAm.mainArray[i][1]+' '+
                    iAm.mainArray[i][2]+' '+
                    iAm.mainArray[i][3]+' '+
                    iAm.mainArray[i][4]+' '+
                    iAm.mainArray[i][5]+' '+
                    iAm.mainArray[i][6]+' '+
                    iAm.mainArray[i][7]+' '+
                    iAm.mainArray[i][8]+' '+
                    iAm.mainArray[i][9]+' '+
                    iAm.mainArray[i][10]+'|'+i


                );
            }

        }

        /*------------------------------------------END SHOW IN CONSOLE ENEMY TABLE */



        /*COUNT QUANTITY OF '1', IF 20 -> ALL SHIPS ARE CREATED */
        console.log('myNum : '+ myNum2);
        if (myNum2==20){
            alert("Succesfuly second !!!");
        }

    }
    /*COUNT .....*/







    if(myNum2!=20) {
        do{
            reset_my();
            generate_my();
            drawAlliesField();
        }while(myNum2!=20);
    }










    for(var i=1;i<11;i++){
        for(var j=1;j<11;j++){
            console.log(
                iAm.mainArray[i][1]+' '+
                iAm.mainArray[i][2]+' '+
                iAm.mainArray[i][3]+' '+
                iAm.mainArray[i][4]+' '+
                iAm.mainArray[i][5]+' '+
                iAm.mainArray[i][6]+' '+
                iAm.mainArray[i][7]+' '+
                iAm.mainArray[i][8]+' '+
                iAm.mainArray[i][9]+' '+
                iAm.mainArray[i][10]+'|'+i


            );
        }

    }


    var alliesField; //=document.getElementById("allies");
    /*DRAW ALLIES FIELD*/
    function drawAlliesField(){
        alliesField = document.getElementById("allies");
        console.log("typeof "+typeof alliesField);



        for(var i=1;i<11;i++){
            for(var j=1;j<11;j++){
                alliesField.rows[j].cells[i].innerHTML=iAm.mainArray[j][i];


                if(alliesField.rows[j].cells[i].innerHTML=='1'){

                    alliesField.rows[j].cells[i].style.backgroundColor="Crimson";
                    alliesField.rows[j].cells[i].style.color="Crimson";
                } else if(alliesField.rows[j].cells[i].innerHTML!='1'){
                    alliesField.rows[j].cells[i].style.backgroundColor="white";
                    alliesField.rows[j].cells[i].style.color="white";
                }


            }

        }

//create black border

        for(var i=0;i<12;i++){
            for(var j=0;j<12;j++){
                if(j==0||j==11){
                    alliesField.rows[j].cells[i].style.backgroundColor="gray";
                    // alliesField.rows[j].cells[i].style.color="transparent";
                    alliesField.rows[j].cells[i].className ="table_border";
                    alliesField.rows[j].cells[i].style.borderStyle="none";
                    alliesField.rows[j].cells[i].innerHTML=i;

                    if(j==11){
                        alliesField.rows[j].cells[i].innerHTML="";
                    }

                    if(i==11&&j==0){
                        alliesField.rows[j].cells[i].innerHTML="";
                    }

                    if(i==0&j==0){
                        alliesField.rows[j].cells[i].innerHTML="";
                    }


                } else if(i==0||i==11){



                    alliesField.rows[j].cells[i].style.backgroundColor="gray";
                    //  alliesField.rows[j].cells[i].style.color="transparent";


                    alliesField.rows[j].cells[i].className ="table_border";
                    alliesField.rows[j].cells[i].style.borderStyle="none";


                    alliesField.rows[j].cells[i].innerHTML=j;

                    if(i==11){
                        alliesField.rows[j].cells[i].innerHTML="";
                    }



                }


            }

        }


//Click table function

    } // end drawEnemyField




}//end INIT main body function

