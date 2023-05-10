import React, { ChangeEventHandler } from "react"
import { FormattedMessage } from "react-intl"

interface Props {
  forHtml: string
  id: string
  checked: boolean
  tagName: string
  type: string
  name: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

const Checkbox = (props: Props) => {
  const { type, name, value, onChange, tagName, checked, id, forHtml } = props
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type={type}
        id={id}
        value={value}
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <label className="form-check-label" htmlFor={forHtml}>
        <FormattedMessage id={tagName} />
      </label>
    </div>
  )
}

export default Checkbox
