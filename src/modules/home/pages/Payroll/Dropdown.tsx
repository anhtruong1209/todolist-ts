import React, { CSSProperties, ChangeEventHandler } from "react"

interface Props {
  name: string | undefined
  value?: number
  onChange: ChangeEventHandler<HTMLSelectElement>
  list: string[]
  style: CSSProperties | undefined
}

const Dropdown = (props: Props) => {
  const { name, value, onChange, list, style } = props

  return (
    <div>
      <select
        className="form-select"
        name={name}
        value={value}
        aria-label="Floating label select example"
        onChange={onChange}
        style={style}
      >
        {list?.map((item) => (
          // eslint-disable-next-line react/jsx-key
          <option value={item}>{item}</option>
        ))}
      </select>
    </div>
  )
}

export default Dropdown
