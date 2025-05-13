import { Meta, StoryObj } from "@storybook/react";
import { TooltipTrigger } from "react-aria-components";

import Button from "../button/button";

import Tooltip from "./tooltip";

const sizes: React.ComponentProps<typeof Tooltip>["size"][] = [
  "md",
  "sm",
] as const;

const placements: React.ComponentProps<typeof Tooltip>["placement"][] = [
  "left",
  "top",
  "bottom",
  "end",
] as const;

/**
 * Must be using inside a `TooltipTrigger`.
 */
const meta = {
  argTypes: {
    children: { control: { disable: true } },
    className: { control: { disable: true } },
    withArrow: {
      control: "boolean",
      table: {
        defaultValue: { summary: "true" },
      },
    },
  },
  args: {
    children: "World!",
  },
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  title: "Tooltip",
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

/* --------------------------------- Stories -------------------------------- */
export const Default: Story = {
  args: {
    withArrow: true,
  },
  render: (args) => (
    <TooltipTrigger>
      <Button>Hello</Button>
      <Tooltip {...args} placement="bottom" />
    </TooltipTrigger>
  ),
};

export const Sizes: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: (args) => (
    <div className="flex gap-2 items-center">
      {sizes.map((size) => (
        <TooltipTrigger key={size} isOpen>
          <Button>Hello</Button>
          <Tooltip size={size} {...args} />
        </TooltipTrigger>
      ))}
    </div>
  ),
};

/** None exhaustive. */
export const Placements: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: (args) => (
    <div className="flex gap-2 items-center">
      {placements.map((placement) => (
        <TooltipTrigger key={placement} isOpen>
          <Button>Hello</Button>
          <Tooltip placement={placement} {...args} />
        </TooltipTrigger>
      ))}
    </div>
  ),
};

export const NoArrow: Story = {
  args: {
    withArrow: false,
  },
  render: (args) => (
    <TooltipTrigger isOpen>
      <Button>Hello</Button>
      <Tooltip {...args} />
    </TooltipTrigger>
  ),
};
