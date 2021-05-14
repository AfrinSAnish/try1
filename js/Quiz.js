class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    question.hide();
    textSize(30);
    Contestant.getPlayerInfo();

    //write condition to check if contestantInfor is not undefined
    if(allContestants!==undefined){
      var displayPosition = 300;
      textSize(20)
      text("NOTE:* Contestants who answered correct are highlighted in green colour",displayWidth/9,250)
      
      for(var plr in allContestants){
        var correctAns ="2";
        var color
          if(correctAns===allContestants[plr].answer){
              fill("green")
            //  color = "green"
          }else{
            fill("red")
            //  color = "red"
          }

          displayPosition += 30;
          stroke("black")
          textSize(20)

          text(allContestants[plr].name + ":" + allContestants[plr].answer,displayWidth/4,displayPosition)
          fill("BLACK")
          text("results",displayWidth/4,200)
          console.log(allContestants)
        }

        }


    if (keyDown(UP_ARROW) && player.index !== null){
      player.distance += 50;
      player.update();
    }
  }
}
