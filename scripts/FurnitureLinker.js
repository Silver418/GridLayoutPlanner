class FurnitureLinker extends ObjectDomLinker{
    
    constructor(indexLabel){
        super(indexLabel);
    }

    //detects whether a furniture object dropped onto the map at coords X,Y will collide with anything else
    detectCollision(furnitureObj, TargetXStart, TargetYStart){
        //get end points of this furniture if dropped at X,Y
        TargetXStart = Number(TargetXStart);
        TargetYStart = Number(TargetYStart);
        let TargetXEnd;
        let TargetYEnd;

        if (furnitureObj.orientation === 0 || furnitureObj.orientation === 180){
            TargetXEnd = parseInt(TargetXStart) + parseInt(furnitureObj.sizeX) - 1;
            TargetYEnd = parseInt(TargetYStart) + parseInt(furnitureObj.sizeY) - 1;
        } else{ //for 90 or 270 degree rotations
            TargetXEnd = parseInt(TargetXStart) + parseInt(furnitureObj.sizeY) - 1;
            TargetYEnd = parseInt(TargetYStart) + parseInt(furnitureObj.sizeX) - 1;
        }

        //detect collision with other furniture objects
        for (let i = 0; i < this.ObjectDomArray.length; i++){
            let checkObject =  super.fetchObjFromIndex(i);
            if (checkObject !== furnitureObj) //do not check the furniture you're moving against
            {
                let coordArray = checkObject.getCorners();

                //finally have all coords, check collision here
                if (TargetXStart <= coordArray[2] && TargetYStart <= coordArray[3] 
                    && TargetXEnd >= coordArray[0] && TargetYEnd >= coordArray[1]){
                    return true;
                }        
            }
        }
            
        //check grid bound collision
        if (TargetXEnd >= desiredX || TargetYEnd >= desiredY){
            return true;
        }

        //check terrain collision
        let isCollision = false;
        
        
        daGrid.querySelectorAll(".full").forEach(box => {
            if (!isCollision){
                let coord = box.getAttribute("id").slice(6).split("-");
                let terrainX = coord[0];
                let terrainY = coord[1];
    
                if (TargetXStart <= terrainX && TargetYStart <= terrainY && TargetXEnd >= terrainX && TargetYEnd >= terrainY){
                    isCollision = true;
                }
            }
            
        });
        if (isCollision){
            return true;
        }
        
        
        return false;
    } //end detectCollision method
    
} //end FurnitureLinker class