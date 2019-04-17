import styled from 'styled-components'
import React from 'react'

const _Button = ({ icon, className, onClick }) => (
  <div className={className} onClick={onClick}>
    <img src={icon} />
  </div>
)

const Button = styled(_Button)`
  background-color: white;
  width: 70px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  img {
    width: 30%;
  }
  :hover {
    cursor: pointer;
    background-color: lightpink;
  }
`

export default Button
