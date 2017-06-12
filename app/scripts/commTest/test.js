function songDecoder(song){
  return song.replace(/(WUB)+/g," ").trim();
}
var result = songDecoder("ACWUBBWUBCWUB");

function tickets(peopleInLine){
  if(peopleInLine[0] == 100 || peopleInLine[0] == 50) {
    return 'NO';
  }
  var a25 = 0, a50 = 0;
  for(var i = 0; i < peopleInLine.length; i++) {
    switch(peopleInLine[i]){
      case 25: a25++; break;
      case 50: a50++; a25--; break;
      case 100: a25 > 0 && a50 > 0 ? a50-- : (a25 > 2 ? a25 -= 2 : a25 -= 3); break;
    }
    if (a25 < 0) {
      return 'NO';
    }
  }
  return 'YES';
}

var result = tickets([25,50,50,100,25,25,50,100,25,25,25,100,25,50,50,25]);

function createPhoneNumber(numbers){
  return '(' + numbers.splice(0, 3).join('') + ') ' + numbers.splice(0, 3).join('') + '-' + numbers.join('');
}

console.log(result);