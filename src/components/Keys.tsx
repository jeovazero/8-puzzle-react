import type { ReactNode } from 'react'
import styled from 'styled-components'
type KeysProps = {
  className?: string
  up: ReactNode
  left: ReactNode
  right: ReactNode
  down: ReactNode
}

const Keys = ({ className, up, left, right, down }: KeysProps) => (
  <div className={className}>
    <div className='keys__key'>{up}</div>
    <div className='keys__wrapper'>
      <div className='keys__key'>{left}</div>
      <div className='keys__key'>{down}</div>
      <div className='keys__key'>{right}</div>
    </div>
  </div>
)

const KeysStyled = styled(Keys)`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--fontFamilyPrimary);
  color: var(--primary);
  transition: color 1.25s ease;
  font-weight: bold;
  .keys__key {
    background-color: white;
    width: 36px;
    height: 28px;
    margin: 4px 2px 0px 2px;
    border-radius: 4px;
    text-align: center;
    line-height: 28px;
  }
  .keys__wrapper {
    display: flex;
  }
`
export default KeysStyled
