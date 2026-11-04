import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Slideshow from '../components/Slideshow';

const meta = {
  title: 'Slideshow',
  component: Slideshow,
  tags: ['autodocs'],
} satisfies Meta<typeof Slideshow>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Primary: Story = {
  args: {
    images: ["/img/IssueEditWhite.png", "/img/IssueBoardBlack.png"],
    setIndex: () => { },
    index: 0,
  },
};