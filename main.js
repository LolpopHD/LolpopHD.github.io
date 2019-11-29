var consonants = ["b","c","d","f","g","h","k","l","m","n","p","q","r","s","t","v","w","x","y","z"];

function encode(){
  var text = Caesar(false, 5, document.getElementById("input").value);
  var text = KidLang(false, text);
  var Output = document.getElementById("output");
  Output.value = text;
}
function decode(){
  var text = KidLang(true, document.getElementById("output").value);
  text = Caesar(true, 5, text);
  var Input = document.getElementById("input");
  Input.value = text;
}
function clear(){
  console.log("AAAAA");
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
      if(consonants.includes(c)){
        result += "o"+c;
      }
    }
  }
  else{
    var result = text;
    for (var i = 0; i < text.length; i++){
      var c = text.charAt(i);
      var coc = "o"+c;
      result = result.replace(coc, "");
    }
  }
  return result;
}
