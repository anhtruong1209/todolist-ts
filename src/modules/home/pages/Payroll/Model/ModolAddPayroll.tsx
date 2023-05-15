import React, { ChangeEvent, useState } from "react"
import Dropdown from "../Dropdown"
import { listClient, listStatus } from "../../HomePage/Data/data"
import Input from "../../../../common/components/Input"
import Button from "../../../../common/components/Button"
import { useFormik } from "formik"
import { addPayroll } from "../../../../intl/redux/payrollSlice"
import moment from "moment"
import { v4 as uuidv4 } from "uuid"
import { IModal } from "../../../../../models/user"
import { useDispatch } from "react-redux"

const ModolAddPayroll = (props: IModal) => {
  const { setOpen } = props
  const dispatch = useDispatch()
  const [status, setStatus] = useState<any | undefined>()
  const [client, setClient] = useState<any | undefined>()
  const [date, setDate] = useState<any | undefined>()
  const formik = useFormik({
    initialValues: {
      invoice: uuidv4(),
      currency: "",
      total: "",
    },
    // validationSchema: registerSchema,
    onSubmit: (values: any) => {
      values.date = moment(date.$d).format("DD MMM YYYY")
      values.status = status
      values.client = client
      dispatch(addPayroll(values))
      setOpen(false)
    },
  })

  return (
    <div>
      <form
        style={{ maxWidth: "560px", width: "100%" }}
        className="row g-3 needs-validation"
        onSubmit={formik.handleSubmit}
      >
        <div className="col-md-12">
          <Dropdown
            name="status"
            value={status}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value)}
            list={listStatus}
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-12">
          <Dropdown
            name="client"
            value={client}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setClient(e.target.value)}
            list={listClient}
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-12">
          <input
            className="form-control"
            type="date"
            id="start"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="col-md-12">
          <Input
            tagName={"Currency"}
            type="text"
            name="currency"
            value={formik.values.currency}
            onChange={formik.handleChange}
            className="form-control"
          />
        </div>
        <div className="col-md-12">
          <Input
            tagName={"Total"}
            type="text"
            name="total"
            value={formik.values.total}
            onChange={formik.handleChange}
            className="form-control"
          />
        </div>
        <div className="col-md-12">
          <Button
            className="btn btn-outline-warning"
            type="submit"
            isLoading={false}
            tagName="addPayroll"
            onClick={undefined}
          />
        </div>
      </form>
    </div>
  )
}

export default ModolAddPayroll
