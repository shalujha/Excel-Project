async function traceCycle(cycleResponse,graphComponentMatrix){
    let visited=[];
    let dfsVisited=[];
    for(var i=0;i<rows;i++){
        visitedRow=[];
        dfsVisitedRow=[];
        for(var j=0;j<cols;j++){
            visitedRow.push(false);
            dfsVisitedRow.push(false);
        }
        visited.push(visitedRow);
        dfsVisited.push(dfsVisitedRow);
    }
    await dfsCycleDetectionTraceCycle(graphComponentMatrix,cycleResponse[0],cycleResponse[1],visited,dfsVisited);
}

function colorPromise(){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
          resolve();
        },1000);
    })
}

async function dfsCycleDetectionTraceCycle(graphComponentMatrix,sr,sc,visited,dfsVisited){
    dfsVisited[sr][sc]=true;
    visited[sr][sc]=true;
    let cell=document.querySelector(`.cell[rowId="${sr}"][colId="${sc}"]`);
    cell.style.backgroundColor="lightblue";
    await colorPromise();
    let children=graphComponentMatrix[sr][sc];
    for(var i=0;i<children.length;i++){
        var crid=children[i][0];
        var ccid=children[i][1];
        let childCell=document.querySelector(`.cell[rowId="${crid}"][colId="${ccid}"]`);
        if(!visited[crid][ccid]){
            let response= await dfsCycleDetectionTraceCycle(graphComponentMatrix,crid,ccid,visited,dfsVisited);
            if(response){
                cell.style.backgroundColor="transparent";
                await colorPromise();
                return true;
            }
        }else if(dfsVisited[crid][ccid]){
            childCell.style.backgroundColor="lightsalmon";
            await colorPromise();
            cell.style.backgroundColor="transparent";
            await colorPromise();
            return true;
        }
    }
    dfsVisited[sr][sc]=false;
    cell.style.backgroundColor="transparent";
    await colorPromise();
    return false;
}