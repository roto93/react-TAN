import React from 'react'
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

const Issues = () => {
    const { selectedYear, categoryToShow } = useParams()

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
                            {issueData.map(data => <EachDay key={data.date} data={data} categoryToShow={categoryToShow} />)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Issues

const EachDay = ({ data, categoryToShow }) => {
    if (categoryToShow !== 'All' & !data.issues.some(issue => issue.category === categoryToShow)) return null
    return (
        <div className="issues__eachDay">
            <div className="issues__td__date">{data.date}</div>
            <ul className="issues__td__issueList">
                {data.issues.map(issue => {
                    if (categoryToShow !== 'All' & issue.category !== categoryToShow) return null
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

const issueData = [
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