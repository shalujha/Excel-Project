let upload=document.querySelector(".upload");
let download=document.querySelector(".download");

download.addEventListener("click",(e)=>{
    let data=[sheetDB,graphComponentMatrix];
    let contentData=JSON.stringify(data);
    const file = new Blob([contentData], { type: "application/json"});
    const a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    let sheetsArray = document.querySelectorAll(".sheet-content");
    let sheetIdx;
    for(var i=0;i<sheetsArray.length;i++){
        if(sheetsArray[i].style.backgroundColor!="transparent"){
            sheetIdx=i+1;
            break;
        }
    }
    a.download = `Sheet${sheetIdx}.json`;
    a.click();
})

upload.addEventListener("click",(e)=>{
    let input=document.createElement("input");
    input.setAttribute("type","file");
    input.click();
    input.addEventListener("change",(e)=>{
        let fr=new FileReader();
        let files=input.files;
        let fileObj=files[0];
        fr.readAsText(fileObj);
        fr.addEventListener("load",(e)=>{
            let readSheetData=JSON.parse(fr.result);
            addBtn.click();
            sheetDB=readSheetData[0];
            graphComponentMatrix=readSheetData[1];
            combinedGraphMatrix[combinedGraphMatrix.length-1]=readSheetData[1];
            combinedSheetsDB[combinedSheetsDB.length-1]=readSheetData[0];
            handleCellProperties();


        })

    })
})