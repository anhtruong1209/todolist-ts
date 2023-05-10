import React from "react"
import { FormattedMessage } from "react-intl"
import { ILoginParams } from "../../../models/auth"
import { useFormik } from "formik"
import Input from "../../common/components/Input"
import Checkbox from "../../common/components/Checkbox"
import Button from "../../common/components/Button"
import { ROUTES } from "../../../configs/routes"
import { loginSchema } from "../schema/Schema"

interface Props {
  onLogin(values: ILoginParams): void
  loading: boolean
  errorMessage: string
}

const LoginForm = (props: Props) => {
  const { onLogin, loading, errorMessage } = props

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validationSchema: loginSchema,
    onSubmit: (values: any) => {
      console.log(values)
      onLogin(values)
    },
  })

  return (
    <form
      style={{ maxWidth: "560px", width: "100%" }}
      noValidate
      onSubmit={formik.handleSubmit}
      className="row g-3 needs-validation"
    >
      {!!errorMessage && (
        <div className="alert alert-danger" role="alert" style={{ width: "100%" }}>
          {errorMessage}
        </div>
      )}

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

      <div className="col-12">
        <Checkbox
          id=""
          forHtml=""
          type="checkbox"
          value=""
          name="remember"
          checked={formik.values.remember}
          onChange={formik.handleChange}
          tagName="rememberMe"
        />
      </div>

      <div className="row justify-content-md-center" style={{ margin: "16px 0" }}>
        <Button className="btn btn-primary" type="submit" isLoading={loading} tagName="login" onClick={undefined} />
      </div>
      <div className="d-flex justify-content-md-center align-items-center">
        <a href={ROUTES.register}>
          <FormattedMessage id="register" />
        </a>
      </div>
    </form>
  )
}

export default LoginForm
