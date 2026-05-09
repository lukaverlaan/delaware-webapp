// src/components/SelectList.jsx
import { useFormContext } from 'react-hook-form';

export default function SelectList({
  label, name, placeholder, items, validationRules, ...rest
}) {
  const {
    register,
    formState: {
      errors, isSubmitting,
    },
  } = useFormContext();

  const hasError = name in errors;

  return <div className='mb-3'>
    <label htmlFor={name} className="block text-sm/6 font-medium text-gray-900 dark:text-white mb-1.5">
      {label}
    </label>
    <select
      {...register(name, validationRules)}
      id={name}
      name={name}
      className="w-full appearance-none
          rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900
          outline-1 -outline-offset-1 outline-gray-300 focus:outline-2
          focus:-outline-offset-2 focus:outline-blue-600
          sm:text-sm/6 dark:bg-gray-800 dark:text-white"
      disabled={isSubmitting}
      {...rest} >
      <option value='' disabled>
        {placeholder}
      </option>
      {items.map(({ id, name }) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </select>
    {hasError && <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>}
  </div>;
}
