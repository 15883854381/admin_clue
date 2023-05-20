
/**
 * 
 * @param {object} clearobj  需要清空的object对象
 * @returns obj
 */
export function clearobj(clearobj) {
    if (typeof clearobj !== 'object') {
        console.error("参数不是json对象---clearobj")
        return
    }
    for (var key in clearobj) {
        clearobj[key] = null
    }
    return clearobj
}



/**
 * 
 * @param {object} searchobj  需要查询的的object对象
 * @returns obj
 */
export function searchobj(searchobj) {
    let search = { notTitle: [], code: 1 }
    for (var key in searchobj) {
        if (searchobj[key] == "") {
            search['code'] = 0 // 状态
            search.notTitle.push(key) // 有参数的值
        }
    }
    return search
}




/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}