import React from 'react';
import classNames from 'class-names';
import { useForm } from 'react-hook-form';

export function FeedbackForm({}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  const { fullName: fullNameError = {} } = errors;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Full name</span>
        </label>
        <input
          type="text"
          maxLength={100}
          className={classNames('input input-bordered w-full max-w-xs', { 'input-error': fullNameError?.message })}
          {...register('fullName', {
            required: { value: true, message: 'Full name is required' },
          })}
        />
        {fullNameError && (
          <label className="label text-error">
            <span className="label-text-alt text-error">{fullNameError?.message}</span>
          </label>
        )}
      </div>

      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
}
