import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import  Card  from '../components/Card';
import Tag from '@/components/Tag';

const meta = {
  title: 'Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Primary: Story = {
  args: {
    title: "title",
    children: <Tag tag="tag"/>,
  },
};