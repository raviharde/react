import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"

export default function Signup() {

  const [formData, setFormData] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleOnChnage = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }
  const handleOnSubmit = async (e) => {
    e.preventDefault();
   
    if(!formData.username || !formData.email || !formData.password){
      return setErrorMessage("Please fill all fileds")

    }
    try {
      setLoading(true);
      setErrorMessage(null)
      const res = await fetch('api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      setLoading(false);

      if(data.success === false){
        setErrorMessage(data.message)
      }

      if(res.ok){
        navigate('/signin')
      }
      
    } catch (err) {
      setErrorMessage(err)
    }
  }
  return (
    <div className='flex flex-row items-center justify-center w-full'>

      <form className='flex flex-col gap-8 w-3/12' onSubmit={handleOnSubmit}>
        <div>
          <Label value="Your name" />
          <TextInput type='text' placeholder='Username' id='username' onChange={handleOnChnage} />
        </div>
        <div>
          <Label value="Your email" />
          <TextInput type='text' placeholder='Email' id='email' onChange={handleOnChnage} />
        </div>
        <div>
          <Label value="Your password" />
          <TextInput type='password' placeholder='Password' id='password' onChange={handleOnChnage} />
        </div>
        <Button type='submit'>
          {loading ? (
            <>
             <Spinner aria-label="Default status example" />
            <span className="pl-2">Loading..</span>
            </>
            ): 'Sign up'}
        </Button>
        <span>Have an account?</span>
        {
          errorMessage && (

            <Alert color='failure'>{errorMessage}</Alert>
          )
        }
        <Link to='/sign-in' className='text-blue-500'>Sign in</Link>
      </form>
    </div>
  )
}
