import { Link } from "react-router-dom";
import { useGetAllBookQuery } from "../redux/features/book/bookApi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useState, ChangeEvent } from "react";
import { addToWishlist } from "../redux/features/whislist/whislistSlice";
import Swal from "sweetalert2";
import { addToReaded } from "../redux/features/readedBook/readedBookSlice";

export interface IBook {
  _id?: string | any;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
}
const ALlBook = () => {
  const { data, isLoading } = useGetAllBookQuery(undefined);
  const books: IBook[] = data?.data;
  const { user } = useAppSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredBooks = books?.filter((book) => {
    const { title, author, genre } = book;
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const bookDate = new Date(book?.publicationDate);
    const formattedDate = bookDate.toISOString().split("T")[0];
    return (
      title.toLowerCase().includes(lowerCaseSearchTerm) ||
      author.toLowerCase().includes(lowerCaseSearchTerm) ||
      genre.toLowerCase().includes(lowerCaseSearchTerm) ||
      formattedDate.includes(lowerCaseSearchTerm)
    );
  });

  const dispatch = useAppDispatch();

  const handleAddBook = (BookData: IBook) => {
    dispatch(addToWishlist(BookData));
    Swal.fire("Added WishList", "Successfully added books", "success");
  };
  const handleAddReaded = (BookData: IBook) => {
    dispatch(addToReaded(BookData));
    Swal.fire("Added Readed", "Successfully added books", "success");
  };

  return (
    <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 text-center">
      <h2 className="mt-1 text-3xl font-bold font-serif">Our All Book Store</h2>

      <section className="my-2 py-3 grid grid-cols-1 lg:grid-cols-2 gap-3 border-2 rounded ">
        <select name="" id="" className="py-3 my-2 px-2 outline-none border-2">
          <option value="" disabled>
            Search Book
          </option>
          <option value="">Genre</option>
          <option value="">Publication Year</option>
        </select>
        <input
          type="text"
          placeholder="Search by title,author,genre"
          className="border border-gray-300 rounded py-2  px-4 mr-2"
          value={searchTerm}
          onChange={handleSearch}
        />

        <div className="w-full flex justify-center items-center">
          {user?.email && (
            <Link
              className="text-xl w-fit text-center font-bold bg-blue-500 text-slate-200 px-4 py-2 rounded-lg "
              to="/addBook"
            >
              add new
            </Link>
          )}
        </div>
      </section>

      {isLoading && (
        <div className="mt-1 text-xl font-bold font-serif text-center flex justify-center items-center">
          <h2 className="animate-spin border-2 rounded-full p-3 w-fit ">Loading ........</h2>
        </div>
      )}

      <div className="grid gap-5 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full mt-5">
        {filteredBooks?.map((book, i) => {
          const { _id, title, author, genre, publicationDate } = book;
          return (
            <div
              key={i + 1}
              className="flex flex-wrap -mx-4 shadow-md hover:shadow-2xl hover:scale-105 py-1 text-center"
            >
              <Link to={`/bookDetails/${_id}`} className="w-full  px-4 my-1 ">
                <div className="bg-white divide-y-2">
                  <h2 className="text-lg font-bold mb-2">{title}</h2>
                  <p className="text-gray-600 mb-4">{author}</p>
                  <p className="text-gray-600">{genre}</p>
                  <p className="text-gray-600">
                    Publication Date: {publicationDate}
                  </p>
                </div>
              </Link>
              {user?.email && (
                <section className="mx-auto  grid grid-cols-1 lg:grid-cols-2 gap-3 text-sm font-medium">
                  <button
                    onClick={() => handleAddBook(book)}
                    className="py-2 border-2 rounded-sm my-2 px-1"
                  >
                    Add Wishlist books
                  </button>
                  <button
                    onClick={() => handleAddReaded(book)}
                    className="py-2 border-2 rounded-sm my-2 px-1 "
                  >
                    Add Readed books
                  </button>
                </section>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ALlBook;
