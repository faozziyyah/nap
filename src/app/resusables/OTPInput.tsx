// components/ReusableOtpInput.tsx

import React from 'react';
import OTPInput from 'react-otp-input';
import { OTPInputProps } from 'react-otp-input'; // Import OTPInputProps type

interface ReusableOtpInputProps extends OTPInputProps {
  formItemProps?: any;
}

const ReusableOtpInput: React.FC<ReusableOtpInputProps> = ({
  value,
  onChange,
  numInputs,
  renderInput,
  inputStyle,
  containerStyle,
  renderSeparator,
  ...rest
}) => {
  return (
    <OTPInput
      value={value}
      onChange={onChange}
      numInputs={numInputs}
      renderInput={renderInput}
      renderSeparator={renderSeparator} // Optional: set to null or an empty element
      inputStyle={inputStyle}
      containerStyle={containerStyle}
      {...rest}
    />
  );
};

export default ReusableOtpInput;
