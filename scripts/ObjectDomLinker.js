//STUFF TO ADD
//Method for returning the full object-DOM set (versions for using index, object, & dom as inputs), so you can export stuff to other ObjectDomLinker objects
//also a method for removing a set from THIS link array and removing the index property/attribute, but not removing the element from the page. For when you want to remove a set from this array & move it to another one
//method for adding a set that replaces a target index
//(although I was kind of intending to just use different arrays for that, soooooooooooo... maybe not.)



//potential new methods to add:
    //removing an element, but keeping the object
    //associating a new element with an object

    //fetching elements????
        //fetchDomFromIndex(index){}
        //fetchDomFromObj(object){}

    //removing a range of sets


class ObjectDomLinker {
    constructor(indexLabel){
        this.ObjectDomArray = [];
        this.indexLabel = indexLabel;
    }

    /************************************************/
    //return length of ObjectDomArray
    Length(){
        return this.ObjectDomArray.length;
    }

    /************************************************/
    addSet(object, element){
        element.setAttribute(this.indexLabel, this.ObjectDomArray.length);
        object[this.indexLabel] = this.ObjectDomArray.length;
        this.ObjectDomArray.push([object, element]);
    }

    addSetAtIndex(object, element, index)
    {
        element.setAttribute(this.indexLabel, index);
        object[this.indexLabel] = index;
        this.ObjectDomArray[index] = [object, element];
    }


    /************************************************/
    //getting the index of a set
    indexFromDom(element){
        return element.getAttribute(this.indexLabel);
    }

    indexFromObj(object){
        return object[this.indexLabel];
    }


    /************************************************/
    //fetching objects
    fetchObjFromIndex(index){
        return this.ObjectDomArray[index][0];
    }

    fetchObjFromDom(element){
        return this.ObjectDomArray[element.getAttribute(this.indexLabel)][0];
    }


    /************************************************/
    //destroying a set
    destroySetFromDom(element){
        const index = element.getAttribute(this.indexLabel);
        console.log(element.parentNode);
        element.parentNode.removeChild(element);
        this.ObjectDomArray.splice(index,1);
        this.relabelByIndex(index);
    }

    destroySetFromIndex(index){
        this.ObjectDomArray[index][1].parentNode.removeChild(this.ObjectDomArray[index][1]);
        this.ObjectDomArray.splice(index, 1);
        this.relabelByIndex(index);
    }


    /***************************************************/
    //redo index labels
    relabelAll(){
        let i;
        for (i=0; i < this.ObjectDomArray.length; i++){
            this.ObjectDomArray[i][0][indexLabel] = i;
            this.ObjectDomArray[i][1].setAttribute(indexLabel, i);
        }
    }

    relabelByIndex(index){
        let i;
        for (i=index; i < this.ObjectDomArray.length; i++){
            this.ObjectDomArray[i][0][this.indexLabel] = i;
            this.ObjectDomArray[i][1].setAttribute(this.indexLabel, i);
        }
    }
}
