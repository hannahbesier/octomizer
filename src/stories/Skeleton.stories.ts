import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import  Skeleton  from '../components/Skeleton';

const meta = {
  title: 'Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};