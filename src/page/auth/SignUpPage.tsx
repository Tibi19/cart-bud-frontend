import ThemeController from '@/component/ThemeController'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { authEndpoint } from '@/remote/endpoint/auth'
import "./AuthStyles.css"

const ERROR_BLANK_USERNAME = "*Username can't be empty"
const ERROR_PASSWORD_CHARACTERS = "*Password must have an uppercase letter and a digit"
const ERROR_PASSWORD_LENGTH = "*Password must have at least 8 characters"
const ERROR_PASSWORD_CONFIRM = "*Confirmation password is not the same"
const ERROR_SIGN_UP = "User already exists"
const ERROR_FALLBACK_SIGN_UP = "An error has occured"
const SUCCESS_SIGN_UP = "Successfully signed up!"

const MIN_PASSWORD_LENGTH = 8
const REGEX_CONTAINS_UPPERCASE = /(.*[A-Z].*)/g
const REGEX_CONTAINS_DIGITS = /(.*\d.*)/g

const SignUpPage = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [usernameError, setUsernameError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")
    const [signUpError, setSignUpError] = useState("")

    const signUp = () => {
        setSignUpError("")
        authEndpoint.signUp({
            request: {
                username: username,
                password: password
            },
            onSuccess: () => {
                alert(SUCCESS_SIGN_UP)
            },
            onError: () => {
                setSignUpError(ERROR_SIGN_UP)
            },
            onFallbackError: () => {
                alert(ERROR_FALLBACK_SIGN_UP)
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
        if (password.length < MIN_PASSWORD_LENGTH) {
            setPasswordError(ERROR_PASSWORD_LENGTH)
            return false
        }

        const isMissingUppercase = !password.match(REGEX_CONTAINS_UPPERCASE)
        const isMissingDigits = !password.match(REGEX_CONTAINS_DIGITS) 
        if (isMissingUppercase || isMissingDigits) {
            setPasswordError(ERROR_PASSWORD_CHARACTERS)
            return false
        }

        setPasswordError("")
        return true
    }

    const validateConfirmPassword = () => {
        if (password === confirmPassword) {
            setConfirmPasswordError("")
            return true
        }

        setConfirmPasswordError(ERROR_PASSWORD_CONFIRM)
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
                        validateUsername()
                            && validatePassword()
                            && validateConfirmPassword()
                            && signUp()
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
                    <p className="auth__form__label">Confirm Password</p>
                    <input
                        type="password"
                        placeholder="Password"
                        value={confirmPassword}
                        onChange={(e) => {
                            e.preventDefault()
                            setConfirmPassword(e.target.value)
                        }}
                        className="auth__form__input"
                    />
                    <p className="auth__form__error">{confirmPasswordError}</p>
                    <button 
                        type="submit" 
                        className="auth__form__confirm-button"
                    >
                        Sign Up
                    </button>
                    <p className="auth__form__error">{signUpError}</p>
                </form>
                <Link to="/signin">
                    <p className="auth__other-sign-href">Already have an account? Sign In!</p>
                </Link>
            </div>
        </>
    )
}

export default SignUpPage