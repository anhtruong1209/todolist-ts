import React, { ChangeEvent, useState } from "react"
import { ROUTES } from "../../../configs/routes"
import { ACCESS_TOKEN_KEY } from "../../../utils/constants"
import Checkbox from "../../common/components/Checkbox"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import Button from "../../common/components/Button"
import _ from "lodash"
import ModalComponent from "../../common/components/Modal"
import ModalAddContent from "./Modal/ModalAddContent"

interface Props {
  loading: boolean
}

const HomePage = (props: Props) => {
  const [open, setOpen] = useState(false)
  const { loading } = props
  const [checked, setChecked] = useState(false)
  const [listCheck, setListCheck] = useState(Array<[]>)

  const list: any = [
    {
      id: "asd",
      asd: "alo",
      asd1: "ngu",
      value: checked,
    },
    {
      id: "3",
      asd: "s",
      asd1: "ngu",
      value: checked,
    },
    {
      id: "2",
      asd: "alo",
      asd1: "ngu",
      value: checked,
    },
  ]

  const handleOpenModal = () => {
    setOpen(true)
  }

  const onChangeChecked = (id: string, e: ChangeEvent<HTMLInputElement>) => {
    setListCheck((listChecked) =>
      listChecked?.map((el: any) => ({ ...el, checked: el?.id === id ? e.target.checked : el?.value })),
    )
  }

  // const onChangeChecked = () => {
  //   if (_.isEqual(checked, false)) {
  //     setChecked(true)
  //   } else {
  //     setChecked(false)
  //   }
  // }

  console.log(list.value)

  const handleLogOut = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
  }

  return (
    <div className="d-flex justify-content-md-center align-items-center">
      <div className="w-75">
        <div className="d-flex flex-column justify-content-md-center align-items-center gap-3">
          <div>
            <p className="text-uppercase fs-1 fw-bold text-primary">todo app</p>
          </div>
          <div>
            <img
              src="https://ionicframework.com/docs/icons/logo-react-icon.png"
              alt="logo react"
              width="70"
              height="70"
            />
          </div>
          <div className="w-100">
            <div className="d-flex justify-content-between">
              <Button
                className="btn btn-primary"
                type="button"
                isLoading={loading}
                tagName="addTask"
                onClick={handleOpenModal}
              />
              <div style={{ width: "10%" }}>
                <select
                  className="form-select"
                  // name={name}
                  // value={value}
                  // aria-label="Floating label select example"
                  // onChange={onChange}
                >
                  <option value="asasass">asd</option>
                  <option value="asasass">asd</option>
                  <option value="asasass">asd</option>
                </select>
              </div>
            </div>
            <div
              className="bg-warning  d-flex justify-content-center align-items-center p-3"
              style={{ marginTop: "20px", flexDirection: "column", rowGap: "30px" }}
            >
              {list?.map((item: any) => (
                <div
                  className="bg-white text-dark d-flex align-items-center p-2 justify-content-between"
                  key={item.id}
                  style={{ width: "80%", borderRadius: "10px" }}
                >
                  <div className="d-flex align-items-center column-gap-2" style={{ flex: "1", columnGap: "20px" }}>
                    <Checkbox
                      type="checkbox"
                      value={item.value}
                      id={item.id}
                      forHtml={item.id}
                      name="checkbox"
                      checked={checked}
                      onChange={(e) => onChangeChecked(item.id, e)}
                      tagName="null"
                    />
                    <div className="d-flex justify-content-center">
                      <div>
                        {_.isEqual(checked, true) ? (
                          <>
                            <div className="fw-bold" style={{ textDecoration: "line-through" }}>
                              <p>{item.asd}</p>
                            </div>
                            <div style={{ textDecoration: "line-through" }}>
                              <p>{item.asd1}</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="fw-bold">
                              <p>{item.asd}</p>
                            </div>
                            <div>
                              <p>{item.asd1}</p>
                            </div>
                          </>
                        )}

                        {/* {_.isEqual(checked, true) ? (
                          <div className="fw-bold" style={{ textDecoration: "line-through" }}>
                            <p>asdasdsadsadsa</p>
                          </div>
                        ) : (
                          <div className="fw-bold">
                            <p>asdasdsadsadsa</p>
                          </div>
                        )}
                        {_.isEqual(checked, true) ? (
                          <div style={{ textDecoration: "line-through" }}>
                            <p>asd</p>
                          </div>
                        ) : (
                          <div>
                            <p>asd</p>
                          </div>
                        )} */}
                      </div>
                    </div>
                  </div>
                  <div className="d-flex" style={{ flex: "1", justifyContent: "end", columnGap: "20px" }}>
                    <div>
                      <EditIcon />
                    </div>
                    <div>
                      <DeleteIcon />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <a href={ROUTES.login} onClick={handleLogOut}>
            Log out
          </a>
        </div>
      </div>
      <ModalComponent open={open} setOpen={setOpen} content={<ModalAddContent />} />
    </div>
  )
}

export default HomePage
