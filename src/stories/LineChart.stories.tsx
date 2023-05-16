import type { Meta, StoryObj } from "@storybook/react";
import { default as Chart } from "../components/LineChart";

const meta = {
  title: "Charts/LineChart",
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

export const LineChart: Story = {};
