import React from "react"
import Input from "../../../common/components/Input"
import Button from "../../../common/components/Button"
import { FormattedMessage } from "react-intl"
import { useFormik } from "formik"
import { addTodoListSchema } from "../../../auth/schema/Schema"
import { addTodo } from "../../../intl/redux/toDoListSlice"
import { useDispatch } from "react-redux"
import moment from "moment"
import { v4 as uuidv4 } from "uuid"
import { IModal } from "../../../../models/user"

const ModalAddContent = (props: IModal) => {
  const { setOpen } = props
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      id: uuidv4(),
      plan: "",
      status: false,
    },
    validationSchema: addTodoListSchema,
    onSubmit: (values: any) => {
      values.date = moment().format("h:mm A, DD/MM/YYYY ")
      dispatch(addTodo(values))
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
        <Input tagName="plan" type="text" name="plan" value={formik.values.plan} onChange={formik.handleChange} />
        {formik.errors.plan && formik.touched.plan && (
          <small className="text-danger">
            <FormattedMessage id={formik.errors.plan} />
          </small>
        )}
        {/* <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label={<FormattedMessage id={"estimate"} />} className="w-100" name="date" />
          </LocalizationProvider>
        </div> */}
        <Button
          className="btn btn-primary float-end"
          type="submit"
          isLoading={false}
          tagName="addTask"
          onClick={undefined}
        />
      </form>
    </div>
  )
}

export default ModalAddContent
