import styled from 'styled-components'

type RibbonProps = {
  children: string
  className?: string
}

const Ribbon = ({ children, className }: RibbonProps) => {
  return (
    <div className={className}>
      <div className='ribbon__back'>
        <div className='ribbon__decoration'></div>
        <div className='ribbon__decoration'></div>
      </div>
      <div className='ribbon__front'>
        <div className='ribbon__shadow'></div>
        <div className='ribbon__title'>
          <h2>{children}</h2>
        </div>
      </div>
    </div>
  )
}

const RibbonStyled = styled(Ribbon)`
  --width: 300px;
  --height: calc(var(--width) / 5.5);

  display: flex;
  width: var(--width);
  padding-top: 15px;
  position: relative;
  .ribbon__back{
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  .ribbon__decoration {
    position: relative;
    display: flex;

    :nth-child(1):after, :nth-child(2):before {
      content: '';
      display: block;
      height: var(--height);
      width: calc(var(--width) / 7);
      background-color: #e8e0e0;
    }
    :nth-child(1):before, :nth-child(2):after {
      content: '';
      border: calc(var(--height) / 2) solid #e8e0e0;
      box-sizing: border-box;
      display: block;
    }
    :nth-child(1):before {
      border-left-color: #fff0;
    }
    :nth-child(2):after {
      border-right-color: #fff0;
    }
  }
  .ribbon__front {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    margin: auto;
    width: calc(var(--width) * 0.625);

    div {
      margin: auto;
    }
  }
  .ribbon__shadow {
    width: 100%;
    justify-content: space-between;
    display: flex;
    position: absolute;
    bottom: -7px;
    z-index: 1;

    :before {
      margin-left: 4px;
      width: calc(var(--height) * 0.7);
      height: calc(var(--height));
      background-color: #997687;
      content: '';
      display: block;
      transform: skew(0deg, 24deg);
    }
  
    :after {
      margin-right: 4px;
      width: calc(var(--height) * 0.7);
      height: calc(var(--height));
      background-color: #997687;
      content: '';
      display: block;
      transform: skew(0deg, -24deg);
    }
  }
  .ribbon__title {
    height: var(--height);
    display: flex;
    border-radius: 8px;
    background-color: white;
    position: relative;
    z-index: 2;
    overflow: hidden;

    h2 {
      pading: 0;
      margin: auto;
      font-weight: normal;
      display: block;
      font-family: var(--fontFamilySecondary);
      font-size: 2.125rem;
      color: var(--primary);
    }
  }
`

export default RibbonStyled
