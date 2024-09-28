import { useState } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import * as v from "valibot";

const schema = v.pipe(
  v.object({
    name: v.object({
      firstName: v.string(),
      lastName: v.string(),
    }),
    isJapanese: v.boolean(),
  }),
  v.transform((input) => {
    const { firstName, lastName } = input.name;
    return {
      name: input.isJapanese
        ? `${lastName} ${firstName}`
        : `${firstName} ${lastName}`,
    };
  })
);

type IFormInput = v.InferInput<typeof schema>;

export function Form() {
  const formMethods = useForm<IFormInput>({
    resolver: valibotResolver(schema),
  });
  const { register, handleSubmit } = formMethods;
  const onSubmit: SubmitHandler<IFormInput> = (data) => setFormData(data);

  const [formData, setFormData] = useState<IFormInput>();

  return (
    <div>
      <FormProvider {...formMethods}>
        <form
          className="max-w-sm mx-auto flex flex-col gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex gap-4">
            <div>
              <label
                form="firstName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                First Name
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("name.firstName")}
              />
            </div>
            <div>
              <label
                form="firstName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Last Name
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("name.lastName")}
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="default-checkbox"
              type="checkbox"
              {...register("isJapanese")}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-checkbox"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              日本人ですか？
            </label>
          </div>

          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            type="submit"
          >
            Submit
          </button>

          <div>
            <pre className="border border-gray-300 p-4 rounded-lg overflow-auto dark:text-white">
              {JSON.stringify(formData ?? {}, null, 2)}
            </pre>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
