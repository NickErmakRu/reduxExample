import { CREATE_POST } from "./types"
import { showAlert } from "./actions";

const forbidden = ["fuck", "lust", "porn", "horny", "sex", "shit"];

export function forbiddenWordsMiddleware({ dispatch }) {
  return function(next) {
    return function(action) {
      if (action.type === CREATE_POST) {
        const found = forbidden.filter((word) => 
          action.payload.title.toLowerCase().includes(word)
        );
        console.log(found)
        if (found.length) {
          return dispatch(showAlert(`Запрещенное слово - ${ found[0] }`))
        }
      }
      return next(action)
    }
  }
}