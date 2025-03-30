import { Link } from "react-router-dom"
import logo from '../../assets/logo.png'
import profile from '../../assets/profile.webp'
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
const Navbar = () => {
    return (
        <div className="h-16 z-10 border-b bg-white flex justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mx-8">
                <div className="">
                    <Link to={'/'}>
                        <img src={logo} className="h-10" alt="Logo" />
                    </Link>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <img 
                        src={profile}
                        alt="Profile"
                        className="h-8 w-8 rounded-full object-cover"
                    />
                    <div className="hidden sm:flex sm:flex-col sm:text-sm">
                        <span className="font-medium text-black">Harish Manzar</span>
                        <span className="text-xs text-gray-500">harishmanzar@gmail.com</span>
                    </div>
                    <div><ArrowDropDownIcon fontSize="small" sx={{ mt: -1 }} /></div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
