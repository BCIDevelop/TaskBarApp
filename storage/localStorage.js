export function saveSingleObject(key, object) {
    localStorage.setItem(key, JSON.stringify(object));
}

export function saveToList(key, object) {
    const list = JSON.parse(localStorage.getItem(key)) || [];
    list.push(object);
    localStorage.setItem(key, JSON.stringify(list));
}

export function getSingleObject(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function getList(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}
export function setList(key,list){
    localStorage.setItem(key,JSON.stringify(list));
}