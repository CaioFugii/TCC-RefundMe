import React, { useEffect, useState } from "react";
import { useForm } from "../hooks";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { Login as LoginModel, ApplicationState } from "../models";
import { login as loginAction } from "../store/ducks/login/actions";
import { Button, Input, Form } from "semantic-ui-react";
import DeviceDetector from "device-detector-js";

import Logo from "../assets/images/lgo-allinvestx.png";
import { DetectorDevice } from "../helper/deviceDetector";
import { DeviceInfo } from "../models/DeviceInfo";

const Login: React.FC = (props: any) => {
  const { login } = useSelector((state: ApplicationState) => state);
  const { data } = useSelector((state: ApplicationState) => state.account);

  const [initialLogin, setInitialLogin] = useState<Record<string, any>>();

  const formSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required()
  });

  const [isValid, isValidSet] = useState(false);

  const { handleChange, handleSubmit, values } = useForm(
    initialLogin,
    formSchema
  );

  const dispatch = useDispatch();

  useEffect(() => {
    isFormValid();
  }, [values]);

  useEffect(() => {
    setInitialLogin({
      username: "",
      password: ""
    });
  }, []);

  useEffect(() => {
    if (login.isLoggedIn) {
      props.history.push("/expenses-refunds");
    }
  }, [login.isLoggedIn, props.history]);

  const handleLogin = async (data: Record<string, any>) => {
    const device: DeviceInfo = DetectorDevice();
    data.deviceInfo = device;
    console.log(data);
    await dispatch(loginAction(data as LoginModel));
  };

  // console.log(data);

  const isFormValid = async () => {
    let valid;
    try {
      valid = await formSchema.isValid(values);
    } catch (error) {
      valid = false;
    }
    if (valid) {
      isValidSet(true);
    }
  };

  return (
    <section className="login">
      <div className="login-content-center">
        <div className="login-box">
          <div className="login-logo">
            <img src={Logo} alt="Stark Reembolso" />
          </div>
          <Form onSubmit={handleSubmit(handleLogin)}>
            <div className="login-form-group">
              <label htmlFor="input-username">Usuário:</label>
              <Input
                type="text"
                className="login-input"
                onChange={handleChange}
                name="username"
                id="input-username"
              />
            </div>
            <div className="login-form-group">
              <label htmlFor="input-password">Senha:</label>
              <Input
                type="password"
                className="login-input"
                onChange={handleChange}
                name="password"
                id="input-password"
              />
            </div>
            <div className="login-form-group">
              <Button
                className={`login-button ${
                  login.loading || !isValid ? "loading" : ""
                }`}
                disabled={login.loading || !isValid}
              >
                Login
              </Button>
              {login.error && (
                <span className="text-validation" style={{ left: 0, right: 0 }}>
                  Incorrect user and/or password(s).
                </span>
              )}
            </div>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Login;
