import styled from 'styled-components'
import type { IconProps } from './Icon'
import { Icon } from './Icon'

type IconButtonProps = {
  type: IconProps['type']
  onClick: () => void
  className?: string
}

const IconButton = ({ type, className, onClick }: IconButtonProps) => (
  <div className={className} onClick={onClick}>
    <Icon type={type} />
  </div>
)

const IconButtonStyled = styled(IconButton)`
  background-color: white;
  width: 70px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  ${Icon} {
    width: 24px;
    height: 24px;
    fill: var(--primaryLight);
    transition: fill 1.25s ease;
  }
  :hover {
    cursor: pointer;
    background-color: hsl(68,90%,90%);
  }
`

export default IconButtonStyled
