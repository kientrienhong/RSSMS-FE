export class ErrorHandle {
  static handle(error, showSnackbar) {
    console.log("tes");
    if (error?.response?.data?.error) {
      console.log("tesa");

      showSnackbar("error", error?.response?.data?.error?.message);
    }
  }
}
