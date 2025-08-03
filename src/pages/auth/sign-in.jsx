import { STATUSES } from "@/misc/statuses";
import { loginUser } from "@/store/authSlice";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";


export function SignIn() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const {status,token} = useSelector((state)=>state.auth)
  const {register,handleSubmit,formState:{errors}} = useForm()
  const handleLoginIn = async(data)=>{
     try {
     await dispatch(loginUser(data))
      if(status === STATUSES.SUCCESS && token){
          localStorage.setItem("token",token)                    // after suucessfull login setItem token in localStorage; response.data.token from response.data and token from backend
          toast.success("Admin loggedIn successfully")
          navigate("/dashboard/home")
            } else if(status === STATUSES.ERROR){
              toast.error("Invalid credentials")
            }
    } catch (error) {
      console.error(error);
       toast.error(error?.response?.data?.message || "Failed to log in. Please try again!");
    }
    
  }

  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to Sign In.</Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSubmit((data)=>{
          handleLoginIn(data)
          
        })}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
            </Typography>
            <Input
             {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                  message: "Enter a valid email address"
                }
              })}
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              error={!!errors.email}
            />
            {errors.email && (
              <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>
            )}
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
             {...register("password", {
                required: "Password is required"
              })}
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              error={!!errors.password}
            />
            {errors.password && (
             <span className="text-red-500 text-xs mt-1">{errors.password.message}</span>
            )}
          </div>

          <Button type="submit" className="mt-6" fullWidth>
            Sign In
          </Button>

          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Not registered?
            <Link to="/auth/sign-up" className="text-gray-900 ml-1">Create account</Link>
          </Typography>
        </form>

      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>

    </section>
  );
}

export default SignIn;
