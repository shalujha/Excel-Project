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

for(var i=0;i<cols;i++){
    let address_col=document.createElement("div");
    address_col.setAttribute("class","address-row");
    address_col.innerText=String.fromCharCode(65+i);
    address_row_container.appendChild(address_col);
}

for(var i=0;i<cols;i++){
    let row_cont=document.createElement("div");
    for(var j=0;j<=rows;j++){
        let address_col=document.createElement("div");
        address_col.setAttribute("contenteditable",true);
        address_col.setAttribute("class","address-row");
        row_cont.appendChild(address_col);
        
        addListenerForAddressBar(address_col,j,i);
    }
    cell_cont.appendChild(row_cont);
}

function addListenerForAddressBar(cell,i,j){
    cell.addEventListener("click",()=>{
        console.log("clicked");
        let colId=String.fromCharCode(65+j);
        let rowId=i;
        AddressBar.value=colId+""+rowId;
    })

    

}