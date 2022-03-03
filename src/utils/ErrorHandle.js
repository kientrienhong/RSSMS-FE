export class ErrorHandle {
  static handle(error, showSnackbar) {
    if (error?.response?.data?.error) {
      showSnackbar("error", error?.response?.data?.error?.message);
    }
  }
}
