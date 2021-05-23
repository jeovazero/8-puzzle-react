import styled from 'styled-components'

type IconButtonProps = {
  type: 'play' | 'reset'
  onClick: () => void
  className?: string
}

const IconButton = ({ type, className, onClick }: IconButtonProps) => (
  <div className={className} onClick={onClick}>
    <svg>
      <use href={`#${type}`} />
    </svg>
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
  svg {
    width: 24px;
    height: 24px;
    fill: var(--primaryLight);
    transition: fill 1.25s ease;
  }
  :hover {
    cursor: pointer;
    background-color: lightpink;
  }
`

export default IconButtonStyled
