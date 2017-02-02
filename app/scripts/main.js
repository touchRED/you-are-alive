function Page(title_, id_){
	this.title = title_;
	this.id = id_;
}

var mainPage = new Page("ALIVE");
var speakingPage = new Page("TALKING");
var feelingPage = new Page("FEELING");
var hurtingPage = new Page("HURTING");
var aboutPage = new Page("READING");

var currentPage = mainPage;
function changeState(page){
	if(currentPage != page && !shuffling){
		shuffle(page.title);
		currentPage = page;
	}
}

var shuffling;
var shufflingTogether = 20;
var tickCount = 1;

var shuffle = function(str){
	shuffling = true;
  //controlls how long the letters shuffle
  var timeToShuffle = 1000;
  //sets reference frame for letter shuffling. leave 0 letters shuffled
  var currentIndex = 0;
	var tick = timeToShuffle/(str.length + shufflingTogether);
	var timer = setInterval(function(){
		var newStr = '';
		for(var i = 0; i<=currentIndex; i++){
			newStr = newStr + getLetter(i, str);
		}
		$('.js-transform').text(newStr);
		currentIndex++;
		tickCount++;
		if(currentIndex > str.length + shufflingTogether - 1){
			clearInterval(timer);
			shuffling = false;
			tickCount = 1;
		}
	}, tick);
};

// getLetter() either returns a random letter or a correct 
// letter depending on the index it is passed
var getLetter = function(index, str){
	if(index > str.length-1){
		return '';
	}  
	if(index + shufflingTogether < tickCount){
		return str[index]; 
	}else{
		var code = (Math.floor(Math.random() * 57)) + 65;
		return String.fromCharCode(code);
	}
};

$(document).keydown(function(e){
	switch(e.which){
		case 37:
			if(currentPage == mainPage){
				changeState(speakingPage);
			}else if(currentPage == hurtingPage){
				changeState(mainPage);
			}
			break;
		case 38:
			if(currentPage == mainPage){
				changeState(feelingPage);
			}else if(currentPage == aboutPage){
				changeState(mainPage);
			}
			break;
		case 39:
			if(currentPage == mainPage){
				changeState(hurtingPage);
			}else if(currentPage == speakingPage){
				changeState(mainPage);
			}
			break;
		case 40:
			if(currentPage == mainPage){
				console.log("about");
			}else if(currentPage == feelingPage){
				changeState(mainPage);
			}
			break;
	}
});
