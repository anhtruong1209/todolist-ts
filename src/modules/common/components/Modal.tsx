import React from "react"
import { Box } from "@mui/material"
import Modal from "@mui/material/Modal"

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
}

interface Props {
  open: boolean
  setOpen(value: boolean): void
  content: any
}

const ModalComponent = (props: Props) => {
  const { open, setOpen, content } = props
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{content}</Box>
      </Modal>
    </div>
  )
}

export default ModalComponent
