import React from 'react';
import { useFormContext } from 'react-hook-form';

const FormField = ({ name, label, type = 'text', placeholder, icon, required = false }) => {
  const { register, formState: { errors } } = useFormContext();

  const hasError = !!errors[name];

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-gray-200 text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}

        <input
          {...register(name)}
          id={name}
          type={type}
          placeholder={placeholder}
          aria-invalid={hasError}
          className={`
            w-full py-3 ${icon ? 'pl-10' : 'pl-4'} pr-4
            bg-[#1a1a1a] border rounded-lg
            text-white placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-blue-500
            transition-all duration-200
            ${hasError ? 'border-red-500' : 'border-gray-700'}
            sm:text-base md:text-lg
            sm:px-4 md:px-6
            lg:px-8
            xl:px-10
          `}
        />
      </div>

      {hasError && (
        <span className="text-red-500 text-sm mt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};

export default FormField;
