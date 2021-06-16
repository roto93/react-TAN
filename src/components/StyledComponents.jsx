import styled from 'styled-components'

export const TO = styled.div`
        /* border: 1px #fff solid; */
        /* width:124px;
        height: 60px; */
        display:flex;
        justify-content:center;
        align-items: center;
        padding:10px;margin:10px;
        font-size:26px;
        color:#fff;
        font-family:'Noto Sans', sans-serif;
        &:hover{
          font-weight:bold;
          cursor: pointer;
        }
        &:active {
         opacity:0.5;
        }
        @media screen and (max-width:768px){
            font-size:14px;
            margin:4px;
        }
        @media screen and (max-width:480px) {
            font-size:10px;
            margin:4px;
        }
      `

export const ForeGround = styled.div`
        /* border: 1px #fff solid; */
        box-sizing:border-box;
        width:100%;
        max-width: 1440px;
        position:absolute;
        top:0px;
        display:flex;
        flex-direction:column;
        align-items: center;
        user-select:none;
      `

export const TitleBox = styled.div`
        display:flex;
        justify-content:space-evenly;
        align-items:center;
        width:58%;
        height: 10vw;
        min-height:48px;
        max-height: 142px;
        border-top: 1px #fff solid;
        border-bottom: 1px #fff solid;
        margin-top:26px;
        @media screen and (max-width:768px){
            margin-top:13px;
        }
        @media screen and (max-width:480px){
            width:60%
        }
      `

export const RowDiv = styled.div`
        display:flex;
        justify-content:center;
        align-items:center;
`

export const TitleRowDiv = styled(RowDiv)`
        margin:12px;
`