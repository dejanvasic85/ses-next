import React from 'react';

import classNames from 'class-names';

import { useForm } from 'react-hook-form';

export function ContactForm({ loading, onSubmit }) {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({ defaultValues: { email: '', phone: '', message: '' } });

  const { email: emailError = {}, phone: phoneError = {}, message: messageError = {} } = errors;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="text"
          maxLength={100}
          className={classNames('input input-bordered w-full', { 'input-error': emailError?.message })}
          {...register('email', {
            required: { value: true, message: 'Email is required' },
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'Email is invalid',
            },
          })}
        />
        {emailError && (
          <label className="label text-error">
            <span className="label-text-alt text-error">{emailError?.message}</span>
          </label>
        )}
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Phone</span>
        </label>
        <input
          type="text"
          maxLength={100}
          className={classNames('input input-bordered w-full', { 'input-error': phoneError?.message })}
          {...register('phone')}
        />
        {phoneError && (
          <label className="label text-error">
            <span className="label-text-alt text-error">{phoneError?.message}</span>
          </label>
        )}
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Message</span>
        </label>
        <textarea
          type="text"
          maxLength={500}
          rows={4}
          className={classNames('textarea textarea-bordered', { 'textarea-error': messageError?.message })}
          {...register('message', {
            required: { value: true, message: 'Message is required' },
          })}
        />
        {messageError && (
          <label className="label text-error">
            <span className="label-text-alt text-error">{messageError?.message}</span>
          </label>
        )}
      </div>

      <button className={classNames('btn btn-primary mt-8', { loading })} type="submit">
        Submit
      </button>
    </form>
  );
}
