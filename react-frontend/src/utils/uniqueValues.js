const uniqueValues = (arr) => {

    var filteredArray = arr.filter(function(item, pos){
        return arr.indexOf(item) === pos; 
    });
    return filteredArray

}

export default uniqueValues