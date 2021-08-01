export const convertNumToMonth = (num) => {
    switch (num) {
        case 1: return 'Jan'
        case 2: return 'Feb'
        case 3: return 'Mar'
        case 4: return 'Apr'
        case 5: return 'May'
        case 6: return 'Jun'
        case 7: return 'Jul'
        case 8: return 'Aug'
        case 9: return 'Sep'
        case 10: return 'Oct'
        case 11: return 'Nov'
        case 12: return 'Dec'
    }
}

export const convertMonthToNum = (num) => {
    switch (num) {
        case 'Jan': return 1
        case 'Feb': return 2
        case 'Mar': return 3
        case 'Apr': return 4
        case 'May': return 5
        case 'Jun': return 6
        case 'Jul': return 7
        case 'Aug': return 8
        case 'Sep': return 9
        case 'Oct': return 10
        case 'Nov': return 11
        case 'Dec': return 12
    }
}