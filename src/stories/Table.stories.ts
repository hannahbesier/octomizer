import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import  Table, { Column, TableProps }  from '../components/Table';

const meta = {
  title: 'Table',
  component: Table as React.ComponentType<TableProps<Items>>,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<TableProps<Items>>;
export default meta;
type Story = StoryObj<typeof meta>;
type Items = {
    col1: string,
    col2: string,
}
const items: Items[] = [
    {col1: "cell1", col2: "cell2"},
    {col1: "cell3", col2: "cell4"}
]
const column: Column<Items>[] = [
      {
        key: "col1",
        label: "Column 1",
      },
      {
        key: "col2",
        label: "Column 2",
        render: (_, col) => col.col2,
      }];
export const Default: Story = {args: {
column: column,
data: items,
mobile: false,
}};
export const Mobile: Story = {args: {
column: column,
data: items,
mobile: true,
}};