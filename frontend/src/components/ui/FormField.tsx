interface FormFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

export const FormField = ({ label, error, children }: FormFieldProps) => {
  return (
    <div className="flex-1">
      <label className="text-[#9B9B9B] text-sm mb-2 block">{label}</label>
      {children}
      {error && <p className="mt-2 text-sm text-[#FF4949]">{error}</p>}
    </div>
  );
};
