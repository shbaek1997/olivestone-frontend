import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { StyledPasswordInput, StyledPasswordDiv } from "../style/style";
//Password input component used for all password using forms
//input's id, input value (password value), input onChangeHandler (onChangePasswordHandler), label content (title) as props
export const PasswordInput = ({
  inputId,
  passwordValue,
  onChangePasswordHandler,
  title,
}) => {
  //use ref for password input to control input
  const inputRef = useRef(null);
  //password, icon visibility
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isIconVisible, setIsIconVisible] = useState(false);
  return (
    <StyledPasswordDiv>
      <label htmlFor={inputId}>{title}</label>
      {/* if password is visible, type is text, else type is password */}
      <StyledPasswordInput
        id={inputId}
        type={isPasswordVisible ? "text" : "password"}
        ref={inputRef}
        value={passwordValue}
        onChange={onChangePasswordHandler}
        required
        // change icon visibility for input focus/blur
        onFocus={() => {
          setIsIconVisible(true);
        }}
        onBlur={() => {
          setIsIconVisible(false);
        }}
      ></StyledPasswordInput>

      <FontAwesomeIcon
        //alternate icon for password visiblity
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
        //focus input again after icon is clicked
        onClick={(e) => {
          e.preventDefault();
          setIsPasswordVisible(!isPasswordVisible);
          inputRef.current.focus();
        }}
        // icon is still visible when icon is clicked - never focus on icon
        onPointerDown={(e) => {
          e.preventDefault();
        }}
      />
    </StyledPasswordDiv>
  );
};
