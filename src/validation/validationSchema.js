import * as yup from "yup";
//schemas using yup validation library
// login ,download, upload, change password schemas
const loginSchema = yup.object({
  email: yup
    .string()
    .email("email 형식이 올바르지 않습니다.")
    .required("email이 입력되지 않았습니다."),
  password: yup.string().required("비밀번호가 입력되지 않았습니다."),
});

const registerSchema = yup.object().shape({
  email: yup
    .string()
    .required("email이 입력되지 않았습니다.")
    .email("올바른 email 형식이 아닙니다."),
  fullname: yup
    .string()
    .min(2, "이름은 최소 2글자입니다.")
    .required("이름이 입력되지 않았습니다."),
  password: yup
    .string()
    .min(8, "비밀번호는 최소 8글자입니다.")
    .required("비밀번호가 입력되지 않았습니다."),
  passwordRepeat: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "비밀번호와 비밀번호 확인이 일치하지 않습니다."
    )
    .required("비밀번호 확인이 입력되지 않았습니다."),
});

const downloadFileSchema = yup.object({
  fileId: yup
    .string()
    .matches(/^[0-9a-fA-F]{24}$/, "올바른 파일아이디 형식이 아닙니다.")
    .required(),
  filePassword: yup.string().required("파일 비밀번호가 입력되지 않았습니다."),
});

const uploadFileSchema = yup.object().shape({
  file: yup.mixed().required("선택된 파일이 없습니다."),
  uploadPassword: yup
    .string()
    .min(8, "파일 비밀번호는 최소 8글자입니다.")
    .required("파일 비밀번호가 입력되지 않았습니다."),
  uploadPasswordRepeat: yup
    .string()
    .oneOf(
      [yup.ref("uploadPassword"), null],
      "파일 비밀번호와 비밀번호 확인이 일치하지 않습니다."
    )
    .required("비밀번호 확인이 입력되지 않았습니다."),
  validPeriod: yup
    .number()
    .positive("유효기간은 음수일 수 없습니다.")
    .required("유효기간은 필수로 입력되어야 합니다."),
});
const changeFilePasswordSchema = yup.object().shape({
  filePassword: yup
    .string()
    .min(8, "파일 비밀번호는 최소 8글자입니다.")
    .required("파일 비밀번호가 입력되지 않았습니다."),
  filePasswordRepeat: yup
    .string()
    .oneOf(
      [yup.ref("filePassword"), null],
      "파일 비밀번호와 비밀번호 확인이 일치하지 않습니다."
    )
    .required("비밀번호 확인이 입력되지 않았습니다."),
});

const changeUserNameSchema = yup.object({
  name: yup
    .string()
    .min(2, "이름은 최소 2글자입니다.")
    .required("이름이 입력되지 않았습니다."),
  password: yup.string().required("비밀번호가 입력되지 않았습니다."),
});

const changeUserPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .min(8, "비밀번호는 최소 8글자입니다.")
    .required("비밀번호가 입력되지 않았습니다."),
  newPasswordRepeat: yup
    .string()
    .oneOf(
      [yup.ref("newPassword"), null],
      "비밀번호와 비밀번호 확인이 일치하지 않습니다."
    )
    .required("비밀번호 확인이 입력되지 않았습니다."),
  oldPassword: yup
    .string()
    .notOneOf(
      [yup.ref("newPassword"), null],
      "새 비밀번호는 현재 비밀번호와 같을 수 없습니다."
    )
    .required("현재 비밀번호가 입력되지 않았습니다."),
});

const resetPasswordEmailSchema = yup.object().shape({
  email: yup
    .string()
    .email("email 형식이 올바르지 않습니다.")
    .required("email이 입력되지 않았습니다."),
});

const resetPasswordPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "비밀번호는 최소 8글자입니다.")
    .required("비밀번호가 입력되지 않았습니다."),
  passwordRepeat: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "비밀번호와 비밀번호 확인이 일치하지 않습니다."
    )
    .required("비밀번호 확인이 입력되지 않았습니다."),
});

export {
  loginSchema,
  registerSchema,
  downloadFileSchema,
  uploadFileSchema,
  changeFilePasswordSchema,
  changeUserNameSchema,
  changeUserPasswordSchema,
  resetPasswordEmailSchema,
  resetPasswordPasswordSchema,
};
