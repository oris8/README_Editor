import React from 'react';

const FormGroupWrapper = ({ className = '', children }) => (
  <div className={`relative flex gap-8 ${className}`}>{children}</div>
);

const Label = ({ className = '', children, required = false, ...rest }) => (
  <label className={`w-20 pt-1${className}`} {...rest}>
    {children}
    {required && <span className="ml-4">*</span>}
  </label>
);

// const INPUT_VARIANT = {
//   primary: 'custom-input--primary',
//   secondary: 'custom-input--secondary',
// };

// const InputWrapper = ({ className = '', children, variant, error = false }) => {
//   const dynamicStyles = `${error ? 'custom-input--error' : ''} ${variant ? INPUT_VARIANT[variant] : ''}`;
//   return (
//     <div className={`flex-center relative ${dynamicStyles} ${className}`}>
//       {children}
//     </div>
//   );
// };

const InputField = ({ ...props }) => {
  return <input className="git-input" {...props} />;
};

const ErrorMessage = ({ className = '', errorMsg }) => {
  if (!errorMsg) return null;
  return <p className={`${className}`}>{errorMsg}</p>;
};

const FormGroup = Object.assign(FormGroupWrapper, {
  Label: Label,
  // InputWrapper: InputWrapper,
  InputField: InputField,
  ErrorMessage: ErrorMessage,
});

export default FormGroup;
