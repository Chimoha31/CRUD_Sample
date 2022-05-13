import { db } from "../components/firebase";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

// 参照するのは”books”と名付けたcollection
const bookCollectionRef = collection(db, "books");

class BookDataService {
  // 情報を追加したい時はaddDoc()内の第一引数にどこにaddするかの情報＝bookCoolectionRefを入れ、
  // 第二引数には、bookCollectionRefに追加したい内容が入ったnewBookを指定。
  addBooks = (newBook) => {
    return addDoc(bookCollectionRef, newBook);
  }
  // 内容を編集する際は、idを付与。複数あるドキュメントの内、1つをupdate(変更)したいので、
  // まずは1つのドキュメントという意味のdoc()関数の第一引数にfirestoreを定数化したdb、
  // 第二引数にcollection名、第三引数にidを指定しbookDocとして格納。⇨複数あるドキュメントのうち特定のドキュメントを抽出。
  // returnの第一引数に格納したbookDocを、第二引数には変更してupdateしたい内容が入ったupdatedBookを指定。
  updateBook = (id, updatedBook) => {
    const bookDoc = doc(db, "books", id);
    return updateDoc(bookDoc, updatedBook);
  }
  // 削除に関しては追加も変更もすることがなく、ただ単に消すだけなので、idを渡してどのDocなのかを指定できれば良し。
  deleteBook = (id) => {
    const bookDoc = doc(db, "books", id);
    return deleteDoc(bookDoc);
  }

  // 文字通り、collection名booksの中にあるDocuments全て取得したい場合なので複数形のgetDocs()
  getAllBooks = () => {
    return getDocs(bookCollectionRef);
  }
  // getDocs()と違い個々のDocを取得したいので引数にはidを渡す。
  getBook = (id) => {
    const bookDoc = dog(db, "books", id)
    return getDog(bookDoc);
  }
}



export default new BookDataService();