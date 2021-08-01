import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { StyledLink } from './Styled'

const StyledLinkForCategories = styled(StyledLink)`
    &:active {
            font-weight: normal;
            color: #d4a373;
    }
    @media(min-width:600px){
        &:hover {
            font-weight: normal;
            color: #d4a373;
        }
    }
`

const CategoryLink = ({ year, category }) => {
    return (
        <li className="issues__nav__item">
            <StyledLinkForCategories to={`/home/${year}/${category}`}>
                {category}
            </StyledLinkForCategories>
        </li>
    )
}

const EachDay = ({ data, categoryToShow }) => {
    if (categoryToShow !== 'All' & !data.issuesArray.some(issue => issue.type === categoryToShow)) return null
    return (
        <div className="issues__eachDay">
            <div className="issues__td__date">{data.date}</div>
            <ul className="issues__td__issueList">
                {data.issuesArray.map(issue => {
                    console.log('issue.type')
                    if (categoryToShow !== 'All' & issue.type !== categoryToShow) return null
                    return (
                        <li key={issue.title} className="issues__td__issueItem">
                            {issue.title}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

const Issues = () => {
    const { selectedYear, categoryToShow } = useParams()
    const [issueData, setIssueData] = useState([]);
    const fetchThisYearIssues = async () => {
        try {
            const res = await fetch(`http://127.0.0.1:5000/archive/${selectedYear}`)
            const data = await res.json()

            let newData = [...data.issues]

            // 整理出一個 array，以日期分類所有 issue
            const dateArray = []
            newData.forEach(item => {
                const dateExists = !dateArray.some(i => item.date === i?.date)
                const yearExists = !dateArray.some(i => item.year === i?.year)
                let newIssue = { type: item.type, year: item.year, date: item.date, title: item.title }
                if (yearExists & dateExists) {
                    dateArray.push({ date: item.date, issuesArray: [{ ...newIssue }] })
                } else {
                    let index = dateArray.findIndex(i => i.date === item.date)
                    dateArray[index].issuesArray.push({ ...newIssue })
                }
            })

            // 依照日期排序
            dateArray.sort((a, b) => {
                let aDate = Number(a.date)
                let bDate = Number(b.date)
                console.log(aDate, bDate)
                return aDate < bDate ? -1 : 1

            })

            setIssueData(dateArray)
            console.log(newData)
            console.log(dateArray)
        } catch (e) {
            console.log(e)
        }
    }

    // console.log(Number('0801'))

    useEffect(() => {
        fetchThisYearIssues()
    }, [])


    return (
        <div className="issues">
            <div className="container">
                <div className="issues__content">
                    <StyledLinkForCategories to={`/home/${selectedYear}/All`}>
                        <h2 className="issues__year">{selectedYear}</h2>
                    </StyledLinkForCategories>
                    <ul className="issues__nav">
                        <CategoryLink year={selectedYear} category={'Announcement'} />
                        <CategoryLink year={selectedYear} category={'Conferences'} />
                        <CategoryLink year={selectedYear} category={'Seminar'} />
                        <CategoryLink year={selectedYear} category={'Opportunities'} />
                        <CategoryLink year={selectedYear} category={'Observations'} />
                        <CategoryLink year={selectedYear} category={'Miscellaneous'} />
                    </ul>
                    <div className="issues__table">
                        <div className="issues__thead">
                            {/* <div className="issues__tr"> */}
                            <div className="issues__th__date">Date</div>
                            <div className="issues__th">Issue</div>
                            {/* </div> */}
                        </div>
                        <div className="issues__tbody">
                            {issueData.map(data => <EachDay
                                key={data.date}
                                data={data}
                                categoryToShow={categoryToShow} />)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Issues

const _issueData = [
    {
        date: "0801",
        issuesArray: [
            {
                "date": '0801',
                "id": 3,
                "title": "POST from TAN 1",
                "type": "Conferences",
                "year": 2021
            },
            {
                "date": "0801",
                "id": 4,
                "title": "POST from TAN 2",
                "type": "Conferences",
                "year": 2021
            }
        ]
    }
]

// 這種結構適合NoSQL
const issueData_ = [
    {
        date: '1/27',
        issues: [
            { category: 'Announcement', title: 'Hi, this is going to be a quick walk through.' },
            { category: 'Opportunities', title: 'This is a job opportunity.' },
            { category: 'Conferences', title: 'Lorem ipsum dolor sit amettt.' },
        ]
    }, {
        date: '3/2',
        issues: [
            { category: 'Announcement', title: 'Hi, this is going to be a very very long walk through.' },
            { category: 'Opportunities', title: 'This is a second job opportunity.' },
            { category: 'Conferences', title: 'Lorem ipsum dolor sit amets.' },
        ]
    }, {
        date: '11/17',
        issues: [
            { category: 'Announcement', title: 'Hi, this is going to be a very very long walk through.' },
            { category: 'Opportunities', title: 'This is a second job opportunity.' },
            { category: 'Conferences', title: 'Lorem ipsum dolor sit amets.' },
        ]
    },

]