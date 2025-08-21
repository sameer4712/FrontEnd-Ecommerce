function SignUp() {
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form className="bg-white p-8 rounded-2xl shadow-md w-96 ">
                <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>

                <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full p-2 mb-4 border border-gray-400 outline-none  rounded-lg"
                    required
                />

                <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full p-2 mb-4 border border-gray-400 outline-none  rounded-lg"
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 mb-4 border border-gray-400 outline-none  rounded-lg"
                    required
                />

                <input
                    type="file"
                    accept="image/*"
                    className="w-full p-2 mb-4 border border-gray-400 rounded-lg"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 mt-3 transition-all duration-150 "
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
}

export default SignUp;
