import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import  Tag  from '../components/Tag';

const meta = {
  title: 'Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tag>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Primary: Story = {
  args: {
    tag: "tag"
  },
};