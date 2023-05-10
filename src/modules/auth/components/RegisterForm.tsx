import React, { ChangeEvent, useEffect, useState } from "react"
import Input from "../../common/components/Input"
import Dropdown from "../../common/components/Dropdown"
import Button from "../../common/components/Button"
import { ROUTES } from "../../../configs/routes"
import { FormattedMessage } from "react-intl"
import { API_PATHS } from "../../../configs/api"
import { useDispatch } from "react-redux"
import { ThunkDispatch } from "redux-thunk"
import { AppState } from "../../../redux/reducer"
import { Action } from "redux"
import { fetchThunk } from "../../common/redux/thunk"
import { useFormik } from "formik"
import { registerSchema } from "../schema/Schema"
import { IRegisterParams } from "../../../models/auth"

interface Props {
  loading: boolean
  onRegister(values: IRegisterParams): void
}

const RegisterForm = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()
  const { loading, onRegister } = props
  const [listLocation, setListLocation] = useState<IRegisterParams[]>([])
  const [locationId, setLocationId] = useState<any | undefined>()
  const [cityId, setCityId] = useState<any | undefined>()
  const [listCity, setListCity] = useState<IRegisterParams[]>([])

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      repeatPassword: "",
      name: "",
      gender: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values: any) => {
      console.log(values)
      values.region = locationId
      values.state = cityId
      onRegister(values)
    },
  })

  const renderLocation = async () => {
    try {
      const res = await dispatch(fetchThunk(API_PATHS.location, "get"))
      setLocationId(res.data[0].id)
      setListLocation(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const renderCity = async (pid: IRegisterParams) => {
    try {
      const res = await dispatch(fetchThunk(API_PATHS.city + pid, "get"))
      setListCity(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    renderLocation()
  }, [])

  useEffect(() => {
    renderCity(locationId)
  }, [locationId])

  return (
    <div className="d-flex justify-content-md-center align-items-center">
      <form
        style={{ maxWidth: "560px", width: "100%" }}
        className="row g-3 needs-validation"
        onSubmit={formik.handleSubmit}
      >
        <div className="col-md-12">
          <Input tagName="email" type="text" name="email" value={formik.values.email} onChange={formik.handleChange} />
          {formik.errors.email && formik.touched.email && (
            <small className="text-danger">
              <FormattedMessage id={formik.errors.email} />
            </small>
          )}
        </div>
        <div className="col-md-12">
          <Input
            tagName="password"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password && formik.touched.password && (
            <small className="text-danger">
              <FormattedMessage id={formik.errors.password} />
            </small>
          )}
        </div>
        <div className="col-md-12">
          <Input
            tagName="re-password"
            type="password"
            name="repeatPassword"
            value={formik.values.repeatPassword}
            onChange={formik.handleChange}
          />
          {formik.errors.repeatPassword && formik.touched.repeatPassword && (
            <small className="text-danger">
              <FormattedMessage id={formik.errors.repeatPassword} />
            </small>
          )}
        </div>
        <div className="col-md-12">
          <Input tagName="name" type="text" name="name" value={formik.values.name} onChange={formik.handleChange} />
          {formik.errors.name && formik.touched.name && (
            <small className="text-danger">
              <FormattedMessage id={formik.errors.name} />
            </small>
          )}
        </div>
        <div className="col-md-12">
          <Dropdown
            labelName="country"
            name="region"
            list={listLocation}
            value={locationId}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setLocationId(e.target.value)}
          />
        </div>
        <div className="col-md-12">
          <Dropdown
            labelName="city"
            name="state"
            list={listCity}
            value={cityId}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setCityId(e.target.value)}
          />
        </div>
        <div className="col-md-12">
          <div className="form">
            <label htmlFor="inputEmail" className="form-label">
              <FormattedMessage id="gender" />
            </label>
            <select
              className="form-select"
              id="floatingSelect"
              name="gender"
              value={formik.values.gender}
              defaultValue={"male"}
              aria-label="Floating label select example"
              onChange={formik.handleChange}
            >
              <option value="male">Nam</option>
              <option value="female">Nu</option>
            </select>
          </div>
        </div>
        <div className="row justify-content-md-center" style={{ margin: "16px 0" }}>
          <Button
            className="btn btn-primary"
            type="submit"
            isLoading={loading}
            tagName="register"
            onClick={undefined}
          />
        </div>
        <div className="d-flex justify-content-md-center align-items-center">
          <a href={ROUTES.login}>
            <FormattedMessage id="cancel" />
          </a>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm
