import React, { useCallback } from 'react';

import classNames from 'class-names';
import { useForm } from 'react-hook-form';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

export function ContactForm({ loading, onSubmit }) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({ defaultValues: { fullName: '', email: '', phone: '', message: '' } });

  const {
    fullName: fullNameError = {},
    email: emailError = {},
    phone: phoneError = {},
    message: messageError = {},
  } = errors;

  const handleReCaptchaVerify = useCallback(
    async (data) => {
      if (!executeRecaptcha) {
        console.log('Execute recaptcha not yet available');
        return;
      }

      const token = await executeRecaptcha();
      if (token) {
        onSubmit(data);
      }
    },
    [executeRecaptcha],
  );

  return (
    <form onSubmit={handleSubmit(handleReCaptchaVerify)}>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Full name</span>
        </label>
        <input
          type="text"
          maxLength={100}
          className={classNames('input input-bordered w-full', { 'input-error': fullNameError?.message })}
          {...register('fullName')}
        />
        {fullNameError && (
          <label className="label text-error">
            <span className="label-text-alt text-error">{fullNameError?.message}</span>
          </label>
        )}
      </div>

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

      <button className={classNames('btn btn-primary mt-8 text-white', { loading })} type="submit">
        Submit
      </button>
    </form>
  );
}
