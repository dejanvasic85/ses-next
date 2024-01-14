export function Rating({ name, starRating }) {
  return (
    <div className="rating">
      {Array.from({ length: 5 }, (_, idx) => (
        <input
          key={idx}
          type="radio"
          disabled
          aria-label={`${idx + 1} star`}
          name={`starRating-${name}`}
          className="mask mask-star-2 bg-orange-400 hover:cursor-default"
          {...(starRating === idx + 1 ? { checked: true } : null)}
        />
      ))}
    </div>
  );
}
