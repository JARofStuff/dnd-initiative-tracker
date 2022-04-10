import { useState, FormEvent, ChangeEvent } from 'react'
import { signUpWithEmailAndPassword } from '@utils/firebase/firebase.utils'
import { toast } from 'react-toastify'

const SignInForm = () => {
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    passwordMatch: '',
  })

  const { displayName, email, password, passwordMatch } = formData

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      }
    })
  }

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!displayName || !email || !password || !passwordMatch) {
      toast.error('Please fill out all the fields')
      return
    }

    if (password !== passwordMatch) {
      toast.error('Please make sure both password fields match')
      return
    }

    signUpWithEmailAndPassword(email, password, displayName)
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <input
        type='text'
        id='sign-up-displayName'
        name='displayName'
        value={displayName}
        placeholder='Name'
        required
        onChange={onChangeHandler}
      />
      <input
        type='email'
        id='sign-up-email'
        name='email'
        value={email}
        placeholder='Email'
        required
        onChange={onChangeHandler}
      />
      <input
        type='password'
        id='sign-up-password'
        name='password'
        value={password}
        placeholder='Password'
        required
        onChange={onChangeHandler}
      />
      <input
        type='password'
        id='passwordMatch'
        name='passwordMatch'
        value={passwordMatch}
        placeholder='Confirm Password'
        required
        onChange={onChangeHandler}
      />
      <button className='btn'>Sign Up</button>
    </form>
  )
}

export default SignInForm
