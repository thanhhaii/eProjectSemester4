import * as yup from "yup"

const validation = (): yup.ObjectSchema<any> =>
  yup.object().shape({
    images: yup.array(
      yup.object().shape({
        title: yup
          .string()
          .min(5, "Must be at least 5 characters")
          .max(50)
          .required("Title is required"),
        description: yup.string().min(10).max(200),
      }),
    ),
  })

export default validation
