import React from "react"
import Button from "../../../common/components/Button"
import Input from "../../../common/components/Input"
import { IModal } from "../../../../models/user"
import { useFormik } from "formik"
import { addTodoListSchema } from "../../../auth/schema/Schema"
import moment from "moment"
import { updateTodo } from "../../../intl/redux/toDoListSlice"
import { useDispatch } from "react-redux"
import { FormattedMessage } from "react-intl"

const ModalUpdateContent = (props: IModal) => {
  const { setOpen, id } = props
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      plan: "",
    },
    validationSchema: addTodoListSchema,
    onSubmit: (values: any) => {
      values.id = id
      values.date = moment().format("h:mm A, DD/MM/YYYY ")
      dispatch(updateTodo(values))
      setOpen(false)
    },
  })
  return (
    <div>
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
          <Button
            className="btn btn-primary float-end"
            type="submit"
            isLoading={false}
            tagName="updateTask"
            onClick={undefined}
          />
        </form>
      </div>
    </div>
  )
}

export default ModalUpdateContent
