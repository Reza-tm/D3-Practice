import type { Meta, StoryObj } from "@storybook/react";
import { default as Chart } from "../components/Scatterplot";

const meta = {
  title: "Charts/Scatterplot",
  component: Chart,
  parameters: {
    layout: "fullscreen",
    options: {
      showPanel: false,
    },
  },
} satisfies Meta<typeof Chart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scatterplot: Story = {};
