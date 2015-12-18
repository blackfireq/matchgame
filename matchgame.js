// variables
var cardsTotal = 18; //this must be an even number
var cardsMatchedTotal = cardsTotal / 2;
var scoreboard = {
	gameScore : 0,
	gamesWon : 0,
	cardsMatchedCurrently : 0
};
var cardCount = 0;
var selectedCard = {
	elementId : "undefined",
	cardId : "undefined"
};
	var shapes= [ 
		'square1','circle1','ghost1','pillar1','rectangle1',
		'square2','circle2','ghost2','pillar2','rectangle2',
		'square3','circle3','ghost3','pillar3','rectangle3',
		'square4','circle4','ghost4','pillar4','rectangle4'
	];
gameShapes = [];

//cookie functions

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
} 

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
    }
    return "";
} 

function checkCookie(cname) {
    var cookie=getCookie(cname);
    if (cookie!="") {
        return true;
    }else{
        return false;
        }
} 

function removeCookie(cname) {
	var d = new Date();
    d.setTime(d.getTime() - (1*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + " " + "; " + expires;
}

//sets the scoreboard
function scorebordSetup(){
	$('<div></div>').addClass('scoreboard').appendTo('body');
	$('<ul></ul>').appendTo('.scoreboard');
	$('<li></li>').appendTo('.Scoreboard ul');
}

//sets up the gameboard
function gameboardSetup (){	
	
	//creates the gameboard div
	$('<div></div>').addClass('gameboard clearfix:after').appendTo('body');
	
	//adds the cards holders
	for ( var i = 0; i < 18; i++ ) {
		$('<div></div>').addClass('card-holder').appendTo(".gameboard");
	}
	
	// add cards to card-holder elements
	$('<div></div>').addClass('card').on('click',checkForMatch).appendTo(".card-holder");
	cardNum = 0;	
	
	//add id to each of the cards
	$('.card').each(function (){
		$(this).attr('id','card'+cardNum);
		cardNum++;
	});
	
	//make sure there is a matched set of each card
	var cardCount = 0;
	while(cardCount != cardsTotal){
		var currentShape = shapes[parseInt(Math.random()*shapes.length)];
		gameShapes[cardCount++] = currentShape;
		gameShapes[cardCount++] = currentShape;
	}
	//randomizes gameShapes before adding them to the board
	for(var i=0;i<96;i++){
		var card1 = parseInt(Math.random()*cardsTotal);
		var card2 = parseInt(Math.random()*cardsTotal);
		if(card1 != card2){
			gameShapes[card2] = gameShapes[card1].concat('@'+gameShapes[card2]);
			gameShapes[card1] = gameShapes[card2].substring(gameShapes[card2].indexOf('@')+1);
			gameShapes[card2] = gameShapes[card2].substring(0,gameShapes[card2].indexOf('@'));
		}	
	}
	
	
	//adds the images to the cards on the gameboard
	cardCount =0;
	$('.card').each(function(){
		$('<span></span>').addClass(gameShapes[cardCount++]).appendTo(this);
	});
	
}

//checks if the 2 cards match				
function checkForMatch() {
	if(selectedCard.elementId === 'undefined'){
		selectedCard = {
		'elementId' : $(this).find('span').attr('class'),
		'cardId' : $(this).attr('id')
		};
	} else if($(this).find('span').attr('class') === selectedCard.elementId  && $(this).attr('id') !== selectedCard.cardId){
			scoreboard.cardsMatchedCurrently++;
			scoreboard.gameScore += 10;
			$(this).parent().empty();
			$("#"+selectedCard.cardId).parent().empty();
			selectedCard.elementId = 'undefined';
			selectedCard.cardId = 'undefined';
		} else {
			selectedCard.elementId = 'undefined';
			selectedCard.cardId = 'undefined';
		}
	if(scoreboard.cardsMatchedCurrently === cardsMatchedTotal){
		$('<div></div>').addClass('winnersBox').appendTo('body');
	}	
}