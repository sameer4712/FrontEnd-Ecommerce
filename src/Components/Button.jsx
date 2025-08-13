
function Button({name,onClick}) {
    return (

        <button onClick={onClick} className="bg-blue-300 p-6 mt-7 ml-7 mb-7 text-lg 
        font-semibold rounded-2xl cursor-pointer shadow-xl hover:scale-105
         hover:bg-blue-400 transition-all duration-150 ease-in-out">
            {name}
        </button>
    )
}

export default Button