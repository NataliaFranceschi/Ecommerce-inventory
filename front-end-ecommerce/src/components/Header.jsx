import React, {useContext} from 'react'
import { AiFillHome } from "react-icons/ai";
import { MdAddCircle } from "react-icons/md";
import { RiLoginBoxFill } from "react-icons/ri";
import '../style/header.scss'
import Logo from '../logoBranco.png'
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import ecommerceContext from '../context/ecommerceContext';
import Filter from './Filter';

function Header() {
    const navigate = useNavigate();
    const { setCreateEdit, setProductId } = useContext(ecommerceContext)

    const add = () => {
        setProductId("");
        setCreateEdit(true);
    }

    const endSession = () => {
        navigate('/')
        localStorage.clear();
    }

    return (
        <div className='header'>
        <img src={Logo} alt='logo'/>
        <SearchBar/>
        <div className='icon'>
            <Filter />
            <button  type='button' onClick={add} >
            <MdAddCircle />
            </button>
            <button  type='button' onClick={() => setCreateEdit(false)} >
            <AiFillHome />
            </button>
            <button  type='button' onClick={endSession} >
            <RiLoginBoxFill />
            </button>
        </div>  
        </div>
    )
}

export default Header