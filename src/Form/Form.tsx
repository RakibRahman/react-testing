import React from 'react'
import './Form.css'
export const Form = () => {
    return (
        <div className="container__form container--signup">
            <form action="#" className="form" id="form1">
                <h2 className="form__title">Sign Up</h2>
                <label htmlFor="user">User Name</label>
                <input type="text" placeholder="User" className="input" id="user" />
                <input aria-label="email" type="email" name='email' id='email' placeholder="Email" className="input" />
                <input aria-label='password' type="password" placeholder="Password" className="input" />
                <input type="password" placeholder="Repeat Password" className="input" />
                <div>
                    <input type='checkbox' id='check' name='check' />
                    <label htmlFor="check">Subscribe?</label>
                </div>
                <button className="btn">Sign Up</button>
            </form>
        </div>
    )
}
