let address_col_container=document.querySelector(".address-col-cont");
let address_row_container=document.querySelector(".address-row-cont");
let cell_cont=document.querySelector(".cell-cont");
let AddressBar=document.querySelector(".address-bar");
let rows=100;
let cols=26;
for(var i=0;i<rows;i++){
    let address_col=document.createElement("div");
    address_col.innerText=i+1;
    address_col.setAttribute("class","address-col");
    address_col_container.appendChild(address_col);
}

for(i=0;i<cols;i++){
    let address_row=document.createElement("div");
    address_row.setAttribute("class","address-row");
    address_row.innerText=String.fromCharCode(65+i);
    address_row_container.appendChild(address_row);
}

// for(var i=0;i<cols;i++){
//     let row_cont=document.createElement("div");
//     row_cont.setAttribute("class", "row-cont");
//     for(var j=0;j<=rows;j++){
//         let address_col=document.createElement("div");
//         address_col.setAttribute("contenteditable",true);
//         address_col.setAttribute("class","cell");
//         row_cont.appendChild(address_col);
        
//         addListenerForAddressBar(address_col,j,i);
//     }
//     cell_cont.appendChild(row_cont);
// }
for(i=0;i<rows;i++){
    let row_cont=document.createElement("div");
    row_cont.setAttribute("class", "row-cont");
    for(var j=0;j<cols;j++){
        let address_col=document.createElement("div");
        address_col.setAttribute("contenteditable",true);
        address_col.setAttribute("class","cell");
        address_col.setAttribute("rowId",i);
        address_col.setAttribute("colId",j);
        row_cont.appendChild(address_col);
        
        addListenerForAddressBar(address_col,i,j);
    }
    cell_cont.appendChild(row_cont);
}
function addListenerForAddressBar(cell,i,j){
    cell.addEventListener("click",()=>{
      //  console.log("clicked");
        let colId=String.fromCharCode(65+j);
        let rowId=i+1;
        AddressBar.value=colId+""+rowId;
    })
}

