import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, errors: signinErrors } = useAuth();

  const onSubmit = handleSubmit((data) => {
    signin({
      emailOrUsername: data.emailOrUsername,
      password: data.password
    });
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {signinErrors.length > 0 &&
          signinErrors.map((error, i) => (
            <div key={i} className="bg-red-500 text-white p-2 my-2">
              {error}
            </div>
          ))}
        <h1 className="text-2xl font-bold">Login</h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register("emailOrUsername", {
              required: "El correo o nombre de usuario es requerido",
              validate: (value) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (value.includes("@") && !emailRegex.test(value)) {
                  return "Formato de correo electrónico inválido";
                }
                return true;
              },
            })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Correo o nombre de usuario"
          />
          {errors.emailOrUsername && (
            <p className="text-red-500">{errors.emailOrUsername.message}</p>
          )}

          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="contraseña"
          />
          {errors.password && (
            <p className="text-red-500">La contraseña es requerida</p>
          )}

          <button
            type="submit"
            className="rounded-md bg-teal-500 px-3 py-2 my-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
