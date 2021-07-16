//DOM handles
const appWrap = document.querySelector("#appWrap");
const daGrid = document.querySelector("#daGrid");
const controlPanel = document.querySelector("#controlPanel");
const shopping = document.querySelector("#windowShoppingSlot");
const activeFurniture = document.querySelector("#activeFurniture");
const buildFurniture = document.querySelector("#buildFurniture");
const garbageBin = document.querySelector("#garbageBin");

//Vars
const desiredX = 25;
const desiredY = 25;

let mode = "paint";
//valid modes so far - "paint", "lift"

const furnitureLink = new FurnitureLinker("furnitureIndex"); //extended version
//const furnitureLink = new ObjectDomLinker("furnitureIndex"); //non-extended version
//index 0 is reserved for the current window shopping furniture

let liftedFurniture;








//Grid Events/Stuff
//Clicking on the grid event
daGrid.addEventListener("click", e => {
    //paint mode: filling in grid boxes
    if (mode === "paint") {
        if (e.target.classList.contains("square")) {
            e.target.classList.toggle("full");
        }
    }
})


//Get position of a grid square from its x-y coordinates, relative to the daGrid div from top-left corner
//returns an array containing [x,y]
const getGridSquarePosition = (x, y) => {
    const square = daGrid.querySelector(`#square${x}-${y}`);
    return [square.offsetLeft, square.offsetTop]
}



//Control Panel Events

//Reset Button Event
controlPanel.querySelector("#resetButton").addEventListener("click", () => {
    daGrid.querySelectorAll(".full").forEach(box => {
        box.classList.remove("full");
    })
});


//Build Furniture button event listener
controlPanel.querySelector("#orderFurniture").addEventListener("click", e => {
    newWindowShoppingFurniture();
})

//Create New Furntiure in the Window Shopping window using current input values
const newWindowShoppingFurniture = () => {
    shopping.innerHTML = "";

    let windowFurniture = new Furniture(buildFurniture.querySelector("#shoppingX").value, buildFurniture.querySelector("#shoppingY").value);

    furnitureLink.addSetAtIndex(windowFurniture, windowFurniture.furniture, 0);
}



// Furniture objects (probably all events added to appWrapper)

//lift some furniture for dragging
appWrap.addEventListener("mousedown", e => {

    if (e.target.classList.contains("furnitureLeg")) {
        e.preventDefault();
        liftedFurniture = e.target.parentNode.parentNode;
        liftedFurniture.style.position = "fixed";
        liftedFurniture.style.left = e.clientX + "px";
        liftedFurniture.style.top = e.clientY + "px";
        mode = "lift";
        let furnitureObject = furnitureLink.fetchObjFromDom(liftedFurniture);
        furnitureObject.backupOrientation();
    }
});

//lifted furniture follows cursor
appWrap.addEventListener("mousemove", e => {
    if (liftedFurniture) {
        liftedFurniture.style.left = e.clientX + "px";
        liftedFurniture.style.top = e.clientY + "px";
    };
});

//rotate furniture on q & e
document.addEventListener("keydown", e => {
    if (e.key == "q" || e.key == "e") {
        if (liftedFurniture) {
            liftedObject = furnitureLink.fetchObjFromDom(liftedFurniture);

            if (e.key == "q") {
                liftedObject.orientation -= 90;
            } else {
                liftedObject.orientation += 90;
            }

            if (liftedObject.orientation == -90) {
                liftedObject.orientation = 270;
            }

            if (liftedObject.orientation == 360) {
                liftedObject.orientation = 0;
            }


            //change dom element to new orientation
            liftedObject.setOrientation();


        }
    }
});



//put down lifted furniture on mouseup
appWrap.addEventListener("mouseup", e => {
    
    
    if (liftedFurniture) {
        liftedObject = furnitureLink.fetchObjFromDom(liftedFurniture);


        //testing ideas
        const elements = document.elementsFromPoint(e.clientX, e.clientY);
        let boxWeCareAbout;
        let dropType = "";
        elements.forEach(box => {
            if (box.classList.contains("gridSquare") === true) { //if drop location is on the grid
                boxWeCareAbout = box;
                dropType = "gridSquare";
                //if the droplist shows signs of getting big, we might want to make it an actual array & loop through it
            } else if (box === garbageBin) { //if drop location is garbage bin
                boxWeCareAbout = box;
                dropType = "garbage";
            }
        });



        if (boxWeCareAbout) {
            if (dropType === "gridSquare") {

                liftedFurniture.style.position = "absolute";
                liftedFurniture.style.left = boxWeCareAbout.offsetLeft;
                liftedFurniture.style.top = boxWeCareAbout.offsetTop;

                const boxID = boxWeCareAbout.getAttribute("id").slice(6).split("-");

                let collisionBool = furnitureLink.detectCollision(liftedObject, boxID[0], boxID[1]);
                if (collisionBool === true) { //collision found, reverse drop
                    liftedObject.returnToPrevLocation();
                } else { //no collision, proceed
                    //if this furniture was from the window shopping, then move DOM element on page & the object-dom entry in the link array
                    if (liftedObject.rootX === -1 && liftedObject.rootY === -1) {
                        //move lifted furniture to the storage space for furniture on the grid
                        activeFurniture.appendChild(liftedFurniture);

                        //move furniture set to the end of the furnitureLink storage array
                        furnitureLink.addSet(liftedObject, liftedFurniture);

                        //create new furniture in the window shopping slot to replace the one that was just moved to grid
                        newWindowShoppingFurniture();
                    }

                    //update the object's root variables to show its current "home" location on the grid
                    liftedObject.rootX = Number(boxID[0]);
                    liftedObject.rootY = Number(boxID[1]);
                    liftedObject.buildEnd(); //calculate end point coords
                    liftedObject.backupOrientation(); //save new orientation to backup

                }

            } else if (dropType === "garbage") {// if drop location was the garbage bin to delete furniture 
                let indexToDelete = furnitureLink.indexFromDom(liftedFurniture);

                if (indexToDelete === "0") { //handling for silly users dropping window shopping furniture into garbage bin
                    newWindowShoppingFurniture();
                } else { //handling for furniture in all other non-window shopping indexes (non-0)
                    furnitureLink.destroySetFromIndex(indexToDelete);
                }
            } else {
                console.log("you somehow found a valid drop location without setting the drop type. Bad code :(");
            }


        } else {
            liftedObject.returnToPrevLocation();
        }

        liftedFurniture = null;
        mode = "paint";
    }//end if(liftedFurniture)




}); //end mouseup event to drop lifted furniture











//Initialize default furniture object
newWindowShoppingFurniture();


//Initialize base Grid
//(Not combining with furniture grid generation because they will be different when we add fencing to base grid)
let i;
for (i = 0; i < desiredY; i++) {
    const myRow = document.createElement("div");
    myRow.classList.add("row");
    myRow.setAttribute("id", `row${i}`);

    let j;
    for (j = 0; j < desiredX; j++) {
        const myBox = document.createElement("div");
        myBox.classList.add("square");//eventually will remove this when we style grid squares & furniture squares differently
        myBox.classList.add("gridSquare");
        myBox.setAttribute("id", `square${j}-${i}`);


        myRow.appendChild(myBox);
    }

    daGrid.appendChild(myRow);
}