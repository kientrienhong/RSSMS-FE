import * as ActionType from "./../constants/ActionType";
import Axios from "axios";

// export const getListMovieAPI = () => {
//     return (dispatch) => {
//         Axios({
//             method: "GET",
//             url: "http://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP10"
//         })
//         .then((rs) => {
//             dispatch(getListMovie(rs.data));
//         })
//         .catch((err) => {
//             console.log(err);
//         })
//     }
// }

// export const getListMovie = (listMovie) => {
//   return {
//     type: ActionType.GET_LIST_FILM,
//     data: listMovie,
//   };
// };
