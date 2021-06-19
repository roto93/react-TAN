import React from 'react'
import '../css/LatestNews.css'

export default function LatestNews() {
    return (
        <div className="container">
            <div className="txt">
                <h2>Latest Issues</h2>
                <div className="divider"></div>
                <ul>
                    {data.map((item, index) => (
                        <li key={index.toString()}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

const data = [
    'TAN (Issue Apr 19 - 25, 2021)',
    'ASIAA Colloquium/Seminar /Lunchtalk (Apr 26) (Apr 28)',
    '[EAVN2021B] Call for Proposals - East Asian VLBI Network (EAVN) 2021B',
    '[KVN2021B] Call for Proposals - Korean VLBI Network (KVN) 2021B',
    'NCTS Theoretical and Computational Astrophysics Summer Student Program',
]