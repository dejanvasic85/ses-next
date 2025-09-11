import React, { useCallback } from 'react';

import classNames from 'class-names';
import { useForm } from 'react-hook-form';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { ContactFormData } from '@/types';

interface ContactFormProps {
  loading: boolean;
  onSubmit: (data: ContactFormData) => void;
}

export function ContactForm({ loading, onSubmit }: ContactFormProps) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<ContactFormData>({ defaultValues: { fullName: '', email: '', phone: '', message: '', address: '' } });

  const {
    fullName: fullNameError,
    email: emailError,
    phone: phoneError,
    message: messageError,
    address: addressError,
  } = errors;

  const handleReCaptchaVerify = useCallback(
    async (data: ContactFormData) => {
      if (!executeRecaptcha) {
        console.log('Execute recaptcha not yet available');
        return;
      }

      const token = await executeRecaptcha();
      if (token) {
        onSubmit(data);
      }
    },
    [executeRecaptcha, onSubmit],
  );

  return (
    <form onSubmit={handleSubmit(handleReCaptchaVerify)} id="contactForm">
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Contact form</legend>

        <label className="label" htmlFor="email">
          Email
        </label>
        <input
          type="text"
          maxLength={100}
          id="email"
          aria-invalid={!!emailError?.message}
          aria-describedby={!!emailError?.message ? 'emailErrorMessage' : undefined}
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
            <span className="label-text-alt text-error" id="emailErrorMessage">
              {emailError?.message}
            </span>
          </label>
        )}

        <label className="label" htmlFor="fullName">
          <span className="label-text">Full name</span>
        </label>
        <input
          type="text"
          maxLength={100}
          id="fullName"
          aria-invalid={!!fullNameError?.message}
          aria-describedby={!!fullNameError?.message ? 'fullNameErrorMessage' : undefined}
          className={classNames('input input-bordered w-full', { 'input-error': fullNameError?.message })}
          {...register('fullName')}
        />
        {fullNameError && (
          <label className="label text-error">
            <span className="label-text-alt text-error" id="fullNameErrorMessage">
              {fullNameError?.message}
            </span>
          </label>
        )}

        <label className="label" htmlFor="phone">
          <span className="label-text">Phone</span>
        </label>
        <input
          type="text"
          id="phone"
          maxLength={100}
          aria-invalid={!!phoneError?.message}
          aria-describedby={!!phoneError?.message ? 'phoneErrorMessage' : undefined}
          className={classNames('input input-bordered w-full', { 'input-error': phoneError?.message })}
          {...register('phone')}
        />
        {phoneError && (
          <label className="label text-error">
            <span className="label-text-alt text-error" id="phoneErrorMessage">
              {phoneError?.message}
            </span>
          </label>
        )}

        <label className="label" htmlFor="address">
          <span className="label-text">Address</span>
        </label>
        <input
          type="text"
          id="address"
          maxLength={100}
          aria-invalid={!!addressError?.message}
          aria-describedby={!!addressError?.message ? 'addressErrorMessage' : undefined}
          className={classNames('input input-bordered w-full', { 'input-error': addressError?.message })}
          {...register('address')}
        />
        {addressError && (
          <label className="label text-error">
            <span className="label-text-alt text-error" id="addressErrorMessage">
              {addressError?.message}
            </span>
          </label>
        )}

        <label className="label" htmlFor="message">
          <span className="label-text">Message</span>
        </label>
        <textarea
          id="message"
          maxLength={500}
          rows={4}
          aria-invalid={!!messageError?.message}
          aria-describedby={!!messageError?.message ? 'messageErrorMessage' : undefined}
          className={classNames('textarea textarea-bordered w-full', { 'textarea-error': messageError?.message })}
          {...register('message', {
            required: { value: true, message: 'Message is required' },
          })}
        />
        {messageError && (
          <label className="label text-error">
            <span className="label-text-alt text-error" id="messageErrorMessage">
              {messageError?.message}
            </span>
          </label>
        )}
      </fieldset>

      <button className={classNames('btn btn-primary mt-8 text-white', { loading })} type="submit" id="submit">
        Submit
      </button>
    </form>
  );
}
