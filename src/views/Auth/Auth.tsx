import SignUpForm from '@/components/SignUpForm/SignUpForm'
import SignInForm from '@/components/SignInForm/SignInForm'

const Auth = () => {
  return (
    <div>
      <div className=''>
        <h1>Sign Up</h1>
        <SignUpForm />
      </div>
      <div>
        <h1>Sign In</h1>
        <SignInForm />
      </div>
    </div>
  )
}
export default Auth
