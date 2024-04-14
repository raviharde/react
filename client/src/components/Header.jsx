import { Button, Navbar, NavbarCollapse, NavbarLink, TextInput } from "flowbite-react"
import { Link, useLocation } from "react-router-dom"
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";

export const Header = () => {
    const path = useLocation().pathname;
  return (
    <Navbar className="border-b-2">
        <Link to="/">Blog</Link>
        <form>
            <TextInput type="text" placeholder="Search..." rightIcon={AiOutlineSearch} className="hidden lg:inline"/>
            
        </form>
        <Button className="w-12 h-10 lg:hidden" color='gray'>
            <AiOutlineSearch/>
        </Button>
        <div className="flex gap-2">
            <Button className="w-15 h-10 " color='gray' pill><FaMoon/></Button>
            <Link to="/signin">
                <Button gradientDuoTone='purpleToBlue'>
                    Signin
                </Button>
            </Link>
            <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
       
        <Navbar.Link active={path==="/about"}><Link to='/about'>About</Link></Navbar.Link>
      
      </Navbar.Collapse>
    </Navbar> 
  )
}
