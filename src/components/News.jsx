import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { API_URI } from '../lib/ENV'
import { issueSort } from '../lib/lib';
import { issueArrayTitlesIgnoreBreak } from '../lib/lib';

const News = () => {
    const [issuesArray, setIssuesArray] = useState([]);

    const history = useHistory()

    const getIssue = async () => {
        const t1 = new Date()
        const currentYear = new Date().getFullYear()
        const res = await fetch(`${API_URI}/archive/${currentYear}`)
        const data = await res.json()

        const sorttedData = issueSort(data)
        if (sorttedData.length === 0) return setIssuesArray([])
        let lastDayIssues = sorttedData[sorttedData.length - 1].issuesArray || ''

        //// ignore the \n in titles

        console.log(lastDayIssues[1])
        //

        lastDayIssues = issueArrayTitlesIgnoreBreak(lastDayIssues)

        // lastDayIssues = lastDayIssues.map(issue => {
        //     let splittedTitle = issue.title.split('\\n')
        //     let newTitle = splittedTitle.join(' ')
        //     return { ...issue, title: newTitle }
        // })


        setIssuesArray(lastDayIssues)
        const t2 = new Date()
        console.log(`Use ${t2 - t1}ms to fetch`)
    }

    useEffect(() => {
        getIssue()
    }, [])


    const renderIssues = issue => {

        const onIssueClick = () => {
            history.push(`/archive/id/${issue.id}`, { from: history.location.pathname })
        }
        return (
            <li
                key={issue.title}
                onClick={onIssueClick}
                className="news__item">
                {issue.title}
            </li>
        )
    }

    return (
        <div className="news">
            <div className="container">
                <div className="news__content">
                    <h2 className="news__title">Latest Issues</h2>
                    <div className="news__hr" />
                    <ul className="news__list">
                        {issuesArray.map(renderIssues)}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default News

const issues = [
    'TAN (Issue Apr 19 - 25, 2021)',
    '[EAVN2021B] Call for Proposals - East Asian VLBI Network (EAVN) 2021B',
    'NCTS Theoretical and Computational Astrophysics Summer Student Program',
    '[KVN2021B] Call for Proposals - Korean VLBI Network (KVN) 2021B',
]