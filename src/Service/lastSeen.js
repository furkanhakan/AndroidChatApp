const lastSeen = (status, lastSeenTime) => {
    let lastSeenMessage;
    if (!status) {
        let time = new Date(lastSeenTime * 1000)
        let now = new Date()
        let day = null
        if (now.getDate() === time.getDate()) {
            day = 'bugün'
        } else if (now.getDate() - 1 === time.getDate()) {
            day = 'dün'
        }
        if (day) {
            lastSeenMessage = `Son görülme ${day} ${time.getHours()}:${time.getMinutes()}`;
        } else {
            lastSeenMessage = `Son görülme ${time.getDate()}.${time.getMonth()}.${time.getFullYear()} ${time.getHours()}:${time.getMinutes()}`;
        }
    } else {
        lastSeenMessage = 'Çevrimiçi'
    }

    return lastSeenMessage;
}

export default lastSeen;