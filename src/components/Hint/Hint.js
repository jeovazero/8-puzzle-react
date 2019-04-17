import React from 'react'
import styled from 'styled-components'
import { STYLE } from '@/styles.js'

const _Hint = ({ img, text, className }) => (
  <div className={className}>
    {text && <span> {text} </span>}
    {img && <img src={img} />}
  </div>
)

const Hint = styled(_Hint)`
  font-family: ${STYLE.fontFamily}, sans-serif;
  width: 100px;
  text-align: center;
  color: white;
  font-size: 1.5em;

  img {
    width: 100%;
    margin-top: 10px;
  }
`

export default Hint
