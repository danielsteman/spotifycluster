const pagination = (array, batchSize) => {
    
    const pages = Math.ceil(array.length / batchSize)
    const choppedUpArray = []
    for (let i = 0; i < pages; i++) {
        const slice = array.slice(i * batchSize, batchSize + i * batchSize)
        choppedUpArray.push(slice)
    }
    return choppedUpArray
    
}

export default pagination