import { Button } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Playground: Story = {
  args: {
    children: 'vasco',
    variant: 'default',
    size: 'lg',
  },
};

export const Ghost: Story = {
  args: {
    children: 'cachacinha',
    variant: 'ghost',
    size: 'lg',
  },
};

export const Danger: Story = {
  args: {
    children: 'latinha',
    variant: 'danger',
    size: 'lg',
  },
};