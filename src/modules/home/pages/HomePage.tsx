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
import { RootStateOrAny, useDispatch, useSelector } from "react-redux"
import ModalDeleteContent from "./Modal/ModalDeleteContent"
import ModalUpdateContent from "./Modal/ModalUpdateContent"
import { filterList } from "../../intl/redux/toDoListSlice"

interface Props {
  loading: boolean
}

const HomePage = (props: Props) => {
  const dispatch = useDispatch()
  const [openAddModal, setAddOpenModal] = useState(false)
  const [openDeleteModal, setDeleteOpenModal] = useState(false)
  const [openUpdateModal, setUpdateOpenModal] = useState(false)
  const { loading } = props
  const todolist = useSelector((state: RootStateOrAny) => state.todolist?.todoList)
  const [listCheck, setListCheck] = useState(todolist)
  const filterStatus = useSelector((state: RootStateOrAny) => state.todolist?.filterStatus)
  const [filter, setFilter] = useState(filterStatus)
  const [choosenId, setChoosenId] = useState<string>()

  const listFilter = [
    {
      value: 0,
      title: "All",
    },
    {
      value: 1,
      title: "Incomplete",
    },
    {
      value: 2,
      title: "Complete",
    },
  ]

  const handleOpenAddModal = () => {
    setAddOpenModal(true)
  }

  const onChangeChecked = (id: string, e: ChangeEvent<HTMLInputElement>) => {
    setListCheck((prev: any) =>
      prev?.map((el: any) => {
        return { ...el, status: el?.id === id ? e.target.checked : el?.status }
      }),
    )
    localStorage.setItem("todolist", JSON.stringify(listCheck))
  }

  const onChangeFilter = (e: any) => {
    setFilter(e.target.value)
    dispatch(filterList(e.target.value))
  }

  const filterTodo = [...todolist]
  filterTodo.filter((item: any) => {
    if (filterStatus === 0) {
      return true
    }
    return item.state === filterStatus
  })
  console.log(filterTodo)
  useEffect(() => {
    setListCheck(JSON.parse(localStorage.getItem("todolist") as string))
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
                <select className="form-select" value={filter} onChange={(e: any) => onChangeFilter(e)}>
                  {listFilter.map((item: any) => (
                    <option key={item.value} value={item.value}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div
              className="bg-warning  d-flex justify-content-center align-items-center p-3"
              style={{ marginTop: "20px", flexDirection: "column", rowGap: "30px" }}
            >
              {!loading && filterTodo && filterTodo.length > 0 ? (
                filterTodo?.map((item: any) => (
                  <div
                    className="bg-white text-dark d-flex align-items-center p-2 justify-content-between"
                    key={item?.id}
                    style={{ width: "80%", borderRadius: "10px" }}
                  >
                    <div className="d-flex align-items-center column-gap-2" style={{ flex: "1", columnGap: "20px" }}>
                      <Checkbox
                        type="checkbox"
                        value={item?.status}
                        id={item?.id}
                        forHtml={item?.id}
                        name="checkbox"
                        checked={item?.status}
                        onChange={(e) => {
                          onChangeChecked(item?.id, e)
                          // setChecked(item?.status)
                          console.log(item?.status)
                        }}
                        tagName="null"
                      />
                      <div className="d-flex justify-content-center">
                        <div>
                          {_.isEqual(item?.status, true) ? (
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
                        <IconButton
                          onClick={() => {
                            setUpdateOpenModal(true)
                            setChoosenId(item.id)
                            console.log(item.id)
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </div>
                      <div>
                        <IconButton
                          onClick={() => {
                            setDeleteOpenModal(true)
                            setChoosenId(item.id)
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <>asd</>
              )}
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
        content={<ModalAddContent setOpen={setAddOpenModal} id={undefined} />}
      />
      <ModalComponent
        open={openDeleteModal}
        setOpen={setDeleteOpenModal}
        content={<ModalDeleteContent setOpen={setDeleteOpenModal} id={choosenId} />}
      />
      <ModalComponent
        open={openUpdateModal}
        setOpen={setUpdateOpenModal}
        content={<ModalUpdateContent setOpen={setUpdateOpenModal} id={choosenId} />}
      />
    </div>
  )
}

export default HomePage
