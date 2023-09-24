// import { useEffect, useState } from 'react';
// import main_api from '../shared/mainAPi';
// import { Link } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useGetBookQuery } from "../redux/features/book/bookApi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addToWishlist } from "../redux/features/whislist/whislistSlice";
import { addToReaded } from "../redux/features/readedBook/readedBookSlice";
import Swal from "sweetalert2";

interface IBook {
  _id?: string | any;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
}
const Books = () => {
  const { user } = useAppSelector((state) => state.user);

  const { data, isLoading } = useGetBookQuery(undefined);

  const books: IBook[] = data?.data;

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
      <h2 className="mt-1 text-3xl font-bold font-serif">
        Our all Latest Book
      </h2>

      {isLoading && (
         <div className="mt-1 text-xl font-bold font-serif text-center flex justify-center items-center">
         <h2 className="animate-spin border-2 rounded-full p-3 w-fit ">Loading ........</h2>
       </div>
      )}
      <div className="grid  lg:grid-cols-3 gap-7 sm:max-w-sm sm:mx-auto lg:max-w-full mt-5">
        {/*  */}
        {books?.map((book, i) => {
          const { _id, title, author, genre, publicationDate } = book;
          return (
            <div
              key={i + 1}
              className="flex flex-wrap my-2 bg-green-50 gap-3 shadow-md hover:shadow-2xl hover:scale-105 py-1 text-center"
            >
              <Link to={`/bookDetails/${_id}`} className="w-full  px-4 my-1 ">
                <div className="">
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
                  <Link
                    to={`/bookDetails/${_id}`}
                    className="py-2 bg-slate-300 rounded-sm my-2 px-1"
                  >
                    Go Details
                  </Link>
                  <button
                    onClick={() => handleAddBook(book)}
                    className="py-2 bg-slate-500 my-2 px-1 rounded-lg"
                  >
                    Add Wishlist
                  </button>
                  <button
                    onClick={() => handleAddReaded(book)}
                    className="py-2 bg-slate-500 rounded-lg my-2 px-1"
                  >
                    Add Readed
                  </button>
                </section>
              )}
            </div>
          );
        })}
      </div>

      <Link
        to="/allBook"
        className="block w-96 mt-7 lg:inline-block lg:mt-0 text-gray-100  mr-8 p-2 bg-blue-600 hover:text-blue-600 hover:bg-gray-300 hover:shadow-2xl hover:scale-110  mx-auto rounded-t-xl font-bold text-xl "
      >
        See All
      </Link>
    </div>
  );
};

export default Books;
