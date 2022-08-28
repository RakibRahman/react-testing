import React, { useState } from "react";
import "./Form.css";

interface FormState {
  user: string;
  email: string;
  password: string;
  repeatPassword: string;
  subscribed: boolean;
}
export const Form = () => {
  const [formState, setFormState] = useState<FormState>({
    user: "",
    email: "",
    password: "",
    repeatPassword: "",
    subscribed: false,
  });

  const [errorMessage, setErrorMessage] = useState("");

  const changeFormState = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!isValidEmail.test(formState.email)) {
      setErrorMessage("Please enter a valid email");
      return;
    }

    if (formState.password.length < 6) {
      setErrorMessage("Please enter a password more than 6 characters");
      return;
    }

    if (formState.password !== formState.repeatPassword) {
      setErrorMessage("Password does not match");
      return;
    }

    console.log(formState);
    // setErrorMessage('')
  };
  return (
    <div className="container__form container--signup">
      <form action="#" className="form" id="form1" onSubmit={handleSubmit}>
        <h2 className="form__title">Sign Up</h2>
        <label htmlFor="user">User Name</label>
        <input
          onChange={changeFormState}
          type="text"
          placeholder="User"
          className="input"
          id="user"
          value={formState.user}
          name="user"
        />
        <input
          onChange={changeFormState}
          aria-label="email"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          className="input"
          value={formState.email}
        />
        <input
          onChange={changeFormState}
          name="password"
          aria-label="password"
          type="password"
          placeholder="Password"
          className="input"
          value={formState.password}
        />
        <input
          onChange={changeFormState}
          name="repeatPassword"
          value={formState.repeatPassword}
          type="password"
          placeholder="Repeat Password"
          className="input"
        />
        <div>
          <input
            checked={formState.subscribed}
            type="checkbox"
            id="check"
            name="subscribed"
            onChange={changeFormState}
          />
          <label htmlFor="check">Subscribe?</label>
        </div>
        <p style={{ color: "red" }}> {errorMessage ? errorMessage : null}</p>

        <button className="btn" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};
