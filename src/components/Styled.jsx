import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const StyledLink = styled(Link)`
    text-decoration: none;
    cursor: pointer;
    @media(min-width:600px){

        &:focus, &:hover, &:visited, &:link, &:active {
            text-decoration: none;
        }
        &:hover{
            font-weight: bold;
        }
        &:active {
            font-weight: bold;
            opacity: 0.5;
        }
        
    }

`

