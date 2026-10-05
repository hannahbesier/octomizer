import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import  Textfield  from '../components/Textfield';

const meta = {
  title: 'Textfield',
  component: Textfield,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Textfield>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Primary: Story = {
args: {
    label: "label",
    value: "",
    setValue: () => {}
}
};

export const Password: Story = {
args: {
    label: "password",
    value: "null",
    setValue: () => {},
    password: true
}
};
export const Valable: Story = {
args: {
    label: "label",
    value: "null",
    setValue: () => {},
    valable: false
}
};