import React from 'react';

const Input = ({
    label,
    type = 'text',
    name,
    value,
    onChange,
    error,
    required = false,
    autoComplete = 'off'
}) => {
    return (
        <div className="input-group">
            <label htmlFor={name}>
                {label} {required && <span className="required">*</span>}
            </label>
            <input
                id={name}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                autoComplete={autoComplete}
                className={error ? 'input-error' : ''}
            />
            {error && <span className="error-message">{error}</span>}
        </div>
    );
};

export default Input;