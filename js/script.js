var compiler = document.querySelector("div.compiler");
var div = document.querySelector("div.flex");

if (window.innerWidth <= 768) {
  compiler.style.display = "none";
  let button = document.createElement("button");
  button.innerText = "Compiler";
  button.style = "position:fixed; right:0; top:350px; padding:1em";
  button.className = "bg-green-400";
  div.append(button);
}
