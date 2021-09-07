export const issueSort = (data) => {
    console.log(data)
    if (data.issues.length === 0) return []
    let newData = [...data.issues]

    // 整理出一個 array，以日期分類所有 issue
    const dateArray = []
    newData.forEach(item => {
        const dateExists = !dateArray.some(i => item.date === i?.date)
        const yearExists = !dateArray.some(i => item.year === i?.year)
        let newIssue = { id: item.id, type: item.type, year: item.year, date: item.date, title: item.title }
        if (yearExists & dateExists) {
            dateArray.push({ date: item.date, issuesArray: [{ ...newIssue }] })
        } else {
            let index = dateArray.findIndex(i => i.date === item.date)
            dateArray[index].issuesArray.push({ ...newIssue })
        }
    })

    // 依照日期排序
    const sortMethod = (a, b) => {
        let aDate = Number(a.date)
        let bDate = Number(b.date)
        return aDate < bDate ? -1 : 1
    }
    dateArray.sort(sortMethod)



    return dateArray
}

export const issueArrayTitlesIgnoreBreak = (issues) => {
    let newIssues = issues.map(issue => {
        let splittedTitle = issue.title.split('\\n')
        let newTitle = splittedTitle.join(' ')
        return { ...issue, title: newTitle }
    })
    return newIssues
}

export const titleIgnoreBreak = (issueTitle) => {
    let splittedTitle = issueTitle.split('\\n')
    let newTitle = splittedTitle.join(' ')
    return newTitle
}

export const issueArrayTitleDoBreak = (issues) => {
    let newIssues = issues.map(issue => {
        let splittedTitle = issue.title.split('\\n')
        let newTitle = splittedTitle.join('\n\t')
        return { ...issue, title: newTitle }
    })
    return newIssues
}