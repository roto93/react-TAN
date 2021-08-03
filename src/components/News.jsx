import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { API_URI } from '../lib/ENV'
import { issueSort } from '../lib/lib';

const News = () => {

    const [issuesArray, setIssuesArray] = useState([]);

    const history = useHistory()

    const getIssue = async () => {
        const currentYear = new Date().getFullYear()
        console.log(`${API_URI}/archive/${currentYear}`)
        const res = await fetch(`${API_URI}/archive/${currentYear}`)
        const data = await res.json()

        const sorttedData = issueSort(data)

        const lastDayIssues = sorttedData[sorttedData.length - 1].issuesArray
        setIssuesArray(lastDayIssues)
    }

    useEffect(() => {
        getIssue()
    }, [])


    const renderIssues = issue => {

        const onIssueClick = () => {
            history.push(`/archive/${issue.id}`)
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