import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/shared/InputField";
import { AiOutlineLogin } from "react-icons/ai";
import { authenticateSignInUser } from "../redux/actions/AuthAction";
import Spinners from "../components/shared/Spinners";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const loginHandler = async (data) => {
    dispatch(authenticateSignInUser(data, toast, reset, navigate, setLoader));
  };

  return (
    <div className="bg-bg-primary h-screen flex flex-col justify-center items-center">
      <div className="flex font-PlaywritePl font-extrabold text-[6vh] mb-5 justify-center items-center text-white z-50">
        PingPod
      </div>
      <form
        onSubmit={handleSubmit(loginHandler)}
        className="sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-md  bg-gray-50"
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <AiOutlineLogin className="text-text-primary  text-5xl" />
          {/* <img src={appLogo} className="h-24" /> */}
          <h1 className="text-text-primary text-center font-montserrat lg:text-3xl text-2xl font-bold">
            Login Here
          </h1>
        </div>
        <hr className="mt-2 mb-5 text-text-inverted" />
        <div className="flex flex-col gap-3">
          <InputField
            label="UserName"
            required
            id="username"
            type="text"
            message="*UserName is required"
            placeholder="Enter your username"
            register={register}
            errors={errors}
          />

          <InputField
            label="Password"
            required
            id="password"
            type="password"
            message="*Password is required"
            placeholder="Enter your password"
            register={register}
            errors={errors}
          />

          <button
            disabled={loader}
            className="bg-button-gradient flex gap-2 items-center justify-center font-semibold text-white w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-xs my-3"
            type="submit"
          >
            {loader ? (
              <>
                <Spinners /> Logging in...
              </>
            ) : (
              <>Login</>
            )}
          </button>
        </div>

        <p className="text-center text-sm text-slate-700 mt-6">
          Don't have an account?
          <Link
            className="font-semibold underline hover:text-black"
            to="/register"
          >
            <span> SignUp</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
