import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { IoLogoBuffer } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";

// FormHandling Imports
import { AuthSchema } from "@/schema/AuthSchema";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { axios_instance } from "@/services/Api";

// Navigation to Pages
import { useNavigate } from "react-router-dom";

type FormData = z.infer<typeof AuthSchema>;
export default function LoginForm({onLogin}:{onLogin: (token: string) => void}) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(AuthSchema) });

  //   const [authenticated, setAuthenticated] = useState(false);
  const onSubmit = (data: FormData) => {
    axios_instance
      .post(
        "login/",
        {
          username: data.username,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        localStorage.setItem("authToken", response.data.token);
        onLogin(response.data.token);
        navigate("/home/", { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="flex pt-24 md:h-screen md:pb-24">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex justify-center w-full self-center"
        >
          <div className="flex flex-col gap-3 md:w-[45%] xl:w-[30%] 2xl:w-[25%] md:py-24 md:px-10 md:border-y-1 md:border-l-1 md:rounded-l-sm">
            <div className="flex flex-col w-full items-center">
              <FaRegUserCircle className="text-5xl" />
              <Label className="text-2xl">Welcome Back</Label>
              <p className="text-gray-400">
                Login to Clerk Processor System Account
              </p>
            </div>
            <Label>Username</Label>
            <Input
              {...register("username")}
              type="text"
              placeholder="Username"
            />
            {errors.username && (
              <p className="text-red-600 text-sm">{errors.username.message}.</p>
            )}
            <div className="flex justify-between">
              <Label>Password</Label>
              <Label className="font-normal">
                <a href="" className="hover:underline">
                  Forgot password?
                </a>
              </Label>
            </div>
            <Input {...register("password")} type="password" />
            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password.message}.</p>
            )}
            <Button>Login</Button>
          </div>
          <div className="hidden md:w-[45%] xl:w-[30%] 2xl:w-[25%] md:bg-black md:border-y-1 md:border-r-1 md:rounded-r-sm md:flex md:justify-center md:items-center">
            <IoLogoBuffer className="text-9xl text-white" />
          </div>
        </form>
      </div>
    </>
  );
}
