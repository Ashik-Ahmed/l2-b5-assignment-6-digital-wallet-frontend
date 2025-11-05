import Logo from '@/assets/icons/Logo'
import { Link } from 'react-router'
import { RegisterForm } from '@/components/modules/Authentication/RegsiterForm'

const Register = () => {
    return (

        <div className="flex flex-col gap-4 p-6 md:p-10">
            <div className="flex justify-center gap-2 md:justify-start">
                <Link to="/" className="flex items-center gap-2 font-medium">
                    <Logo />
                </Link>
            </div>
            <div className="flex flex-1 items-center justify-center">
                <div className="w-full max-w-5xl border-2 p-4 rounded-xl bg-violet-100/40 shadow-lg">
                    <RegisterForm />
                </div>
            </div>
        </div>
    )
}

export default Register