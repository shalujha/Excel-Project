let graphComponentMatrix=[];
for(var i=0;i<rows;i++){
    graphComponentMatrix.push([]);
    for(var j=0;j<cols;j++){
        graphComponentMatrix[i].push([]);
    }
}


function isCyclic(){
    let visited=[];
    let dfsVisited=[];
    for(i=0;i<rows;i++){
        visitedRow=[];
        dfsVisitedRow=[];
        for(j=0;j<cols;j++){
            visitedRow.push(false);
            dfsVisitedRow.push(false);
        }
        visited.push(visitedRow);
        dfsVisited.push(dfsVisitedRow);
    }

    for(i=0;i<rows;i++){
        for(j=0;j<cols;j++){
            if(!visited[i][j]){
                let response=dfsCycleDetection(graphComponentMatrix,i,j,visited,dfsVisited);
                if(response){
                    return [i,j];
                }
            }
        }
    }
    return false;
}


function dfsCycleDetection(graphComponentMatrix,sr,sc,visited,dfsVisited){
    dfsVisited[sr][sc]=true;
    visited[sr][sc]=true;

    let children=graphComponentMatrix[sr][sc];
    for(i=0;i<children.length;i++){
        var crid=children[i][0];
        var ccid=children[i][1];
        if(!visited[crid][ccid]){
            let response=dfsCycleDetection(graphComponentMatrix,crid,ccid,visited,dfsVisited);
            if(response){
                return true;
            }
        }else if(dfsVisited[crid][ccid]){
            return true;
        }
    }

    dfsVisited[sr][sc]=false;
    return false;
}