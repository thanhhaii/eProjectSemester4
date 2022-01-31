const pageUrls = {
  home: "/",
  loginPage: "/login",
  registerPage: "/register",
  forgotPasswordPage: "/forgot-password",
  resetPasswordPage: "/reset-password",
  notFound: "/404",
  listImageCategory: (categoryName: string) => `/category/${categoryName}`
}

export default pageUrls
