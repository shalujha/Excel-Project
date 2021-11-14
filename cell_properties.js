let formulaBar=document.querySelector(".forula-bar");


// for(var i=0;i<rows;i++){
//     let sheetRow=[];
//     for(var j=0;j<cols;j++){
//        var cell={
//            "bold":false,
//            "italic":false,
//            "underlined":false,
//            "alignment":false,
//            "fontFamily":"monospace",
//            "fontSize":14,
//            "fontColor":"#000000",
//            "backgroundColor":"#000000",
//            "value":"",
//            "formula":"",
//            "children":[],
//        }

       
//        sheetRow.push(cell);
//     }
//     sheetDB.push(sheetRow);
// }

{
    addBtn.click();
}


// console.log("within cellProperties, sheetDB is : ");
// console.log(sheetDB);

for(var i=0;i<rows;i++){
    for(var j=0;j<cols;j++){
        fetchPropertiesListener(i,j);
    }
}
// lets add listeners on different cell action properties
let bold=document.querySelector(".bold");
let italic=document.querySelector(".italic");
let underlined=document.querySelector(".underlined");
let alignments=document.querySelectorAll(".alignment");
let leftAligned=alignments[0];
let centerAligned=alignments[1];
let rightAligned=alignments[2];
let textColor=document.querySelector(".text-color");
let backgroundColor=document.querySelector(".background-color");
let fontFamily=document.querySelector(".font-family-prop");
let fontSize=document.querySelector(".font-size-prop");
let activeColorProp="#d1d8e0";
let inactiveColorProp="#ecf0f1";


function fetchPropertiesListener(rowId,colId){
    let address=[rowId,colId];
    let activeCell=getActiveCell(address);
    
    //console.log("within fetchProperties listener");
    // console.log("address");
    activeCell.addEventListener("click",()=>{
        console.log("syyling change krne aye ");
    let cell=getCellProperties([activeCell.getAttribute("rowId"),activeCell.getAttribute("colId")]);
      // console.log("within fetchProperties listener");
      // console.log(cell);
       bold.style.backgroundColor=cell.bold?activeColorProp:inactiveColorProp;
       underlined.style.backgroundColor=cell.underlined?activeColorProp:inactiveColorProp;
       italic.style.backgroundColor=cell.italic?activeColorProp:inactiveColorProp;
       fontFamily.value=cell.fontFamily;
       fontSize.value=cell.fontSize;
       leftAligned.style.backgroundColor=cell.alignment=="left"?activeColorProp:inactiveColorProp;
       rightAligned.style.backgroundColor=cell.alignment=="right"?activeColorProp:inactiveColorProp;
       centerAligned.style.backgroundColor=cell.alignment=="center"?activeColorProp:inactiveColorProp;  
       textColor.value=cell.fontColor;
       backgroundColor.value=cell.backgroundColor;
       formulaBar.value=cell.formula;
       activeCell.innerText=cell.value;
       activeCell.style.backgroundColor=cell.backgroundColor;
       activeCell.style.border=cell.border;
    })
}



bold.addEventListener("click",()=>{
    let address=getAddress(); // getAddress will return an array of rowId and colId
    let cell=getActiveCell(address);
    let cellProperties=getCellProperties(address);
    cellProperties.bold=!cellProperties.bold;
    cell.style.fontWeight=cellProperties.bold?"bold":"normal";
    bold.style.backgroundColor=cellProperties.bold?activeColorProp:inactiveColorProp;
});
italic.addEventListener("click",()=>{
    let address=getAddress(); // getAddress will return an array of rowId and colId
    let cell=getActiveCell(address);
    let cellProperties=getCellProperties(address);
    cellProperties.italic=!cellProperties.italic;
    cell.style.fontStyle=cellProperties.italic?"italic":"normal";
    italic.style.backgroundColor=cellProperties.italic?activeColorProp:inactiveColorProp;
});
underlined.addEventListener("click",()=>{
    let address=getAddress(); // getAddress will return an array of rowId and colId
    let cell=getActiveCell(address);
    let cellProperties=getCellProperties(address);
    cellProperties.underlined=!cellProperties.underlined;
    cell.style.textDecoration=cellProperties.underlined?"underline":"none";
    underlined.style.backgroundColor=cellProperties.underlined?activeColorProp:inactiveColorProp;
});
textColor.addEventListener("change",()=>{
    let address=getAddress(); // getAddress will return an array of rowId and colId
    let cell=getActiveCell(address);
    let cellProperties=getCellProperties(address);
    cellProperties.fontColor=textColor.value;
//    console.log("value : "+textColor.value);
    cell.style.color=cellProperties.fontColor;
    textColor.value=cellProperties.fontColor;
});
backgroundColor.addEventListener("change",()=>{
    let address=getAddress(); // getAddress will return an array of rowId and colId
    let cell=getActiveCell(address);
    let cellProperties=getCellProperties(address);
    cellProperties.backgroundColor=backgroundColor.value;
//    console.log("value : "+textColor.value);
    cell.style.backgroundColor=cellProperties.backgroundColor;
    backgroundColor.value=cellProperties.backgroundColor;
});
fontSize.addEventListener("change",()=>{
    let address=getAddress(); // getAddress will return an array of rowId and colId
    let cell=getActiveCell(address);
    let cellProperties=getCellProperties(address);
    cellProperties.fontSize=fontSize.value;
//    console.log("siz is : "+ fontSize.value);
    cell.style.fontSize=cellProperties.fontSize+"px";
    fontSize.value=cellProperties.fontSize;
});

fontFamily.addEventListener("change",()=>{
    let address=getAddress(); // getAddress will return an array of rowId and colId
    let cell=getActiveCell(address);
    let cellProperties=getCellProperties(address);
    cellProperties.fontFamily=fontFamily.value;
  //  console.log("font family is : "+ fontFamily.value);
    cell.style.fontFamily=cellProperties.fontFamily;
    fontFamily.value=cellProperties.fontFamily;
});
alignments.forEach(element=>{
    
    element.addEventListener("click",()=>{
        let address=getAddress(); // getAddress will return an array of rowId and colId
    let cell=getActiveCell(address);
    let cellProperties=getCellProperties(address);
        let typeOfAlignment=element.classList[0];
     //   console.log("type of alignment : "+ typeOfAlignment);
        cellProperties.alignment=typeOfAlignment;
       // console.log("cellproperties ka alignment : "+cellProperties.alignment);
        cell.style.textAlign=cellProperties.alignment;
        // console.log("cell styles : "+ cell.style);
        // console.log(cell.style.textAlign);
         switch(typeOfAlignment){
             case "left":
         //        console.log("left kr");
                leftAligned.style.backgroundColor=cellProperties.alignment?activeColorProp:inactiveColorProp;
                rightAligned.style.backgroundColor=inactiveColorProp;
                centerAligned.style.backgroundColor=inactiveColorProp;
                break;
             case "right":
           //      console.log("right clicked");
                // cellProperties.alignment=!cellProperties.alignment;
                // console.log("cellproperties ka alignment : "+cellProperties.alignment);
                // cell.style.textAlign=cellProperties.alignment?"right":"initial";
                rightAligned.style.backgroundColor=cellProperties.alignment?activeColorProp:inactiveColorProp;
                leftAligned.style.backgroundColor=inactiveColorProp;
                centerAligned.style.backgroundColor=inactiveColorProp;
                 break;
             case "center":
             //    console.log("center clicked");
                // cellProperties.alignment=!cellProperties.alignment;
                // console.log("cellproperties ka alignment : "+cellProperties.alignment);
                // cell.style.textAlign=cellProperties.alignment?"center":"initial";
                centerAligned.style.backgroundColor=cellProperties.alignment?activeColorProp:inactiveColorProp;
                rightAligned.style.backgroundColor=inactiveColorProp;
                leftAligned.style.backgroundColor=inactiveColorProp;
                 break;
         }
    })
})

function getAddress(){
   // console.log("getAddress called ");
    var address=AddressBar.value;
    // console.log("address is : "+ address);
    var colId=Number(address.charCodeAt(0)-65);
    var rowId=Number(address.slice(1))-1;
    let ans=[rowId,colId];
  //  console.log("ans : ");
 //   console.log(ans);
    return ans;
}
function getActiveCell(address){
    let rowId=address[0];
    let colId=address[1];
    return document.querySelector(`.cell[rowId="${rowId}"][colId="${colId}"]`);
}
function getCellProperties(address){
 //   console.log("within getCellProp ");
 //   console.log("address : "+ address);
    let rowId=address[0];
    let colId=address[1];
   // console.log("rowId is : "+ rowId+" col id is : "+ colId);
  //  console.log(address);
    return sheetDB[rowId][colId];
}



