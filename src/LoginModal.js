import { useState } from 'react';

export default function LoginModal({ onClose, onSuccess }) {
    const [passwordInput, setPasswordInput] = useState('');
    const [loginError, setLoginError] = useState('');

    function handleSubmit() {
        if (passwordInput === process.env.REACT_APP_UPLOAD_PASSWORD) {
            onSuccess();
        } else {
            setLoginError('Incorrect password!');
        }
    }

    return (
        <div className="popupBackground" onClick={onClose}>
            <div className="modalBox loginBox" onClick={e => e.stopPropagation()}>
                <button className="closeButton" onClick={onClose}>X</button>
                <h2 className="loginTitle">Admin Access 🔒</h2>
                <p className="loginSubtitle">Enter password to write a review</p>
                {loginError && <div className="errorBanner">{loginError}</div>}
                <input
                    type="password"
                    placeholder="Password"
                    value={passwordInput}
                    onChange={e => setPasswordInput(e.target.value)}
                    className="loginInput"
                />
                <button className="publishButton" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </div>
    );
}