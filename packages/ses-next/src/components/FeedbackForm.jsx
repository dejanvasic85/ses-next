import React from 'react';
import classNames from 'class-names';
import { Controller, useForm } from 'react-hook-form';

export function FeedbackForm({ loading, onSubmit }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues: { rating: 5 } });

  const { fullName: fullNameError = {}, comment: commentError = {} } = errors;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Full name</span>
        </label>
        <input
          type="text"
          maxLength={100}
          className={classNames('input input-bordered w-full', { 'input-error': fullNameError?.message })}
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

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Comment</span>
        </label>
        <textarea
          type="text"
          maxLength={500}
          className={classNames('textarea textarea-bordered', { 'textarea-error': commentError?.message })}
          {...register('comment', {
            required: { value: true, message: 'Comment is required' },
          })}
        />
        {commentError && (
          <label className="label text-error">
            <span className="label-text-alt text-error">{commentError?.message}</span>
          </label>
        )}
      </div>
      <div className="form-control w-full max-w-xs">
        <Controller
          control={control}
          name="rating"
          render={({ field }) => (
            <div className="rating">
              <input
                aria-label="1 star"
                type="radio"
                name="feedback-rating"
                className="mask mask-star-2 bg-orange-400"
                checked={field.value === 1}
                onChange={() => field.onChange(1)}
              />
              <input
                aria-label="2 stars"
                type="radio"
                name="feedback-rating"
                className="mask mask-star-2 bg-orange-400"
                checked={field.value === 2}
                onChange={() => field.onChange(2)}
              />
              <input
                aria-label="3 stars"
                type="radio"
                name="feedback-rating"
                className="mask mask-star-2 bg-orange-400"
                checked={field.value === 3}
                onChange={() => field.onChange(3)}
              />
              <input
                aria-label="4 stars"
                type="radio"
                name="feedback-rating"
                className="mask mask-star-2 bg-orange-400"
                checked={field.value === 4}
                onChange={() => field.onChange(4)}
              />
              <input
                aria-label="5 stars"
                type="radio"
                name="feedback-rating"
                className="mask mask-star-2 bg-orange-400"
                checked={field.value === 5}
                onChange={() => field.onChange(5)}
              />
            </div>
          )}
        ></Controller>
      </div>

      <button className={classNames('btn btn-primary mt-8', { loading })} type="submit">
        Submit
      </button>
    </form>
  );
}
