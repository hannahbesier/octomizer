import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import  DropdownSearch  from '../components/DropdownSearch';

const meta = {
  title: 'DropdownSearch',
  component: DropdownSearch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DropdownSearch>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Primary: Story = {
  args: {
    label: "label",
    currentValue: "value",
    options: ["value", "value1", "value2"],
    setCurrentValue: () => {}
  },
};