import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { API_URI } from '../lib/ENV'
import { StyledLink } from './Styled'
import ReactLoading from 'react-loading'
import { issueArrayTitleDoBreak } from '../lib/lib'
import useWindowSize from '../hooks/useWindowSize'
import { BackToTop } from '../images/SVG'

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
    const { categoryToShow } = useParams()

    const isActive = categoryToShow === category
    return (
        <li className={`issues__nav__item ${isActive ? 'active' : ''}`}>
            <StyledLinkForCategories to={`/archive/list/${year}/${category}`}>
                {category}
            </StyledLinkForCategories>
        </li>
    )
}

const EachDay = ({ data, categoryToShow }) => {
    const history = useHistory()
    const { height: winY } = useWindowSize()

    if (categoryToShow !== 'All' & !data.issuesArray.some(issue => issue.type === categoryToShow)) return null
    return (
        <div className="issues__eachDay">
            <div className="issues__td__date">{`${Number(data.date.slice(0, 2))}/${data.date.slice(2, 4)}`}</div>
            <ul className="issues__td__issueList">
                {data.issuesArray.map(issue => {
                    if (categoryToShow !== 'All' & issue.type !== categoryToShow) return null
                    return (
                        <li
                            key={issue.title}
                            className="issues__td__issueItem"
                            onClick={() => { window.scrollTo(0, winY - 100); history.push(`/archive/id/${issue.id}`, { from: history.location.pathname }) }}
                        >
                            -  {issue.title}
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
    const [isFetching, setIsFetching] = useState(true);
    const { height: winY } = useWindowSize()

    const backToTop = () => {
        window.scrollTo(0, winY - 100)
    }

    const goToBottom = () => {
        window.scrollTo(0, document.body.scrollHeight)
    }

    const fetchThisYearIssues = async () => {
        try {
            let fetchYear_URI = `${API_URI}/archive/${selectedYear}`
            const res = await fetch(fetchYear_URI)
            const data = await res.json()

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
            dateArray.sort((a, b) => {
                let aDate = Number(a.date)
                let bDate = Number(b.date)
                // console.log(aDate, bDate)
                return aDate < bDate ? -1 : 1
            })

            // 依需要將標題換行
            let newDateArray = dateArray.map(date => ({ ...date, issuesArray: issueArrayTitleDoBreak(date.issuesArray) }))

            // 依照id排序
            const idSortMethod = (a, b) => {
                let a_id = Number(a.id)
                let b_id = Number(b.id)
                return a_id < b_id ? -1 : 1
            }
            newDateArray = newDateArray.map(date => {
                return { ...date, issuesArray: date.issuesArray.sort(idSortMethod) }
            })

            setIssueData(newDateArray)
        } catch (e) {
            // console.log(e)
        } finally {
            setIsFetching(false)
        }
    }

    useEffect(() => {
        fetchThisYearIssues()
    }, [])


    return (
        <div className="issues">
            <div className="container">
                <div className="issues__content">
                    <StyledLinkForCategories to={`/archive/list/${selectedYear}/All`}>
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

                    {isFetching || issueData.length === 0 || <div className="detail__back-to-top"
                        onClick={goToBottom}
                    >
                        <div className="detail__back-to-top__icon flipped">
                            <BackToTop />
                        </div>
                        <p className="detail__back-to-top__text">Go to bottom</p>
                    </div>}

                    <div className="issues__table">
                        <div className="issues__thead">
                            {/* <div className="issues__tr"> */}
                            <div className="issues__th__date">Date</div>
                            <div className="issues__th__issue">Issue</div>
                            {/* </div> */}
                        </div>
                        <div className="issues__tbody">
                            {issueData.map(data => <EachDay
                                key={data.date}
                                data={data}
                                categoryToShow={categoryToShow} />)}
                        </div>
                    </div>

                    {(isFetching || issueData.length === 0)
                        && <p style={{
                            whiteSpace: 'pre-wrap', fontSize: '1.5rem', lineHeight: 2, opacity: 0.7,
                            fontFamily: "Inder", margin: "5em auto", color: "#cdd", textAlign: 'center'
                        }}>
                            This page is waiting for update.
                        </p>}

                    {isFetching || issueData.length === 0 || <div className="detail__back-to-top"
                        onClick={backToTop}
                    >
                        <div className="detail__back-to-top__icon">
                            <BackToTop />
                        </div>
                        <p className="detail__back-to-top__text">Back to top</p>
                    </div>}
                    {isFetching && <div style={{ paddingTop: "50px" }}>
                        <ReactLoading type="bubbles" width="60px" height="30px" color="white" />
                    </div>}
                </div>
            </div>
        </div >
    )
}

export default Issues

// const _issueData = [
//     {
//         date: "0801",
//         issuesArray: [
//             {
//                 "date": '0801',
//                 "id": 3,
//                 "title": "POST from TAN 1",
//                 "type": "Conferences",
//                 "year": 2021
//             },
//             {
//                 "date": "0801",
//                 "id": 4,
//                 "title": "POST from TAN 2",
//                 "type": "Conferences",
//                 "year": 2021
//             }
//         ]
//     }
// ]

// 這種結構適合NoSQL
// const issueData_ = [
//     {
//         date: '1/27',
//         issues: [
//             { category: 'Announcement', title: 'Hi, this is going to be a quick walk through.' },
//             { category: 'Opportunities', title: 'This is a job opportunity.' },
//             { category: 'Conferences', title: 'Lorem ipsum dolor sit amettt.' },
//         ]
//     }, {
//         date: '3/2',
//         issues: [
//             { category: 'Announcement', title: 'Hi, this is going to be a very very long walk through.' },
//             { category: 'Opportunities', title: 'This is a second job opportunity.' },
//             { category: 'Conferences', title: 'Lorem ipsum dolor sit amets.' },
//         ]
//     }, {
//         date: '11/17',
//         issues: [
//             { category: 'Announcement', title: 'Hi, this is going to be a very very long walk through.' },
//             { category: 'Opportunities', title: 'This is a second job opportunity.' },
//             { category: 'Conferences', title: 'Lorem ipsum dolor sit amets.' },
//         ]
//     },

// ]