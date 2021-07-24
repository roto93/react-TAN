import React from 'react'
import { useParams, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import { StyledLink } from './Styled'

const StyledLinkForCategories = styled(StyledLink)`
    &:hover,&:active {
        font-weight: normal;
        color: #d4a373;
    }
`

const CategoryLink = ({ category }) => {
    const { url } = useRouteMatch()
    return (
        <li className="issues__nav__item">
            <StyledLinkForCategories to={`${url}/${category}`}>
                {category}
            </StyledLinkForCategories>
        </li>
    )
}

const Issues = () => {
    const { selectedYear } = useParams()


    return (
        <div className="issues">
            <div className="container">
                <div className="issues__content">
                    <h2 className="issues__year">{selectedYear}</h2>
                    <ul className="issues__nav">
                        <CategoryLink category={'Announcement'} />
                        <CategoryLink category={'Conferences'} />
                        <CategoryLink category={'Seminar'} />
                        <CategoryLink category={'Opportunities'} />
                        <CategoryLink category={'Observations'} />
                        <CategoryLink category={'Miscellaneous'} />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Issues
