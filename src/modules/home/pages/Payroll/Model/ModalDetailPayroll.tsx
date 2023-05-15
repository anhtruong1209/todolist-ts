import React from "react"
import { FormattedMessage } from "react-intl"
import { IModal } from "../../../../../models/user"

const ModalDetailPayroll = (props: IModal) => {
  const { id } = props
  const dataLocal = JSON.parse(localStorage.getItem("payroll") as string) || []
  const newObj = dataLocal.find((item: any) => item.invoice === id)

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <div>
          <div>
            {" "}
            <label htmlFor="inputEmail" className="form-label fw-bold">
              <FormattedMessage id="invoice" />
            </label>
          </div>
          <div>
            <label htmlFor="inputEmail" className="form-label">
              {newObj?.invoice}
            </label>
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="inputEmail" className="form-label fw-bold">
              <FormattedMessage id="client" />
            </label>
          </div>
          <div>
            <label htmlFor="inputEmail" className="form-label">
              {newObj?.client}
            </label>
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="inputEmail" className="form-label fw-bold">
              <FormattedMessage id="total" />
            </label>
          </div>
          <div>
            <label htmlFor="inputEmail" className="form-label">
              {newObj?.total + " " + newObj?.currency}
            </label>
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="inputEmail" className="form-label fw-bold">
              <FormattedMessage id="date" />
            </label>
          </div>
          <div>
            <label htmlFor="inputEmail" className="form-label">
              {newObj?.date}
            </label>
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="inputEmail" className="form-label fw-bold">
              <FormattedMessage id="status" />
            </label>
          </div>
          <div>
            <label htmlFor="inputEmail" className="form-label">
              {newObj?.status}
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalDetailPayroll
