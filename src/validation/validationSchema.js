import * as yup from "yup";
const loginSchema = yup.object({
  username: yup.string().required("username이 입력되지 않았습니다."),
  password: yup.string().required("비밀번호가 입력되지 않았습니다."),
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
export {
  loginSchema,
  downloadFileSchema,
  uploadFileSchema,
  changeFilePasswordSchema,
};
