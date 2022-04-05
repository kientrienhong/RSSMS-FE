export class ErrorHandle {
  static handle(error, showSnackbar, extendSession) {
    console.log(error);
    if (error?.response?.status === 401) {
      extendSession(true);
    } else if (error?.response?.status === 403) {
      showSnackbar("error", "Bạn không được cấp quyền để xử lý việc này");
    } else {
      showSnackbar("error", error?.response?.data?.error?.message);
    }
  }
}
