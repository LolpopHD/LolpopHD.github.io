var consonants = ["b","c","d","f","g","h","k","l","m","n","p","q","r","s","t","v","w","x","y","z"];

function encode(){
  var text = Caesar(false, 5, document.getElementById("input").value);
  text = KidLang(false, text);
  text = ZigZag(false, 3, text)
  var Output = document.getElementById("output");
  Output.value = text;
}
function decode(){
  var text = ZigZag(true, 3, document.getElementById("output").value);
  text = KidLang(true, text);
  text = Caesar(true, 5, text);
  var Input = document.getElementById("input");
  Input.value = text;
}
function clean(){
  var Output = document.getElementById("output");
  var Input = document.getElementById("input");
  Output.value = "";
  Input.value = "";
}

function Caesar(isDecrypt, shift, text){
	if (shift < 0 || shift >= 26) {
		alert("Shift is out of range");
		return;
	}
	if (isDecrypt)
  {
		shift = (26 - shift) % 26;
	}
  var result = "";
   for (var i = 0; i < text.length; i++){
     var c = text.charCodeAt(i);
       if      (65 <= c && c <=  90) result += String.fromCharCode((c - 65 + shift) % 26 + 65);  // Uppercase
       else if (97 <= c && c <= 122) result += String.fromCharCode((c - 97 + shift) % 26 + 97);  // Lowercase
       else                          result += text.charAt(i);  // Copy
  }
  var encoded = result;
	return encoded;
}
function KidLang(isDecrypt, text){
  if(!isDecrypt)
  {
    var result = ""
    for (var i = 0; i < text.length; i++){
      var c = text.charAt(i);
      result += c
      if(consonants.includes(c.toLowerCase(c))){
        if(c.toLowerCase(c)==c){
          result += "o"+c;
        }
        else{
          result += "O"+c;
        }
      }
    }
  }
  else{
    var result = text;
    for (var i = 0; i < text.length; i++){
      var c = text.charAt(i);
      if(consonants.includes(c.toLowerCase(c))){
        if(c.toLowerCase(c)==c){
          var coc = "o"+c;
          result = result.replace(coc, "");
        }
        else{
          var coc = "O"+c;
          result = result.replace(coc, "");
        }
      }
    }
  }
  return result;
}
function ZigZag(isDecrypt, rows, text) {
  if(!isDecrypt){
    rows = rows || 3
    let fence = [];
    for (let i = 0; i < rows; i++) fence.push([])
    let rail = 0;
    let change = 1;

    for (let char of text) {
      fence[rail].push(char);
      rail += change

      if (rail === rows - 1 || rail === 0) change = -change
    }

    let r = '';
    for (let rail of fence) r += rail.join("")
    return r
  }
  else{
    rows = rows || 3
    let fence = [];
    for (let i = 0; i < rows; i++) fence.push([])
    let rail = 0;
    let change = 1;

    text.split("").forEach(char => {
      fence[rail].push(char)
      rail += change

      if (rail === rows - 1 || rail === 0) change = -change
    })

    const rFence = [];
    for (let i = 0; i < rows; i++) rFence.push([])

    i = 0
    s = text.split("")
    for (r of fence) {
      for (let j = 0; j < r.length; j++) rFence[i].push(s.shift())
      i++
    }

    rail = 0
    change = 1
    var r = ""
    for (var i = 0; i < text.length; i++) {
      r += rFence[rail].shift()
      rail += change

      if (rail === rows - 1 || rail === 0) change = -change
    }
    
    return r
  }
}
