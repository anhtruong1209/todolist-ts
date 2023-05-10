import React, { ChangeEventHandler } from "react"
import { FormattedMessage } from "react-intl"
import { IRegisterParams } from "../../../models/auth"

interface Props {
  labelName: string
  name: string
  value?: number
  onChange: ChangeEventHandler<HTMLSelectElement>
  list: Array<IRegisterParams>
}

const Dropdown = (props: Props) => {
  const { value, onChange, list, labelName, name } = props

  return (
    <div className="form">
      <label htmlFor="inputEmail" className="form-label">
        <FormattedMessage id={labelName} />
      </label>
      <select
        className="form-select"
        name={name}
        value={value}
        aria-label="Floating label select example"
        onChange={onChange}
      >
        {list?.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Dropdown
