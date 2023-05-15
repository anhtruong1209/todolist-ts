import React, { CSSProperties, useState } from "react"
import Button from "../../../common/components/Button"
import Input from "../../../common/components/Input"
import Dropdown from "./Dropdown"
import { IconButton } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import ModalComponent from "../../../common/components/Modal"
import ModolAddPayroll from "./Model/ModolAddPayroll"
import { listClient, listStatus } from "../HomePage/Data/data"
import { RootStateOrAny, useSelector } from "react-redux"
import ModalDeletePayroll from "./Model/ModalDeletePayroll"
import ModalDetailPayroll from "./Model/ModalDetailPayroll"

interface Props {
  loading: boolean
}

const Payroll = (props: Props) => {
  const { loading } = props
  const [openAddPayroll, setOpenAddPayroll] = useState(false)
  const [openDeletePayroll, setOpenDeletePayroll] = useState(false)
  const [openDetailPayroll, setOpenDetailPayroll] = useState(false)
  const listPayroll = useSelector((state: RootStateOrAny) => state.payroll?.payrollList)
  const [choosenId, setChoosenId] = useState<string>()
  const ads = () => {}

  const styleTable: CSSProperties | undefined = {
    border: "1px solid #dddddd",
    textAlign: "left",
    padding: "8px",
  }

  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "70%" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <p className="text-uppercase fs-3 fw-bold text-primary">payroll transactions list</p>
          </div>
          <div>
            <Button
              className="btn btn-primary"
              type="button"
              isLoading={loading}
              tagName="expoort"
              onClick={() => setOpenAddPayroll(true)}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            rowGap: "20px",
          }}
        >
          <div style={{ display: "flex", columnGap: "20px" }}>
            <Dropdown name={undefined} value={undefined} onChange={ads} list={listStatus} style={{ width: "150px" }} />
            <Dropdown name={undefined} value={undefined} onChange={ads} list={listClient} style={{ width: "150px" }} />
            <input type="date" id="start" name="trip-start" value="2018-07-22" style={{ width: "100%" }} />
            <input type="date" id="start" name="trip-start" value="2018-07-22" style={{ width: "100%" }} />
            <Input tagName=" " type="text" name="involce" value={undefined} onChange={ads} className="form" />
            <Button
              className="btn btn-outline-primary"
              type="button"
              isLoading={loading}
              tagName="apply"
              onClick={undefined}
            />
            <Button
              className="btn btn-outline-secondary"
              type="button"
              isLoading={loading}
              tagName="clear"
              onClick={undefined}
            />
          </div>
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <tr>
              <th style={styleTable}>Status</th>
              <th style={styleTable}>Date</th>
              <th style={styleTable}>Client</th>
              <th style={styleTable}>Currency</th>
              <th style={styleTable}>Total</th>
              <th style={styleTable}>Invoice#</th>
              <th></th>
            </tr>
            {listPayroll.map((item: any) => (
              <tr key={item?.invoice}>
                <td style={styleTable}>{item?.status}</td>
                <td style={styleTable}>{item?.date}</td>
                <td style={styleTable}>{item?.client}</td>
                <td style={styleTable}>{item?.currency}</td>
                <td style={styleTable}>{item?.total}</td>
                <td style={styleTable}>{item?.invoice}</td>
                <td style={styleTable}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Button
                      className="btn btn-outline-warning"
                      type="button"
                      isLoading={loading}
                      tagName="detail"
                      onClick={() => {
                        setOpenDetailPayroll(true)
                        setChoosenId(item?.invoice)
                      }}
                    />
                    <div>
                      <IconButton
                        onClick={() => {
                          setOpenDeletePayroll(true)
                          setChoosenId(item.invoice)
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
      <ModalComponent
        open={openAddPayroll}
        setOpen={setOpenAddPayroll}
        content={<ModolAddPayroll setOpen={setOpenAddPayroll} id={undefined} />}
      />
      <ModalComponent
        open={openDeletePayroll}
        setOpen={setOpenDeletePayroll}
        content={<ModalDeletePayroll setOpen={setOpenDeletePayroll} id={choosenId} />}
      />
      <ModalComponent
        open={openDetailPayroll}
        setOpen={setOpenDetailPayroll}
        content={<ModalDetailPayroll setOpen={setOpenDetailPayroll} id={choosenId} />}
      />
    </div>
  )
}

export default Payroll
