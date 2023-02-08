import React from 'react';

const FormField = ({ label, type, name, placeholder, value, handleChange,
    isSupriseMe, handleSupriseMe }) => {
    return (
        <div>
            <div className='flex items-center gap-2 mb-2'>
                <label
                    htmlFor={name}
                    className='font-medium block text-sm text-gray-900'
                >
                    {label}
                </label>
                {isSupriseMe && (
                    <button
                        type='button'
                        className='font-semibold text-xs bg-[#ececf1] text-black px-2 py-1 rounded-[5px]'
                        onClick={handleSupriseMe}
                    >
                        Surpreenda-me
                    </button>
                )}
            </div>
            <input
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                className='bg-gray-50 border border-gray-300 text-gray-900 
                    text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] 
                    outline-none w-full block px-4 py-3'
                required
            />
        </div>
    )
}

export default FormField;