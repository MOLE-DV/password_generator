import icon from '../Icons/key-svgrepo-com.svg'

const Header = () => {
    return (
        <div id="header">
            <div id="title">
                <img className='icon' src={icon} />
                KeyForge
            </div>
        </div>
    )
}

export default Header