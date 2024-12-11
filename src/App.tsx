import './App.scss'
import {SubmitHandler, useForm} from "react-hook-form";
import {useEffect} from "react";

interface IFormData {
    email: string,
    message: string
}

function App() {

    const {register, handleSubmit, formState, reset} = useForm<IFormData>({
        mode: 'onBlur',
    });
    useEffect(() => {
        reset({
            email: 'test@mail.com',
            message: 'example message'
        })
    }, [reset])
    const emailError = formState.errors.email?.message
    const messageError = formState.errors.message?.message
    const onSubmit: SubmitHandler<IFormData> = (data) => console.log(data)
    return (
        <>
            <h1>Feedback form</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type='text' placeholder='Enter e-mail:'
                       {...register('email',
                           {required: 'this field is required',
                           pattern: {
                               value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                               message: 'Invalid email address!!',
                           }})}
                />
                {emailError && <p style={
                    {
                        color: 'tomato',
                        margin: '2px auto 0',
                        textAlign: 'left',
                        fontSize: '14px'
                    }
                }>{emailError}</p>}
                <textarea placeholder='Enter message:'
                          {...register('message', {required: 'this field is required',})}
                ></textarea>
                {messageError && <p style={
                    {
                        color: 'tomato',
                        margin: '2px auto 0',
                        textAlign: 'left',
                        fontSize: '14px'
                    }
                }>{messageError}</p>}
                <button type='submit'>Send</button>
            </form>
        </>
    )
}

export default App
