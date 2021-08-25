//Furniture Class

class Furniture {
    constructor(x, y) {//will eventually take width & height
        this.sizeX = parseInt(x);
        this.sizeY = parseInt(y);

        this.orientation = 0; //0, 90, 180, 360 - for rotating furniture
        this.orientationBackup = 0;

        this.rootX = -1; //grid location of top-left corner of furniture
        this.rootY = -1; //-1 indicates not placed on grid yet

        this.endX = -1; //grid location of bottom-right corner of furniture
        this.endY = -1;

        this.furniture = this.generateFurnitureDOM(this.sizeX, this.sizeY)
    } ////end constructor

    generateFurnitureDOM(sizeX, sizeY) {
        const myFurniture = document.createElement("div");
        myFurniture.classList.add("furniture");


        for (let i = 0; i < sizeY; i++) {
            const myRow = document.createElement("div");
            myRow.classList.add("row");
            //myRow.setAttribute("id",`row${i}`);

            for (let j = 0; j < sizeX; j++) {
                const myBox = document.createElement("div");
                myBox.classList.add("furnitureLeg");

                //add classes for edges
                if (i == 0) { //top edge
                    myBox.classList.add("furnitureEdgeTop");
                }
                if (i == sizeY - 1) { //bottom edge
                    myBox.classList.add("furnitureEdgeBottom");
                }
                if (j == 0) { //left edge
                    myBox.classList.add("furnitureEdgeLeft");
                }
                if (j == sizeX - 1) { //right edge
                    myBox.classList.add("furnitureEdgeRight");
                }

                myRow.appendChild(myBox);
            }

            myFurniture.appendChild(myRow);
        }

        shopping.appendChild(myFurniture)
        return myFurniture;
    } //end generateFurniture

    //store current orientation in backup (in case drop is bad & we need to return furniture to previous position)
    backupOrientation() {
        this.orientationBackup = this.orientation;
    }

    //restore orientation backup (when drop is bad)
    restoreOrientation() {
        this.orientation = this.orientationBackup;
    }


    //calculate end points
    buildEnd() {
        if (this.orientation === 0 || this.orientation === 180) {
            this.endX = parseInt(this.rootX) + parseInt(this.sizeX) - 1;
            this.endY = parseInt(this.rootY) + parseInt(this.sizeY) - 1;

        } else { //for 90 or 270 degree rotations
            this.endX = parseInt(this.rootX) + parseInt(this.sizeY) - 1;
            this.endY = parseInt(this.rootY) + parseInt(this.sizeX) - 1;
        }
    } //end buildEnd

    getCorners() { //for use in collision detection
        return [this.rootX, this.rootY, this.endX, this.endY];
    }




    /**********************************************/
    //Methods for positioning the DOM element of a furniture object
    //move everything over from the stuff.js file at some point


    //set furniture transform style from object variables
    setOrientation() {
        switch (this.orientation) {
            case 0:
                this.furniture.style.transform = ""
                break;
            case 90:
                this.furniture.style.transform = "rotate(90deg) translate(0, -100%)";
                break;
            case 180:
                this.furniture.style.transform = "rotate(180deg) translate(-100%, -100%)";
                break;
            case 270:
                this.furniture.style.transform = "rotate(270deg) translate(-100%, 0)";
                break;
            default:
                console.log("setOrientation: invalid orientation found in furniture object.orientation");
        }
    }


    returnToPrevLocation() {
        liftedObject.restoreOrientation();
        liftedObject.setOrientation();

        if (liftedObject.rootX !== -1 && liftedObject.rootY !== -1) { //was previously on the grid
            const formerCoordinates = getGridSquarePosition(liftedObject.rootX, liftedObject.rootY);

            liftedFurniture.style.position = "absolute";
            liftedFurniture.style.left = formerCoordinates[0];
            liftedFurniture.style.top = formerCoordinates[1];
        } else { //was previously window shopping furiture
            liftedFurniture.style.position = "relative";
            liftedFurniture.style.top = "";
            liftedFurniture.style.left = "";
        }
    }

} //end furniture class
