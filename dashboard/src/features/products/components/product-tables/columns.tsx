'use client';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import type { Product } from '../../api/types';
import { Column, ColumnDef } from '@tanstack/react-table';
import { Icons } from '@/components/icons';
import Image from 'next/image';
import { CellAction } from './cell-action';
import { CATEGORY_OPTIONS } from './options';

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'photo_url',
    header: 'IMAGE',
    cell: ({ row }) => {
      const photoUrl = (row.getValue('photo_url') as string) || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150';
      return (
        <div className='relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-muted border'>
          <Image
            src={photoUrl}
            alt={row.getValue('name') || 'Product'}
            fill
            sizes='48px'
            className='object-cover'
          />
        </div>
      );
    }
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }: { column: Column<Product, unknown> }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<Product['name']>()}</div>,
    meta: {
      label: 'Name',
      placeholder: 'Search products...',
      variant: 'text',
      icon: Icons.text
    },
    enableColumnFilter: true
  },
  {
    id: 'category',
    accessorKey: 'category',
    enableSorting: false,
    header: ({ column }: { column: Column<Product, unknown> }) => (
      <DataTableColumnHeader column={column} title='Category' />
    ),
    cell: ({ cell }) => {
      const status = cell.getValue<Product['category']>();
      const Icon = status === 'active' ? Icons.circleCheck : Icons.xCircle;

      return (
        <Badge variant='outline' className='capitalize'>
          <Icon />
          {status}
        </Badge>
      );
    },
    enableColumnFilter: true,
    meta: {
      label: 'categories',
      variant: 'multiSelect',
      options: CATEGORY_OPTIONS
    }
  },
  {
    accessorKey: 'price',
    header: 'PRICE'
  },
  {
    accessorKey: 'description',
    header: 'DESCRIPTION'
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
