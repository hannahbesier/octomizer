import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Add } from '@carbon/icons-react';

import  Button  from '../components/Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/arg-types

} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    size: "medium",
    label: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    size: "medium",
    label: 'Button',
  },
};

export const Large: Story = {
  args: {
    primary: false,
    size: 'large',
    label: 'Button',
  },
};

export const Small: Story = {
  args: {
    primary: false,
    size: 'small',
    label: 'Button',
  },
};
export const IconTextButton: Story = {
  args: {
    primary: false,
    size: "medium",
    label: 'Button',
    icon: <Add size="24" className="text-foreground"/>
  },
};
export const IconButtonPrimary: Story = {
  args: {
    primary: true,
    size: "medium",
    icon: <Add size="24" className="text-foreground"/>
  },
};
export const IconButton: Story = {
  args: {
    primary: false,
    size: "medium",
    icon: <Add size="24" className="text-foreground"/>
  },
};

