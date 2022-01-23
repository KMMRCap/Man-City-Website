export const firebaseLooper = (snapshot) => {
    let data = []
    snapshot.forEach((child) => {
        data.push({
            ...child.val(),
            id: child.key
        })
    })
    return data
}

export const arrayReverser = (array) => {
    let newArray = []

    for (let i = array.length - 1; i >= 0; i--){
        newArray.push(array[i])
    }
    return newArray
}