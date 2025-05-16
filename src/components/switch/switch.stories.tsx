import { Meta, StoryObj } from "@storybook/react";

import Switch from "./switch";

const meta = {
  args: { children: "Label" },
  component: Switch,
  parameters: {
    layout: "centered",
  },
  title: "Switch",
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

/* --------------------------------- Stories -------------------------------- */
export const Default: Story = {};
