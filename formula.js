
// adding blur listener to each cell to update values in cell
for(var i=0;i<rows;i++){
    for(var j=0;j<cols;j++){
       let cell=getActiveCell([i,j]);
       let cellProp=getCellProperties([i,j]);
       addBlurListener(cell,cellProp,[i,j]);
    }
}
function addBlurListener(cell){
    cell.addEventListener("blur",(e)=>{
     //   console.log("within blur listener ");
     let cellProp=getCellProperties([cell.getAttribute("rowId"),cell.getAttribute("colId")]);
        if(cellProp.value!=cell.innerText){
            cellProp.value=cell.innerText;
             console.log("blur event occured");
            // console.log("sheetDB is ");
            // console.log(sheetDB);
            // console.log("combinedsheetDB is : ");
            // console.log(combinedSheetsDB);
          let address=[cell.getAttribute("rowId"),cell.getAttribute("colId")];
        //   console.log("jo address aya wo h");
        //   console.log(address)
        //   console.log(address.length);
        //   console.log("cell ka rowId is : "+ cell.getAttribute("rowId") +" "+cell.getAttribute("colId"));
             updateChildren(address);
       //     console.log("updated children ");
            removeParentChildRelationShips(cellProp.formula);
         //   console.log("removed PC ");
            cellProp.formula="";
        }
       
        // console.log(cell.innerText);
        // console.log(cell.value);
      //   console.log(cellProp);
    })
}
// get Access to formula bar first:
formulaBar.addEventListener("keydown",async (e)=>{
    if(e.key=="Enter" && formulaBar.value.length>0){
    //    console.log("formulabar activated");
        // fetch the formula from formula bar
        var formula=formulaBar.value;
        formula=formula.substring(1,formula.length-1);
      //  console.log("formula is : "+ formula);
        let address=getAddress();
        let cell=getActiveCell(address);
        let cellProp=getCellProperties(address);
          if(cellProp.formula!=formula){
        removeParentChildRelationShips(cellProp.formula);
        cellProp.formula=formula;
        console.log("address jo diya hai : "+ address);

        addToGraphMatrix(formula,address);
        let cyclicResponse=isCyclic();
        if(cyclicResponse){
            let response=confirm("you have entered a cyclic formula, Do you want to trace the cycle ?");
            while(response){
              await traceCycle(cyclicResponse,graphComponentMatrix);
              response=confirm("you have entered a cyclic formula, Do you want to trace the cycle ?");
            }
            removeFromGraphMatrix(formula,address);
            cellProp.formula="";
            return;
        }
        let ans=evaluate(formula,address);
        setUIandDB(ans,cell,cellProp);
        updateChildren(address);
        }
        
     //   console.log("cell is : "+ cell);
    }
})


function addToGraphMatrix(formula,address){
    let crid=address[0];
    let ccid=address[1];
    let formulaValues=formula.split(" ");
    for(var i=0;i<formulaValues.length;i++){
        if(formulaValues[i].length==0){
            continue;
        }
        var ascii=formulaValues[i].trim().charCodeAt(0);
        if(ascii>=65 && ascii<=90){
            var ParentsRowId=Number(formulaValues[i].slice(1))-1;
            var ParentsColId=Number(formulaValues[i].charCodeAt(0)-65);
            graphComponentMatrix[ParentsRowId][ParentsColId].push([crid,ccid]);
        }
    }
}

function removeFromGraphMatrix(formula,address){
    let formulaValues=formula.split(" ");
    for(var i=0;i<formulaValues.length;i++){
        if(formulaValues[i].length==0){
            continue;
        }
        var ascii=formulaValues[i].trim().charCodeAt(0);
        if(ascii>=65 && ascii<=90){
            var ParentsRowId=Number(formulaValues[i].slice(1))-1;
            var ParentsColId=Number(formulaValues[i].charCodeAt(0)-65);
            graphComponentMatrix[ParentsRowId][ParentsColId].pop();
        }
    }
}
function removeParentChildRelationShips(formula){
   // console.log("remove PC Relationships ke andar ");
    let childcelladdress=getAddress();
    let childEncodedAddress=String.fromCharCode(childcelladdress[1]+65)+""+(childcelladdress[0]+1);
    let formulaValues=formula.trim().split(" ");
  //  console.log("formula values : ");
   // console.log(formulaValues);
    for(var i=0;i<formulaValues.length;i++){
        var ascii=formulaValues[i].trim().charCodeAt(0);
        if(ascii>=65 && ascii<=90){
            // means it is some address:
            let parentAddress=formulaValues[i];
            let parentRowId=Number(parentAddress.slice(1))-1;
           let parentColId=Number(parentAddress.charCodeAt(0)-65);
           let  parentCellProp=getCellProperties([parentRowId,parentColId]);   
           let children=parentCellProp.children;
           let idx=children.filter((address)=>{
               address==childEncodedAddress;
           });
           parentCellProp.children.splice(idx,1);
        }
    } 
    // console.log("sheetdb is ");
    // console.log(sheetDB);
}


function updateChildren(parentAddress){
  //  console.log("within update cildren ");
  //  console.log("parenAddress : "+ parentAddress);
    let parentCellProp=getCellProperties(parentAddress);
    let children=parentCellProp.children;
  //  console.log("parenAddress : "+ parentAddress);
//    console.log("children : ");
   // console.log(children);
    for(var i=0;i<children.length;i++){
      let [childCell,childCellProp]=getCellandCellProp(children[i]);
      var RowId=Number(children[i].slice(1))-1;
      var ColId=Number(children[i].charCodeAt(0)-65);
      let ans=evaluate(childCellProp.formula);
      let [cell,cellProp]=getCellandCellProp(children[i]);
      setUIandDB(ans,cell,cellProp);
      
    //  console.log("Row : "+RowId+" col : "+ ColId);
      updateChildren([RowId,ColId]);
    }
}

function setUIandDB(val,cell,cellProp){
      cell.innerText=val;
      cellProp.value=val;
}
function getCellandCellProp(address){
 //   console.log("within getCellAndProperties ");
 //   console.log("address : "+ address);
    var RowId=Number(address.slice(1))-1;
    var ColId=Number(address.charCodeAt(0)-65);
   // console.log("RowId is : "+ RowId+" colId is : "+ ColId);
    let cell=getActiveCell([RowId,ColId]);
    let cellProp=getCellProperties([RowId,ColId]);
    return [cell,cellProp];
}
function evaluate(formula,childcelladdress){
  //  console.log("formula is : "+ formula);
    let formulaValues=formula.trim().split(" ");
  //  console.log("formula values : ");
  //  console.log(formulaValues);
    for(var i=0;i<formulaValues.length;i++){
        if(formulaValues[i].length==0){
            continue;
        }
        var ascii=formulaValues[i].trim().charCodeAt(0);
        if(ascii>=65 && ascii<=90){
            // means it is some address:
            console.log("call kra  address hai "+ childcelladdress+" parent address : "+formulaValues[i]);
            if(childcelladdress){
                addChildToParentProp(formulaValues[i].trim(),childcelladdress);
            }
            
            let val=getValueFromAddress(formulaValues[i].trim());
            console.log("within ascii wala if ");
            formulaValues[i]=val.length==0?0:val;
            console.log(formulaValues[i]);
            console.log("aya ");
        }
    }
    var expression=formulaValues.join(" ");
  //  console.log("expression is : "+ expression);
    var ans= eval(expression);
    console.log(" ans is : "+ ans);
    return ans;
}

function addChildToParentProp(parentAddress, childcelladdress){
    console.log("call aya ");
     console.log("Parent Address : "+ parentAddress);
     console.log("child Address : "+childcelladdress);
     console.log("add PC relationships ");
    let childEncodedAddress=String.fromCharCode(childcelladdress[1]+65)+""+(childcelladdress[0]+1);
    var parentRowId=Number(parentAddress.slice(1))-1;
    var parentColId=Number(parentAddress.charCodeAt(0)-65);
    // console.log("parentRowId : "+ parentRowId);
    // console.log("parentColId : "+ parentColId);
    var parentCellProp=getCellProperties([parentRowId,parentColId]);
     console.log("child encoded Address : "+ childEncodedAddress);
    // console.log("parentCellProp is : ");
    // console.log(parentCellProp);
     parentCellProp.children.push(childEncodedAddress);
   // console.log(parentCellProp);
    console.log("sheetdb is ");
    console.log(sheetDB);   
}

function getValueFromAddress(address){
    var colId=Number(address.charCodeAt(0)-65);
    var rowId=Number(address.slice(1))-1;
    // console.log("address "+address +" rowId : "+ rowId+" colId : "+ colId);
    // console.log("sheetDB[rowId][colId] : ");
    // console.log(sheetDB[rowId][colId]);
    return sheetDB[rowId][colId].value;
}
