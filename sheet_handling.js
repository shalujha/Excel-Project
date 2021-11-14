let addBtn = document.querySelector(".sheet-add-icon");
let sheetActiveColor="#ced6e0";
let combinedSheetsDB = [];
let sheetDB=[];
let combinedGraphMatrix = [];
let graphComponentMatrix=[];
addBtn.addEventListener("click", (e) => {
  let sheet = document.createElement("div");
  sheet.setAttribute("class", "sheet-content");
  let sheetsArray = document.querySelectorAll(".sheet-content");
  sheet.setAttribute("id", sheetsArray.length);
  sheet.innerText = `Sheet${sheetsArray.length + 1}`;
  let sheetFolder = document.querySelector(".sheet-folder-cont");
  sheetFolder.appendChild(sheet);
  createSheetDB();
  createGraphComponentDB();
  handleSheetProprties(sheet);
  handleSheetRemoval(sheet);
  sheet.click();
  sheet.scrollIntoView();
});


function handleSheetRemoval(sheet){
    sheet.addEventListener("mousedown",(e)=>{
        if(e.button==2){
            // right click
            let sheetsArray = document.querySelectorAll(".sheet-content");
            if(sheetsArray.length==1){
                alert("you must have atleast one sheet");
                return;
            }
            const response=confirm("your sheet will be deleted. Do you really want to delete ?");
            if(!response){
                return;
            }
            let sheetIdx=sheet.getAttribute("id");
            combinedSheetsDB.splice(sheetIdx,1);
            combinedGraphMatrix.splice(sheetIdx,1);
            // remove from UI
            sheet.remove();
            sheetsArray = document.querySelectorAll(".sheet-content");
          //  console.log("sheetArray length : "+ sheetsArray.length);
            for(var i=0;i<sheetsArray.length;i++){
                sheetsArray[i].setAttribute("id",i);
                sheetsArray[i].innerText=`Sheet${i+ 1}`
            }
            sheetsArray[0].click();
        }
    })
}
function handleSheetActiveness(sheet){
    let sheetsArray = document.querySelectorAll(".sheet-content");
    for(var i=0;i<sheetsArray.length;i++){
        sheetsArray[i].style.backgroundColor="transparent";
    }
    sheet.style.backgroundColor=sheetActiveColor;
}
function handleSheetProprties(sheet){
    sheet.addEventListener("click",(e)=>{
       let sheetIdx=sheet.getAttribute("id");
      console.log("sheet got clicked and id is : "+ sheetIdx);
      sheetDB=combinedSheetsDB[sheetIdx];
    //   console.log("combinedsheetDB is : ");
    //   console.log(combinedSheetsDB);
      graphComponentMatrix=combinedGraphMatrix[sheetIdx];
    //   console.log("combinedSheetDB length : "+ combinedSheetsDB.length);
    //   console.log("combinedgraph length : "+ combinedGraphMatrix.length);
      handleSheetActiveness(sheet);
      handleCellProperties(sheet);  
    });
}
function handleCellProperties(sheet){
    for(var i=0;i<rows;i++){
        for(var j=0;j<cols;j++){
            let cell=document.querySelector(`.cell[rowId="${i}"][colId="${j}"]`);
            cell.click();
        }
    }
    // click first cell
  let firstcell=document.querySelector(".cell");
  firstcell.click();
  console.log("in handlingcellproperties...sheetDB in use is ");
  console.log(sheetDB);
}
function createSheetDB() {
  let sheetDBElement = [];
  for (var i = 0; i < rows; i++) {
    let sheetRow = [];
    for (var j = 0; j < cols; j++) {
      var cell = {
        bold: false,
        italic: false,
        underlined: false,
        alignment: false,
        fontFamily: "monospace",
        fontSize: 14,
        fontColor: "#000000",
        backgroundColor: "transparent",
        value: "",
        formula: "",
        children: [],
        border:"1px solid #dfe4ea"
      };
      sheetRow.push(cell);
    }
    sheetDBElement.push(sheetRow);
  }
  combinedSheetsDB.push(sheetDBElement);
}
function createGraphComponentDB() {
  let graphComponentMatrixElement = [];
  for (var i = 0; i < rows; i++) {
    graphComponentMatrixElement.push([]);
    for (var j = 0; j < cols; j++) {
      graphComponentMatrixElement[i].push([]);
    }
  }
  combinedGraphMatrix.push(graphComponentMatrixElement);
}
