import * as v from "valibot";

export const schema = v.pipe(
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
export type IFormInput = v.InferInput<typeof schema>;
