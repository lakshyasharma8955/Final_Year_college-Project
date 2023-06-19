
const FormSidebar = ({ title, tag }) => {
    return (
        <div className="loginSidebar bg-pink-500 px-9 py-10 hidden sm:flex flex-col gap-4 w-2/5 justify-center items-center">
          <h1 className="font-medium text-white text-3xl">{title}</h1>
         <p className="text-gray-200 text-lg pr-2">{tag}</p>
        </div>
    )
}

export default FormSidebar