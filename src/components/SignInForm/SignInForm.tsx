import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
import {
  signInAuthUserWithEmailAndPassword,
  signInWithGoogleRedirect,
  catchGoogleSignInRedirect,
} from '@utils/firebase/firebase.utils'
import { toast } from 'react-toastify'

const SignUpForm = () => {
  // const navigateTo = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  useEffect(() => {
    catchGoogleSignInRedirect()
  }, [])

  const onChangeHandler = (e) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      }
    })
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error('Please fill out all the fields')
      return
    }

    signInAuthUserWithEmailAndPassword(email, password)
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <input
        type='email'
        id='sign-in-email'
        name='email'
        value={email}
        placeholder='Email'
        required
        onChange={onChangeHandler}
      />
      <input
        type='password'
        id='sign-in-password'
        name='password'
        value={password}
        placeholder='Password'
        required
        onChange={onChangeHandler}
      />
      <button className='btn'>Sign In</button>
      <button type='button' className='btn' onClick={signInWithGoogleRedirect}>
        Google Sign In
      </button>
    </form>
  )
}

export default SignUpForm
