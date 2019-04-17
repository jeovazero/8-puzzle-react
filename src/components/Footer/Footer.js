import React from 'react'
import styled from 'styled-components'

const _Footer = ({ className, img, text }) => (
  <div className={className}>
    {img && <img src={img} />}
    {text && <span>{text}</span>}
  </div>
)

const Footer = styled(_Footer)`
  img {
    margin-top: 30px;
    width: 100px;
  }
`

export default Footer
