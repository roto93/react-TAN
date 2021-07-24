import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const StyledLink = styled(Link)`
    text-decoration: none;
    cursor: pointer;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
    &:hover{
        font-weight: bold;
    }
    &:active,
    &:focus{
        font-weight: bold
        opacity 0.5
    }
`