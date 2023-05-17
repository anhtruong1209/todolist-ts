import React, { useState } from "react"
import logo from "../../../logo-420-x-108.png"
import RegisterForm from "../components/RegisterForm"
import { ThunkDispatch } from "redux-thunk"
import { AppState } from "../../../redux/reducer"
import { Action } from "redux"
import { fetchThunk } from "../../common/redux/thunk"
import { API_PATHS } from "../../../configs/api"
import { RESPONSE_STATUS_SUCCESS } from "../../../utils/httpResponseCode"
import { setAuthorization } from "../redux/authReducer"
import { replace } from "connected-react-router"
import { ROUTES } from "../../../configs/routes"
import { useDispatch } from "react-redux"
import { IRegisterParams } from "../../../models/auth"

const RegisterPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()
  const [loading, setLoading] = useState(false)

  const onRegister = async (values: IRegisterParams) => {
    setLoading(true)
    const res = await dispatch(
      fetchThunk(API_PATHS.register, "post", {
        email: values.email,
        password: values.password,
        repeatPassword: values.repeatPassword,
        name: values.name,
        gender: values.gender,
        region: values.region,
        state: values.state,
      }),
    )
    if (res?.code === RESPONSE_STATUS_SUCCESS) {
      dispatch(setAuthorization(res.data))
      dispatch(replace(ROUTES.login))
      return
    }
    setLoading(false)
  }

  return (
    <div
      className="container"
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <img src={logo} alt="" style={{ maxWidth: "250px", marginBottom: "32px", marginTop: "150px" }} />

      <RegisterForm onRegister={onRegister} loading={loading} />
    </div>
  )
}

export default RegisterPage
