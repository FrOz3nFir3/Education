var compiler = document.querySelector("div.compiler");
var div = document.querySelector("div.flex");
var submitButton = document.querySelector("#submit");
var preview = document.querySelector("#preview");
// sjdfkjsdfjlk
// on smaller screen sizes adding the button
if (window.innerWidth <= 768) {
  // addOrRemoveCompilerButton();
}
// this code will work, when someone scrolls (either using inspect element or resizes the browser window)
// window.addEventListener("resize", addOrRemoveCompilerButton);

function addOrRemoveCompilerButton() {
  // on smaller screenSizes adding button and hiding the div.
  if (window.innerWidth <= 768) {
    var [, , , , , compilerMobile] = compiler.classList;
    // not hiding the compiler screen if user has clicked the compiler button..
    if (compilerMobile != "compiler-mobile") {
      compiler.hidden = true;
    }
    console.log("times called");
    if (!buttonAlreadyExists("button.bg-green-400")) {
      let button = document.createElement("button");
      button.innerText = "Compiler";
      button.style = `position:fixed; right:0; top:${window.innerHeight / 2
        }px; padding:1em`;
      button.className = "bg-green-400";
      button.id = "compiler-button";
      div.append(button);
    }
    let compilerButton = document.querySelector("#compiler-button");
    compilerButton.addEventListener("click", showCompiler);
  } else {
    // removing the button and displaying back the compiler (div)
    compiler.hidden = false;
    compiler.classList.remove("compiler-mobile");
    let button = buttonAlreadyExists("button.bg-green-400");
    let closeButton = buttonAlreadyExists("#close-compiler");
    // making sure the button exists otherwise nothing to remove (it might be already removed)
    if (button) {
      button.remove();
    }
    if (closeButton) {
      closeButton.remove();
    }
  }
}
// will show compiler screen on mobile phones
function showCompiler() {
  debugger;
  compiler.hidden = false;
  compiler.classList.add("compiler-mobile");
  var [firstDiv] = compiler.children;

  // only add the button if already doesn't exist otherwise duplicate buttons
  if (!buttonAlreadyExists("#close-compiler")) {
    let newButton = document.createElement("button");
    newButton.addEventListener("click", removeCompiler);
    newButton.innerText = "Close";
    newButton.id = "close-compiler";
    newButton.className = "bg-red-300 p-2";
    newButton.style = "margin-left:auto";
    firstDiv.append(newButton);
  }
}
// when user click on close compiler removing compiler screen
function removeCompiler() {
  compiler.classList.remove("compiler-mobile");
  compiler.hidden = true;
}
// resizing event will occur a lot, meaning a lot of creation and duplication of buttons, that's why checking if button is
//already in the dom.
function buttonAlreadyExists(name) {
  return document.querySelector(name);
}
// hitting api for compiler sections
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

function compilerEnable() {
  var compiler_mobile = document.querySelector(".compiler_mobile");

  compiler_mobile.style.display = "block";
}
function closeCompiler() {
  var compiler_mobile = document.querySelector(".compiler_mobile");

  compiler_mobile.style.display = "none";
}
function goBack() {
  window.history.back();
}
// function compilerSize() {
//   debugger;
//   var compilers = document.querySelector(".compiler");
//   var compileBtn = document.querySelector("#compilerBtn");
//   var compilerMobile = document.querySelector(".compiler-mobile");
//
//   if (window.innerWidth < 768) {
//     compilers.style.display = "none";
//     compileBtn.style.display = "block";
//     // compilerMobile.style.display = "block";
//     compilers.classList.remove("compiler");
//   } else {
//     compilers.style.display = "block";
//     compileBtn.style.display = "none";
//     compilers.classList.add("compiler");
//   }
// }
var main_content = document.querySelector(".content-main");

var dropDownLists = document.querySelectorAll(".dropdown-item")

for (let list of dropDownLists) {
  list.addEventListener('click', loadContent)
  
}
var subSectionList = document.querySelector('.sub-topics')

function loadContent(val) {
  var div = document.createElement('div');
  div.classList.add("content1");
  // console.log(div)
  document.body.append(div);
  var value = val.target.innerText
  // console.log($(".content1"))

  $(".content1").load(`../js/${value}.html`, addingSubsections);
}


function addingSubsections() {
  var sections = document.querySelector(".content1").querySelector('main').children;
  // console.log(document.querySelector(".content1").querySelector('main'))
  var fragment = document.createDocumentFragment()
  
  for (const section of sections) {
    let li = document.createElement('li')
    li.innerHTML =
      `<a href="#${section.id}">${section.id}</a>`
    fragment.append(li)
  }
  subSectionList.append(fragment)
  
  var test2 = subSectionList.children
  for (const test1 of test2){
    test1.addEventListener('click', test3)
  }
  // console.log(subSectionList)
  
}
function test3(test4)
{
   var val = test4.target.innerText;
  // console.log(val);
  var ftest = document.getElementById(`${val}`);
  // console.log(ftest)
  var send = document.querySelector(".content-main")
  send.append(ftest)

  



  
}

