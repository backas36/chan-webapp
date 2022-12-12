import LoadingButton from "@mui/lab/LoadingButton"
import { useFormikContext } from "formik"

const FLoadingBtn = ({ children, ...otherProps }) => {
  const { submitForm, isSubmitting, isValid, dirty, setSubmitting } =
    useFormikContext()

  const configButton = {
    disabled: !dirty || !isValid,
    variant: "contained",
    color: "primary",
    fullWidth: true,
    loading: isSubmitting,
    type: "submit",
    ...otherProps,
  }

  return (
    <LoadingButton sx={{ mt: 3 }} {...configButton}>
      {children}
    </LoadingButton>
  )
}
export default FLoadingBtn
