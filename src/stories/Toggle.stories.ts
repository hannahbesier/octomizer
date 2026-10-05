import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import  Toggle  from '../components/Toggle';

const meta = {
  title: 'Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Toggle>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Primary: Story = {
  args: {
    labelLeft: "Light",
    labelRight: "Dark",
  },
};
export const LeftLabel: Story = {
  args: {
    labelLeft: "Light",
  },
};
export const RightLabel: Story = {
  args: {
    labelRight: "Dark",
  },
};