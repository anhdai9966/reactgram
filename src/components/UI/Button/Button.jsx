function Button({ title, className, handler }) {
  return (
    <button
      className={`h-8 border rounded bg-[#0095f6] ${className}`}
      onClick={handler}
    >
      <span className="text-white font-semibold">{title}</span>
    </button>
  );
}

export default Button;
