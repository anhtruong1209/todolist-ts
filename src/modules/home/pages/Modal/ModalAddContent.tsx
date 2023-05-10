import React from "react"
import Input from "../../../common/components/Input"
import Button from "../../../common/components/Button"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { FormattedMessage } from "react-intl"

const ModalAddContent = () => {
  const asd = () => {}
  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "30px" }}>
      <Input tagName="plan" type="text" name="asd" value="asd" onChange={asd} />
      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label={<FormattedMessage id={"estimate"} />} className="w-100" />
        </LocalizationProvider>
      </div>
      <Button className="btn btn-primary float-end" type="button" isLoading={false} tagName="addTask" onClick={asd} />
    </div>
  )
}

export default ModalAddContent
