import { createGlobalStyle, css } from 'styled-components'

const BODY_STYLE = css`
  background-color: #091422;
  color: #dfe0e2;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 12px;
  line-height: 16px;
`

const GlobalStyling = createGlobalStyle`
  body {
    ${BODY_STYLE}
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0 0 4px 0;
    font-weight: 600;
  }

  h1 {
    font-size: 20px;
    line-height: 28px;
  }

  h2 {
    font-size: 18px;
    line-height: 24px;
  }

  h3 {
    font-size: 16px;
    line-height: 18px;
  }

  h4 {
    font-size: 14px;
    line-height: 18px;
  }
`

export default GlobalStyling
