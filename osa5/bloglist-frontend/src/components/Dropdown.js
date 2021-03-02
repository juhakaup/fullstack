import React, {useState} from 'react'

const Dropdown = (props) => {
  const [visible, setVisible] = useState(false)
  const [label, setLabel] = useState('view')

  const showWhenVisible = { display: visible ? '' : 'none'}

  const toggleVisibility = () => {
    setVisible(!visible)
    setLabel(label === 'view' ? 'hide' : 'view')
  }

  return (
    <div>
      {props.title }<button onClick={toggleVisibility}>{label}</button>
      <div style={showWhenVisible}>
        {props.children}
      </div>
    </div>
  )

}

export default Dropdown