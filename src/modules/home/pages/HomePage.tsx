import React, { ChangeEvent, useEffect, useState } from "react"
import { ROUTES } from "../../../configs/routes"
import { ACCESS_TOKEN_KEY } from "../../../utils/constants"
import Checkbox from "../../common/components/Checkbox"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import { IconButton } from "@mui/material"
import Button from "../../common/components/Button"
import _ from "lodash"
import ModalComponent from "../../common/components/Modal"
import ModalAddContent from "./Modal/ModalAddContent"
import { RootStateOrAny, useSelector } from "react-redux"
import ModalDeleteContent from "./Modal/ModalDeleteContent"

interface Props {
  loading: boolean
}

const HomePage = (props: Props) => {
  const [openAddModal, setAddOpenModal] = useState(false)
  const [openDeleteModal, setDeleteOpenModal] = useState(false)
  const { loading } = props
  const todolist = useSelector((state: RootStateOrAny) => state.todolist?.todoList)
  const [listCheck, setListCheck] = useState(todolist)
  const [choosenId, setChoosenId] = useState<string>()

  const handleOpenAddModal = () => {
    setAddOpenModal(true)
  }

  const handleChoosenId = (e: any) => {
    setDeleteOpenModal(true)
    setChoosenId(e.target.value)
    console.log(choosenId)
  }

  const onChangeChecked = (id: string, e: ChangeEvent<HTMLInputElement>) => {
    setListCheck((prev: any) =>
      prev?.map((el: any) => ({ ...el, value: el?.id === id ? e.target.checked : el?.value })),
    )
  }

  useEffect(() => {
    setListCheck(todolist)
  }, [todolist])

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
                onClick={handleOpenAddModal}
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
              {!loading &&
                listCheck?.map((item: any) => (
                  <div
                    className="bg-white text-dark d-flex align-items-center p-2 justify-content-between"
                    key={item?.id}
                    style={{ width: "80%", borderRadius: "10px" }}
                  >
                    <div className="d-flex align-items-center column-gap-2" style={{ flex: "1", columnGap: "20px" }}>
                      <Checkbox
                        type="checkbox"
                        value={item?.value}
                        id={item?.id}
                        forHtml={item?.id}
                        name="checkbox"
                        checked={item?.value}
                        onChange={(e) => onChangeChecked(item?.id, e)}
                        tagName="null"
                      />
                      <div className="d-flex justify-content-center">
                        <div>
                          {_.isEqual(item?.value, true) ? (
                            <>
                              <div className="fw-bold" style={{ textDecoration: "line-through" }}>
                                <p>{item?.plan}</p>
                              </div>
                              <div style={{ textDecoration: "line-through" }}>
                                <p>{item?.date}</p>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="fw-bold">
                                <p>{item?.plan}</p>
                              </div>
                              <div>
                                <p>{item?.date}</p>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="d-flex" style={{ flex: "1", justifyContent: "end", columnGap: "20px" }}>
                      <div>
                        <IconButton>
                          <EditIcon />
                        </IconButton>
                      </div>
                      <div>
                        <IconButton id={item?.id} onClick={handleChoosenId}>
                          <DeleteIcon />
                        </IconButton>
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
      <ModalComponent
        open={openAddModal}
        setOpen={setAddOpenModal}
        content={<ModalAddContent setOpen={setAddOpenModal} />}
      />
      <ModalComponent
        open={openDeleteModal}
        setOpen={setDeleteOpenModal}
        content={<ModalDeleteContent setOpen={setDeleteOpenModal} id={choosenId} />}
      />
    </div>
  )
}

export default HomePage
