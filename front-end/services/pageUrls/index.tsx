const pageUrls = {
  home: "/",
  loginPage: "/login",
  registerPage: "/register",
  forgotPasswordPage: "/forgot-password",
  resetPasswordPage: "/reset-password",
  notFound: "/404",
  listImageCategory: (categoryName: string) => `/category/${categoryName}`,
  profile: {
    myprofile: "/profile",
  },
  account: "/account",
  changePassword: "/account/change-password",
}

export default pageUrls
