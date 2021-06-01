var compiler = document.querySelector("div.compiler");
var div = document.querySelector("div.flex");
var submitButton = document.querySelector("#submit");
var preview = document.querySelector("#preview");

// on smaller screen sizes adding the button
if (window.innerWidth <= 768) {
  addOrRemoveCompilerButton();
}
// this code will work, when someone scrolls (either using inspect element or resizes the browser window)
window.addEventListener("resize", addOrRemoveCompilerButton);

function addOrRemoveCompilerButton() {
  // on smaller screenSizes adding button and hiding the div.
  if (window.innerWidth <= 768) {
    compiler.style.display = "none";
    if (!buttonAlreadyExists()) {
      let button = document.createElement("button");
      button.innerText = "Compiler";
      button.style = `position:fixed; right:0; top:${
        window.innerHeight / 2
      }px; padding:1em`;
      button.className = "bg-green-400";
      div.append(button);
    }
  } else {
    // removing the button and displaying back the compiler (div)
    compiler.style.display = "block";
    let button = buttonAlreadyExists();
    // making sure the button exists otherwise nothing to remove (it might be already removed)
    if (button) {
      button.remove();
    }
  }
}
// resizing event will occur a lot, meaning a lot of creation and duplication of buttons, that's why checking if button is
//already in the dom.
function buttonAlreadyExists() {
  return document.querySelector("button.bg-green-400");
}

submitButton.addEventListener("click", fetchOutput);

async function fetchOutput() {
  var code = document.querySelector("#source_code");
  var language = document.querySelector("select");

  var apiUrl = `http://api.paiza.io/runners/create?source_code=${code.value}&language=${language.value}&api_key=guest`;
  console.log(apiUrl);

  var results = await fetch(apiUrl, {
    method: "POST",
  });
  var { id } = await results.json();

  var runnerStatus = await fetch(
    `http://api.paiza.io/runners/get_status?id=${id}&api_key=guest`
  );
  console.log(runnerStatus);
  var { status } = await runnerStatus.json();
  console.log(status);

  setTimeout(showOutput.bind(null, id), 500);
}

async function showOutput(id) {
  var runnerDetails = await fetch(
    `http://api.paiza.io/runners/get_details?id=${id}&api_key=guest`
  );
  var { stdout } = await runnerDetails.json();
  console.log(stdout);

  preview.innerText = stdout;
}
