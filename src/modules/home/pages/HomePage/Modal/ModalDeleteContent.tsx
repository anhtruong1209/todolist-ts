import React from "react"
import { FormattedMessage } from "react-intl"
import Button from "../../../../common/components/Button"
import { deleteTodo } from "../../../../intl/redux/toDoListSlice"
import { useDispatch } from "react-redux"
import { IModal } from "../../../../../models/user"

const ModalDeleteContent = (props: IModal) => {
  const { setOpen, id } = props
  const dispatch = useDispatch()

  const handleCloseModal = () => {
    setOpen(false)
  }

  const handleDelete = () => {
    setOpen(false)
    dispatch(deleteTodo(id))
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

export default ModalDeleteContent
