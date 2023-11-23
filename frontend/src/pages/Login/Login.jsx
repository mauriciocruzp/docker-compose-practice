import TextField from "../../components/TextField/TextField";
import Button from "../../components/Button/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import { login } from "../../api/services/auth";
import LoginSVG from "../../assets/svg/loggin.svg";
import { Link } from "react-router-dom";

const Login = () => {


  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Correo invalido").required("Requerido"),
    password: Yup.string().required("Requerido"),
  });

  const handleSubmit = async (values) => {
    console.log(values);
    const response = await login(values.email, values.password);
    console.log(response);
    if (response.data.status === true) {
      alert("Credenciales validas");
    } else {
      displayError("Credenciales invalidas");
    }
  };

  const displayError = (message) => {
    const errorsDiv = document.getElementById("errors");
    errorsDiv.textContent = message;
  };

  const onInputError = (error, touched) => {
    if (error && touched) {
      return "border-red-500";
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <div className="flex font-primary flex-col items-center justify-center h-screen p-4">
          <p className="text-3xl font-bold text-stone-950">Iniciar sesion</p>
          <img src={LoginSVG} alt="Login" className="w-full md:w-3/6 lg:w-1/5" />


          <div className="w-full max-w-sm mt-6">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div>
                <TextField
                  label="Correo Electronico"
                  name="email"
                  type="email"
                  placeholder="Correo Electronico"
                  width="w-full"
                  value={values.email}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  error={onInputError(errors.email, touched.email)}
                />
                {errors.email && touched.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
              <div>
                <TextField
                  label="Contraseña"
                  name="password"
                  type="password"
                  placeholder="Contraseña"
                  width="w-full"
                  value={values.password}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  error={onInputError(errors.password, touched.password)}
                />
                {errors.password && touched.password && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
              <div id="errors" className="text-red-500 text-sm"></div>

              <Button
                type="submit"
                label="Iniciar sesion"
                primary={false}
                size={"h-10"}
              />
            </form>

            <p className="text-sm mt-3 font-semibold text-stone-950">
              ¿No tienes una cuenta?{" "}
              <Link to="/register" className="text-primary-500 underline">
                Registrate aquí
              </Link>
            </p>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Login;
