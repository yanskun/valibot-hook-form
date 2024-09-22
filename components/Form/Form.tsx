import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import * as v from "valibot";

enum GenderEnum {
  female = "female",
  male = "male",
  other = "other",
}

const schema = v.object({
  firstName: v.pipe(
    v.string(),
    v.minLength(2, "First name must be at least 2 characters"),
    v.maxLength(20, "First name must be at most 20 characters")
  ),
  gender: v.enum(GenderEnum),
});

type IFormInput = v.InferInput<typeof schema>;

export function Form() {
  const { register, handleSubmit } = useForm<IFormInput>({
    resolver: valibotResolver(schema),
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => setFormData(data);

  const [formData, setFormData] = useState<IFormInput>();

  return (
    <div>
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <label
            form="firstName"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            First Name
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register("firstName")}
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Gender Selection
          </label>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register("gender")}
          >
            <option value="female">female</option>
            <option value="male">male</option>
            <option value="other">other</option>
          </select>
        </div>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          type="submit"
        >
          Submit
        </button>
      </form>

      <div>
        <pre className="border border-gray-300 p-4 rounded-lg overflow-auto dark:text-white">
          {JSON.stringify(formData ?? {}, null, 2)}
        </pre>
      </div>
    </div>
  );
}
