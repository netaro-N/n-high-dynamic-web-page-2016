audios = document.getElementsByTagName('audio');
world_column = [];
for(i=0;i<6;i++){
    world_column[i] = [];
    for(j=0;j<5;j++)world_column[i][j] = document.getElementById('game_world').getElementsByTagName('tr')[j].getElementsByTagName('td')[i];
}
fall_image = world_column[0][0].style['background-image'];
fall_point = 0;
fall_left  = 0;
character_column = [];
for(i=0;i<6;i++)character_column[i] = document.getElementById('character_field').getElementsByTagName('tr')[0].getElementsByTagName('td')[i];
character_image = character_column[0].style['background-image'];
character_point = 0;
character_lr    = document.getElementById('character_lr').value;
fall_point      = 0;
fall_yx         = document.getElementById('fall_yx');
game_score      = 0;
start_score     = document.getElementsByClassName('start_score');
new_start       = 0;
game_over       = 0;

function fall(){
    world_column[fall_left][fall_point + new_start].style['background-image'] = 'url()';
    if(new_start == 0)new_start = -1;
    if(fall_point == 5){
        if(game_score == game_score_before){
            start(1000,1);
            game_over++;
            alert('！GAME OVER！\nお疲れ様です！\n(((o(*ﾟ▽ﾟ*)o)))');
            start_score[1].innerHTML += '<br><a href="https://twitter.com/intent/tweet?text=' + encodeURIComponent('Catch Gameで\n' + game_score + '\nでした！') + '" target="_blank">結果をツイートするっ！</a>';
            start_score[0].innerHTML  = 'REPLAY';
            game_score = 0;
            new_start  = 0;
            game_over  = 0;
            start_score[0].onclick = function onclick(event){ start(1000,0); };
        }
        fall_point = 0;
    }
    if(fall_point == 0){
        game_score_before = game_score;
        fall_left = Math.floor( Math.random() * 6 );
        if(game_score>120){
            start(120,1);
            start(120,2);
        }else if(game_score>100){
            start(140,1);
            start(140,2);
        }else if(game_score>90){
            start(180,1);
            start(180,2);
        }else if(game_score>57){
            start(250,1);
            start(250,2);
        }else if(game_score>27){
            start(333,1);
            start(333,2);
        }else if(game_score>18){
            start(500,1);
            start(500,2);
        }else if(game_score>9){
            start(688,1);
            start(688,2);
        }
    }

    if(game_over == 0){
        world_column[fall_left][fall_point].style['background-image'] = fall_image;
        fall_yx.value = fall_point + ',' + fall_left;
        fall_point++;
    }
}

function start(speed,stop){
    start_score[0].onclick = function onclick(event){ alert('〜中断中〜'); };
    start_score[0].innerHTML = 'PLAYING…';
    start_score[1].innerHTML = 'Score:' + game_score;
    if(stop == 1){
        clearInterval( fall_move );
    }else if(stop == 2){
        clearInterval( fall_move );
        console.log(speed);
        fall_move = setInterval('fall()',speed);
    }else{
        fall_move = setInterval('fall()',speed);
    }
}

function character_move(lr){
    character_column[character_point].style['background-image'] = 'url()';
    character_point += lr;
    if(character_point<0) character_point = 0;
    if(character_point>5) character_point = 5;
    character_column[character_point].style['background-image'] = character_image;
    lr = lr * character_lr;
    character_column[character_point].style.transform='scaleX(' + lr + ')';
    fall_yx_array = fall_yx.value.split(',');
    for(i=0;i<2;i++) fall_yx_array[i] = parseInt( fall_yx_array[i] );
    if(fall_yx_array[0] > 2 && fall_yx_array[1] == character_point){
        game_score++;
        audios[0].play()
        start_score[1].innerHTML = 'Score:' + game_score;
    }
}

document.onkeydown=function(evt){
    key=evt.which;
    if(key==37||key==70){
        character_move(-1);//left
    }else if(key==39||key==74){
        character_move(1);//right
    }
}
