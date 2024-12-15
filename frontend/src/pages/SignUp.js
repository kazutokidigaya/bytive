import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "../components/Loading";

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { signupUser } = useContext(AuthContext);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await signupUser(data);
      setLoading(false);
      toast.success("Signup successful! Welcome 🎉");
      navigate("/tasks");
    } catch (err) {
      setLoading(false);
      console.error(err?.response?.data?.message);
      toast.error(
        err?.response?.data?.message || "Signup failed. Try again later."
      );
    }
  };

  return (
    <>
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <div className="w-[100vw] h-[100vh] flex justify-center items-center flex-col bg-black">
          <div className="bg-white p-6 rounded-lg flex flex-col gap-6">
            <p className="text-xl font-bold text-gray-700">Please Sign-Up</p>
            <form className="max-w-sm mx-auto min-w-[250px] sm:min-w-[360px]">
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Jason"
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  value={data.name}
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  Your email
                </label>
                <input
                  type="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="jason@gmail.com"
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  value={data.email}
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  Your password
                </label>
                <input
                  type="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="******"
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  value={data.password}
                  required
                />
              </div>

              <button
                onClick={handleSignUp}
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5"
              >
                Submit
              </button>
              <div className="flex flex-col gap-4 pt-8 px-4 justify-between items-center">
                <hr className="w-28" />
                <p
                  className="cursor-pointer text-sm text-gray-700"
                  onClick={() => navigate("/login")}
                >
                  Already a user? Please Log-In
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
