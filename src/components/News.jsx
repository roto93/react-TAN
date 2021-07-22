import React from 'react'


const News = () => {

    const renderIssues = issue => (
        <li key={issue} className="news__item">
            {issue}
        </li>
    )

    return (
        <div className="news">
            <div className="container">
                <div className="news__content">

                    <h2 className="news__title">Latest Issues</h2>
                    <div className="news__hr" />
                    <ul className="news__list">
                        {issues.map(renderIssues)}
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