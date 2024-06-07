import { Link } from 'react-router-dom'


const Header = () => {

    return (
        <div className='bg-slate-50'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <Link to='/'>
                    <h1 className='font-bold'>UniExchange</h1>
                </Link>

                <ul className='flex gap-4'>
                    <Link to='/'>
                        <li>Home</li>
                    </Link>
                    <Link to='/about'>
                        <li>About</li>
                    </Link>
                    <Link to='/sign-up'>
                        <li>Sign Up</li>
                    </Link>
                </ul>
            </div>
        </div>
    )
}

export default Header