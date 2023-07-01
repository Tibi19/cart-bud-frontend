import ThemeController from '@/component/ThemeController'
import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import "./AuthStyles.css"
import { authEndpoint } from '@/remote/endpoint/auth'

const ERROR_BLANK_USERNAME = "*Username can't be empty"
const ERROR_BLANK_PASSWORD = "*Password can't be empty"
const ERROR_SIGN_IN = "*Incorrect username or password"
const ERROR_FALLBACK_SIGN_IN = "An error has occured"

const SignInPage = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [usernameError, setUsernameError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [signInError, setSignInError] = useState("")
    const navigate = useNavigate()

    const signIn = () => {
        setSignInError("")
        authEndpoint.signIn({
            request: {
                username: username,
                password: password
            },
            onSuccess: () => {
                navigate("/home")
            },
            onError: () => {
                setSignInError(ERROR_SIGN_IN)
            },
            onFallbackError: () => {
                alert(ERROR_FALLBACK_SIGN_IN)
            }
        })
    }

    const validateUsername = () => {
        if (username) {
            setUsernameError("")
            return true
        }

        setUsernameError(ERROR_BLANK_USERNAME)
        return false
    }

    const validatePassword = () => {
        if (password) {
            setPasswordError("")
            return true
        }

        setPasswordError(ERROR_BLANK_PASSWORD)
        return false
    }

    return (
        <>
            <ThemeController/>
            <div className="auth">
                <h1 className="auth__title">CartBud</h1>
                <form
                    className="auth__form"
                    onSubmit={(e) => {
                        e.preventDefault()
                        validateUsername() && validatePassword() && signIn()
                    }}
                >
                    <p className="auth__form__label">Username</p>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => {
                            e.preventDefault()
                            setUsername(e.target.value)
                        }}
                        className="auth__form__input"
                    />
                    <p className="auth__form__error">{usernameError}</p>
                    <p className="auth__form__label">Password</p>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                            e.preventDefault()
                            setPassword(e.target.value)
                        }}
                        className="auth__form__input"
                    />
                    <p className="auth__form__error">{passwordError}</p>
                    <button 
                        type="submit" 
                        className="auth__form__confirm-button"
                    >
                        Sign In
                    </button>
                    <p className="auth__form__error">{signInError}</p>
                </form>
                <Link to="/signup">
                    <p className="auth__other-sign-href">Don't have an account? Sign Up!</p>
                </Link>
            </div>
        </>
    )
}

export default SignInPage