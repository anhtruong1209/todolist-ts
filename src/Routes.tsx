import React, { lazy, Suspense } from "react"
import { Route, Switch, useLocation } from "react-router-dom"
import { ROUTES } from "./configs/routes"
import ProtectedRoute from "./modules/common/components/ProtectedRoute"

const HomePage = lazy(() => import("./modules/home/pages/HomePage/HomePage"))
const ContactPage = lazy(() => import("./modules/home/pages/ContactPage"))
const LoginPage = lazy(() => import("./modules/auth/pages/LoginPage"))
const DetailPage = lazy(() => import("./modules/home/pages/Detail/DetailPage"))
const RegisterPage = lazy(() => import("./modules/auth/pages/RegisterPage"))
const Payroll = lazy(() => import("./modules/home/pages/Payroll/Payroll"))

export const Routes = () => {
  const location = useLocation()

  return (
    <Suspense fallback={<div>Loading.....</div>}>
      <Switch location={location}>
        <Route path={ROUTES.login} component={LoginPage} />
        <ProtectedRoute path={ROUTES.home} component={HomePage} />
        <ProtectedRoute path={ROUTES.profile} component={DetailPage} />
        <ProtectedRoute path={ROUTES.payroll} component={Payroll} />
        <Route path={ROUTES.contact} component={ContactPage} />
        <Route path={ROUTES.register} component={RegisterPage} />
        <Route path={`${ROUTES.detail}/:id`} component={DetailPage} />
        <Route path="/" component={LoginPage} />
      </Switch>
    </Suspense>
  )
}
