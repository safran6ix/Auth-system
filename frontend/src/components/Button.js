import React from 'react';

const Button = ({
    children,
    type = 'button',
    onClick,
    loading = false,
    variant = 'primary',
    disabled = false
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`btn btn-${variant}`}
        >
            {loading ? 'Loading...' : children}
        </button>
    );
};

export default Button;