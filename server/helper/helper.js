function makeId() {
    let id = '';
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".toLowerCase();
    for ( let i = 0; i < 12; i++ ) {
        id += characters.charAt(Math.floor(Math.random() * 36));
    }

    return id;
}

export {
    makeId,
}