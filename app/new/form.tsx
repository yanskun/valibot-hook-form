"use client";

import { useState } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { IFormInput, schema } from "./schema";
import "../form-styles.scss";

export function Form() {
  const formMethods = useForm<IFormInput>({
    resolver: valibotResolver(schema),
  });
  const { register, handleSubmit } = formMethods;

  const [formData, setFormData] = useState<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => setFormData(data);
  return (
    <div>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="name">
            <div>
              <label form="firstName">First Name</label>
              <input {...register("name.firstName")} />
            </div>
            <div>
              <label form="firstName">Last Name</label>
              <input {...register("name.lastName")} />
            </div>
          </div>

          <div className="is-japanese">
            <input
              id="default-checkbox"
              type="checkbox"
              {...register("isJapanese")}
            />
            <label htmlFor="default-checkbox">日本人ですか？</label>
          </div>

          <button type="submit">Submit</button>

          <div>
            <pre>{JSON.stringify(formData ?? {}, null, 2)}</pre>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
