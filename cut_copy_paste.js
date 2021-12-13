let cut=document.querySelector(".cut");
let copy=document.querySelector(".copy");
let paste=document.querySelector(".paste");
let ctrlIsPressed;
document.addEventListener("keydown",(e)=>{
    ctrlIsPressed=e.ctrlKey;
});
document.addEventListener("keyup",(e)=>{
    ctrlIsPressed=e.ctrlKey;
});
for(var i=0;i<rows;i++){
    for(var j=0;j<cols;j++){
        let cell=document.querySelector(`.cell[rowId="${i}"][colId="${j}"]`);
        AddSelectListener(cell);
    }
}
console.log(ctrlIsPressed);
let rangeOfSelection=[];
function AddSelectListener(cell){
    cell.addEventListener("click",(e)=>{
        if(!ctrlIsPressed){
           return;
        }

        if(rangeOfSelection.length==2){
            SetUiToDefault();
            rangeOfSelection=[];
        }
        cell.style.border="3px solid #218c74";
        let rowId=cell.getAttribute("rowId");
        let colId=cell.getAttribute("colId");
        let cellProp=getCellProperties([rowId,colId]);
        cellProp.border="3px solid #218c74";
        rangeOfSelection.push([rowId,colId]);
    })
};

function SetUiToDefault(){
    for(i=0;i<rangeOfSelection.length;i++){
        let rowId=rangeOfSelection[i][0];
        let colId=rangeOfSelection[i][1];
        let cell=document.querySelector(`.cell[rowId="${rowId}"][colId="${colId}"]`);
        cell.style.border="1px solid #dfe4ea";
        let cellProp=getCellProperties([rowId,colId]);
        cellProp.border="1px solid #dfe4ea";
    }
}

let copy_data=[];
// copy data :
copy.addEventListener("click",(e)=>{
    if(rangeOfSelection.length!=2){
        return;
    }
    console.log("copy clicked");
    console.log("rangeOfSelection is : ");
    console.log(rangeOfSelection);
    copy_data=[];
    let startRow=rangeOfSelection[0][0];
    let endRow=rangeOfSelection[1][0];
    let startCol=rangeOfSelection[0][1];
    let endCol=rangeOfSelection[1][1];
   // console.log("startRow : "+ startRow +" startCol is : "+ startCol+" endRow : "+ endRow +" endCol is : "+ endCol);
    for(i=startRow;i<=endRow;i++){
        let copyRow=[];
        for(j=startCol;j<=endCol;j++){
            console.log(sheetDB[i][j]);
            copyRow.push(sheetDB[i][j]);
        }
        copy_data.push(copyRow);
    }
    console.log("data copied ");
    console.log(copy_data);
});
// console.log("copied data : ");
// console.log(copy_data);
paste.addEventListener("click",(e)=>{
    if(rangeOfSelection.length!=2){
        return;
    }
    console.log("paste clicked");
    console.log("rangeOfSelection is : ");
    console.log(rangeOfSelection.length);
    console.log(copy_data.length);
     
     console.log("paste krne aye ");
     let address=getAddress();
     let startRow=rangeOfSelection[0][0];
     let endRow=rangeOfSelection[1][0];
     let startCol=rangeOfSelection[0][1];
     let endCol=rangeOfSelection[1][1];
     let rowDiff=Math.abs(endRow-startRow);
     let colDiff=Math.abs(endCol-startCol);
     let rowId=address[0];
     let colId=address[1];
     let r;
     let c;
     for(i=rowId,r=0;i<=rowId+rowDiff && i<rows;i++,r++){
         for(j=colId,c=0;j<=colId+colDiff && j<cols;c++,j++){
             // lets change in database :
             let cell=document.querySelector(`.cell[rowId="${i}"][colId="${j}"]`);
             let copyCellProp=copy_data[r][c];
             let targetCellProp=sheetDB[i][j];
             targetCellProp.bold=copyCellProp.bold;
             targetCellProp.underlined=copyCellProp.underlined;
             targetCellProp.italic=copyCellProp.italic;
             targetCellProp.fontFamily=copyCellProp.fontFamily;
             targetCellProp.fontSize=copyCellProp.fontSize;
             targetCellProp.alignment=copyCellProp.alignment;
             targetCellProp.fontColor=copyCellProp.fontColor;
             targetCellProp.backgroundColor=copyCellProp.backgroundColor;
             targetCellProp.value=copyCellProp.value;
             console.log("source")
             console.log(copyCellProp);
             console.log("target");
             console.log(targetCellProp);
             setCellProperties(cell,targetCellProp);
             console.log("i is : "+ i+" j is : "+j);
         }
     }
     console.log("pasted");
     SetUiToDefault();
});

function setCellProperties(cell,cellProperties){
    cell.style.fontWeight=cellProperties.bold?"bold":"normal";
    cell.style.fontStyle=cellProperties.italic?"italic":"normal";
    cell.style.textDecoration=cellProperties.underlined?"underline":"none";
    cell.style.color=cellProperties.fontColor;
   cell.style.backgroundColor=cellProperties.backgroundColor;
    cell.style.fontSize=cellProperties.fontSize+"px";
    cell.style.fontFamily=cellProperties.fontFamily;
    cell.style.textAlign=cellProperties.alignment;
    cell.innerText=cellProperties.value;
}


cut.addEventListener("click",async (e)=>{
   copy_data=[];
    console.log("came in cut ");
    let startRow=rangeOfSelection[0][0];
    let endRow=rangeOfSelection[1][0];
    let startCol=rangeOfSelection[0][1];
    let endCol=rangeOfSelection[1][1];
    for(i=startRow;i<=endRow;i++){
        copy_row=[];
        for(j=startCol;j<=endCol;j++){
            copy_row.push({...sheetDB[i][j]});
            let cell=document.querySelector(`.cell[rowId="${i}"][colId="${j}"]`);
            let targetCellProp=sheetDB[i][j];
            targetCellProp.bold=false;
             targetCellProp.underlined=false;
             targetCellProp.italic=false;
             targetCellProp.fontFamily="monospace";
             targetCellProp.fontSize=14;
             targetCellProp.alignment=false;
             targetCellProp.fontColor="#000000";
             targetCellProp.backgroundColor="transparent";
             targetCellProp.value="";
             targetCellProp.formula="";
             cell.style.border="1px solid #dfe4ea";
             setCellProperties(cell,targetCellProp);
        }
        copy_data.push(copy_row);
    }
             SetUiToDefault();
             console.log("data copied");
             console.log(copy_data);
         //    rangeOfSelection=[];
});


