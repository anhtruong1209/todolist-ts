import React from "react"
import { IModal } from "../../../../../models/user"
import { useDispatch } from "react-redux"
import { deletePayroll } from "../../../../intl/redux/payrollSlice"
import { FormattedMessage } from "react-intl"
import Button from "../../../../common/components/Button"

const ModalDeletePayroll = (props: IModal) => {
  const { setOpen, id } = props
  const dispatch = useDispatch()
  const handleCloseModal = () => {
    setOpen(false)
  }

  const handleDelete = () => {
    dispatch(deletePayroll(id))
    setOpen(false)
  }

  return (
    <div>
      <label htmlFor="inputEmail" className="form-label">
        <FormattedMessage id="confirmDelete" />
      </label>
      <div style={{ display: "flex", columnGap: "20px", marginTop: "20px" }}>
        <Button className="btn btn-light" type="button" isLoading={false} tagName="cancel" onClick={handleCloseModal} />
        <Button className="btn btn-primary" type="button" isLoading={false} tagName="delete" onClick={handleDelete} />
      </div>
    </div>
  )
}

export default ModalDeletePayroll
