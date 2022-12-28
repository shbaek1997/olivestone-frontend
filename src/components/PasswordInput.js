import { StyledPasswordInput, StyledPasswordDiv } from "../style/style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
export const PasswordInput = ({
  inputId,
  passwordValue,
  onChangePasswordHandler,
  title,
}) => {
  const inputRef = useRef(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isIconVisible, setIsIconVisible] = useState(false);
  return (
    <StyledPasswordDiv>
      <label htmlFor={inputId}>{title}</label>
      <StyledPasswordInput
        id={inputId}
        type={isPasswordVisible ? "text" : "password"}
        ref={inputRef}
        value={passwordValue}
        onChange={onChangePasswordHandler}
        required
        onFocus={() => {
          setIsIconVisible(true);
        }}
        onBlur={() => {
          setIsIconVisible(false);
        }}
      ></StyledPasswordInput>

      <FontAwesomeIcon
        icon={isPasswordVisible ? faEyeSlash : faEye}
        style={
          isIconVisible
            ? {
                position: "absolute",
                top: "42px",
                right: "10px",
                display: "inline",
              }
            : {
                position: "absolute",
                top: "42px",
                right: "10px",
                display: "none",
              }
        }
        onClick={(e) => {
          e.preventDefault();
          setIsPasswordVisible(!isPasswordVisible);
          inputRef.current.focus();
        }}
        onPointerDown={(e) => {
          e.preventDefault();
        }}
      />
    </StyledPasswordDiv>
  );
};
