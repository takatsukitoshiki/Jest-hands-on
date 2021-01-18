exports.filterPeaples = function (peaples, key, value) {
    return peaples.filter(peaple => {
        return peaple[key] ? peaple[key] === value : false
    })
}
