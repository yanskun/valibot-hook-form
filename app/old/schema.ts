import * as v from "valibot";

export const schema = v.object({
  name: v.object({
    firstName: v.string(),
    lastName: v.string(),
  }),
  isJapanese: v.boolean(),
});

export type IFormInput = v.InferInput<typeof schema>;
