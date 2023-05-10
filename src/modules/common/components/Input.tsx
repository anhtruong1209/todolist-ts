import React from "react"
import { ChangeEventHandler } from "react"
import { FormattedMessage } from "react-intl"

interface Props {
  tagName: string
  type: string
  name: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

const Input = (props: Props) => {
  const { type, name, value, onChange, tagName } = props
  return (
    <div>
      <label htmlFor="inputEmail" className="form-label">
        <FormattedMessage id={tagName} />
      </label>
      <input type={type} className="form-control" name={name} value={value} onChange={onChange} />
    </div>
  )
}

export default Input
