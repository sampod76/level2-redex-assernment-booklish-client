import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { usePostBookMutation } from "../redux/features/book/bookApi";
import Swal from "sweetalert2";
import { setNotification } from "../redux/notification/notificationSlice";
export interface IBook {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  reviews: number;
  user?: string | null;
}

const AddBook = () => {
  const { user } = useAppSelector((state) => state?.user);
  const dispatch = useAppDispatch();

  const [addBook, { isLoading, error }] = usePostBookMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IBook>();

  const onSubmit = (data: IBook) => {
    console.log(data);
    if (user?.email) {
      data.user = user?.email;
      console.log(data);
      addBook(data)
        .unwrap()
        .then(() => {
          Swal.fire("Added Book", "Successfully added books", "success");
          dispatch(
            setNotification({
              message: "Successfully added books",
              type: "success",
            })
          );
          reset();
        })
        .catch((error: any) => {
          console.log(error);
          Swal.fire("Error", "Failed to add book", "error");
          dispatch(
            setNotification({ message: "Failed to add book", type: "error" })
          );
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "You are not valid user",
        text: "Login Please",
        footer: '<a href="">Why do I have this issue?</a>',
      });
    }
  };

  if (isLoading) {
    return  <div className="mt-1 text-xl font-bold font-serif text-center flex justify-center items-center">
    <h2 className="animate-spin border-2 rounded-full p-3 w-fit ">Loading ........</h2>
  </div>;
  }
  if (error) {
    console.log(error);
  }
  return (
    <div className="min-h-screen">
      <h3 className="text-center font-bold text-4xl   my-2 font-serif ">
        Add A new Book
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto rounded-lg border-2 p-2">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title:
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.title ? "border-red-500" : ""
            }`}
            type="text"
            placeholder="Enter product title"
            id="title"
            {...register("title", { required: "title is required" })}
          />
          {errors.title && (
            <p className="text-red-500 text-xs italic">
              Product title is required
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="author"
          >
            Author:
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.author ? "border-red-500" : ""
            }`}
            type="text"
            placeholder="Enter author name"
            id="author"
            {...register("author", { required: "author is required" })}
          />
          {errors.author && (
            <p className="text-red-500 text-xs italic">
              Author name is required
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="genre"
          >
            Genre:
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.genre ? "border-red-500" : ""
            }`}
            type="text"
            placeholder="Enter product genre"
            id="genre"
            {...register("genre", { required: "genre is required" })}
          />
          {errors.genre && (
            <p className="text-red-500 text-xs italic">
              Product genre is required
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="publicationDate"
          >
            Publication Date
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.publicationDate ? "border-red-500" : ""
            }`}
            type="date"
            placeholder="Select publication date"
            id="publicationDate"
            {...register("publicationDate", {
              required: "publicationDate is required",
            })}
          />
          {errors.publicationDate && (
            <p className="text-red-500 text-xs italic">
              Publication date is required
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="publicationDate"
          >
            Price
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.publicationDate ? "border-red-500" : ""
            }`}
            type="number"
            placeholder="Select publication date"
            id="publicationDate"
            
          />
         
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
