import { Meta, StoryObj } from "@storybook/react";
import { Form } from "./Form";

const meta = {
  title: "Form",
  component: Form,
  parameters: {
    layout: "centered",
  },
} as Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
