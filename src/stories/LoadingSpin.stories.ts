import LoadingSpin from "@/components/LoadingSpin";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
    title: "LoadingSpin",
    component: LoadingSpin,
    tags: ['autodocs'],
    parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof LoadingSpin>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Primary: Story = {};