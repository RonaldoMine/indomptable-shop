type InputRadioProps = {
  label: string;
};

export default function InputRadio({
  label,
  id,
  ...props
}: React.ButtonHTMLAttributes<HTMLInputElement> & InputRadioProps) {
  return (
    <div className="flex items-center gap-1">
      <input
        className="appearance-none border border-neutral-600 checked:border-orange-600 rounded-full w-4 h-4 flex items-center justify-center cursor-pointer after:rounded-full after:bg-white after:inline-block after:w-1 after:h-1 checked:bg-orange-600"
        type="radio"
        id={id}
        {...props}
      />
      <label htmlFor={id} className="cursor-pointer">
        {label}
      </label>
    </div>
  );
}
