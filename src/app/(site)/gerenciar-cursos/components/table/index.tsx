/** biome-ignore-all lint/style/noNestedTernary: using on table */
/** biome-ignore-all lint/nursery/noShadow: using on table */
/** biome-ignore-all lint/style/useBlockStatements: using on table */
/** biome-ignore-all lint/correctness/useExhaustiveDependencies: using on table */
/** biome-ignore-all lint/a11y/noStaticElementInteractions: using on table */
/** biome-ignore-all lint/nursery/noNoninteractiveElementInteractions: using on table */
"use client";

import {
  type Cell,
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  type FilterFn,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  type Header,
  type HeaderGroup,
  type Table as ReactTable,
  type Row,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  Columns3Icon,
  EllipsisIcon,
  FilterIcon,
  ListFilterIcon,
} from "lucide-react";
import { useId, useMemo, useState } from "react";
import { Dropdown, Input } from "@/components";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { Course } from "@/types";

export interface TableAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: (course: Course) => void;
  variant?: "default" | "destructive";
}

interface MyCoursesTableProps {
  data: Course[];
  actions?: TableAction[];
  isLoading?: boolean;
  searchPlaceholder?: string;
}

const COLUMN_LABELS = {
  title: "Título",
  status: "Status",
  duration: "Duração",
  createdAt: "Criado em",
  updatedAt: "Atualizado em",
} as const;

const STATUS_DISPLAY = {
  ACTIVE: "Publicado",
  INACTIVE: "Arquivado",
} as const;

const multiColumnFilterFn: FilterFn<Course> = (row, _, filterValue) => {
  const searchableContent =
    `${row.original.title} ${row.original.description}`.toLowerCase();
  const searchTerm = (filterValue ?? "").toLowerCase();
  return searchableContent.includes(searchTerm);
};

const statusFilterFn: FilterFn<Course> = (
  row,
  columnId,
  filterValue: string[]
) => {
  if (!filterValue?.length) return true;
  const status = row.getValue(columnId) as string;
  return filterValue.includes(status);
};

const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return hours > 0
    ? `${hours}h ${remainingMinutes}min`
    : `${remainingMinutes}min`;
};

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
};

const TitleCell = ({ row }: { row: Row<Course> }) => (
  <div className="min-w-0 space-y-1">
    <div className="font-semibold text-foreground leading-tight">
      {row.getValue("title")}
    </div>
    <div className="max-w-[300px] truncate text-muted-foreground/80 text-sm leading-relaxed">
      {row.original.description}
    </div>
  </div>
);

const StatusCell = ({ row }: { row: Row<Course> }) => {
  const status = row.getValue("status") as keyof typeof STATUS_DISPLAY;
  return (
    <Badge
      className="font-medium"
      variant={status === "ACTIVE" ? "default" : "secondary"}
    >
      {STATUS_DISPLAY[status]}
    </Badge>
  );
};

const DurationCell = ({ row }: { row: Row<Course> }) => (
  <span className="font-medium text-foreground tabular-nums">
    {formatDuration(row.getValue("duration"))}
  </span>
);

const DateCell = ({
  row,
  accessor,
}: {
  row: Row<Course>;
  accessor: string;
}) => (
  <span className="text-muted-foreground text-sm tabular-nums">
    {formatDate(row.getValue(accessor))}
  </span>
);

const RowActions = ({
  row,
  actions,
}: {
  row: Row<Course>;
  actions: TableAction[];
}) => {
  const dropdownOptions = actions.map((action) => ({
    id: action.id,
    label: action.label,
    icon: action.icon,
    selected: false,
    action: () => action.onClick(row.original),
  }));

  return (
    <div className="flex justify-end">
      <Dropdown align="end" options={dropdownOptions}>
        <Button
          aria-label="Abrir menu"
          className="h-8 w-8 p-0 text-muted-foreground shadow-none hover:text-foreground"
          size="icon"
          variant="ghost"
        >
          <EllipsisIcon size={16} />
        </Button>
      </Dropdown>
    </div>
  );
};

const createColumns = (actions: TableAction[] = []): ColumnDef<Course>[] => [
  {
    header: "Título",
    accessorKey: "title",
    cell: TitleCell,
    size: 300,
    filterFn: multiColumnFilterFn,
    enableHiding: false,
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: StatusCell,
    size: 100,
    filterFn: statusFilterFn,
  },
  {
    header: "Duração",
    accessorKey: "duration",
    cell: DurationCell,
    size: 120,
  },
  {
    header: "Criado em",
    accessorKey: "createdAt",
    cell: ({ row }) => <DateCell accessor="createdAt" row={row} />,
    size: 120,
  },
  {
    header: "Atualizado em",
    accessorKey: "updatedAt",
    cell: ({ row }) => <DateCell accessor="updatedAt" row={row} />,
    size: 120,
  },
  ...(actions.length > 0
    ? [
        {
          id: "actions" as const,
          header: () => <span className="sr-only">Ações</span>,
          cell: ({ row }: { row: Row<Course> }) => (
            <RowActions actions={actions} row={row} />
          ),
          size: 60,
          enableHiding: false,
        },
      ]
    : []),
];

const LoadingSkeleton = ({ actions }: { actions: TableAction[] }) => (
  <div className="space-y-4">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="h-10 w-60 animate-pulse rounded bg-muted/50" />
        <div className="h-10 w-20 animate-pulse rounded bg-muted/50" />
        <div className="h-10 w-16 animate-pulse rounded bg-muted/50" />
      </div>
    </div>

    <div className="overflow-hidden rounded-md border bg-background">
      <Table className="table-fixed">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            {Object.entries(COLUMN_LABELS).map(([key, label]) => (
              <TableHead
                className="h-11 font-semibold text-foreground"
                key={key}
                style={{ width: key === "title" ? "300px" : "120px" }}
              >
                {label}
              </TableHead>
            ))}
            {actions.length > 0 && (
              <TableHead className="h-11" style={{ width: "60px" }} />
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="space-y-2">
                  <div className="h-4 animate-pulse rounded bg-muted/40" />
                  <div className="h-3 w-3/4 animate-pulse rounded bg-muted/30" />
                </div>
              </TableCell>
              <TableCell>
                <div className="h-6 w-20 animate-pulse rounded bg-muted/40" />
              </TableCell>
              <TableCell>
                <div className="h-4 w-16 animate-pulse rounded bg-muted/40" />
              </TableCell>
              <TableCell>
                <div className="h-4 w-24 animate-pulse rounded bg-muted/40" />
              </TableCell>
              <TableCell>
                <div className="h-4 w-24 animate-pulse rounded bg-muted/40" />
              </TableCell>
              {actions.length > 0 && (
                <TableCell>
                  <div className="h-8 w-8 animate-pulse rounded bg-muted/40" />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
);

const TableFilters = ({
  table,
  searchPlaceholder,
  uniqueStatusValues,
  statusCounts,
  selectedStatuses,
  handleStatusChange,
  id,
}: {
  table: ReactTable<Course>;
  searchPlaceholder: string;
  uniqueStatusValues: string[];
  statusCounts: Map<string, number>;
  selectedStatuses: string[];
  handleStatusChange: (checked: boolean, value: string) => void;
  id: string;
}) => (
  <div className="flex flex-wrap items-center justify-between gap-3">
    <div className="flex items-center gap-3">
      {/* Search filter */}
      <div className="relative">
        <Input
          aria-label="Filtrar por título ou descrição"
          className="bg-white"
          disabled={table.getRowModel().rows?.length === 0}
          leftIcon={<ListFilterIcon aria-hidden="true" size={16} />}
          onChange={(e) =>
            table.getColumn("title")?.setFilterValue(e.target.value)
          }
          placeholder={searchPlaceholder}
          shouldShowError={false}
          type="text"
          value={(table.getColumn("title")?.getFilterValue() ?? "") as string}
        />
      </div>

      {/* Status filter */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className="text-muted-foreground"
            disabled={table.getRowModel().rows?.length === 0}
            variant="outline"
          >
            <FilterIcon aria-hidden="true" size={16} />
            Status
            {selectedStatuses.length > 0 && (
              <span className="-me-1 inline-flex h-5 max-h-full items-center rounded border bg-background px-1 font-[inherit] font-semibold text-[0.625rem] text-muted-foreground/80">
                {selectedStatuses.length}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto min-w-36 p-3">
          <div className="space-y-3">
            <div className="font-semibold text-muted-foreground text-xs uppercase tracking-wide">
              Filtros
            </div>
            <div className="space-y-3">
              {uniqueStatusValues.map((value, index) => (
                <div className="flex items-center gap-2" key={value}>
                  <Checkbox
                    checked={selectedStatuses.includes(value)}
                    id={`${id}-${index}`}
                    onCheckedChange={(checked: boolean) =>
                      handleStatusChange(checked, value)
                    }
                  />
                  <Label
                    className="flex grow cursor-pointer justify-between gap-2 font-medium text-foreground"
                    htmlFor={`${id}-${index}`}
                  >
                    {STATUS_DISPLAY[value as keyof typeof STATUS_DISPLAY]}
                    <span className="ms-2 font-normal text-muted-foreground/70 text-xs tabular-nums">
                      {statusCounts.get(value)}
                    </span>
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Column visibility toggle */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="text-muted-foreground"
            disabled={table.getRowModel().rows?.length === 0}
            variant="outline"
          >
            <Columns3Icon aria-hidden="true" size={16} />
            Visualizar
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="font-semibold">
            Alternar colunas
          </DropdownMenuLabel>
          {table
            .getAllColumns()
            .filter((column: Column<Course, unknown>) => column.getCanHide())
            .map((column: Column<Course, unknown>) => (
              <DropdownMenuCheckboxItem
                checked={column.getIsVisible()}
                className="font-medium"
                key={column.id}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                onSelect={(event) => event.preventDefault()}
              >
                {COLUMN_LABELS[column.id as keyof typeof COLUMN_LABELS] ||
                  column.id}
              </DropdownMenuCheckboxItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
);

const DataTable = ({
  table,
  columns,
}: {
  table: ReactTable<Course>;
  columns: ColumnDef<Course>[];
}) => (
  <div className="overflow-hidden rounded-md border bg-background">
    <Table className="table-fixed">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup: HeaderGroup<Course>) => (
          <TableRow
            className="border-b hover:bg-transparent"
            key={headerGroup.id}
          >
            {headerGroup.headers.map((header: Header<Course, unknown>) => (
              <TableHead
                className="h-11 bg-muted/30 font-semibold text-foreground"
                key={header.id}
                style={{ width: `${header.getSize()}px` }}
              >
                {header.isPlaceholder ? null : header.column.getCanSort() ? (
                  <div
                    className={cn(
                      "flex h-full cursor-pointer select-none items-center justify-between gap-2 transition-colors hover:text-foreground/80"
                    )}
                    onClick={header.column.getToggleSortingHandler()}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        header.column.getToggleSortingHandler()?.(e);
                      }
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: (
                        <ChevronUpIcon
                          aria-hidden="true"
                          className="shrink-0 opacity-70"
                          size={16}
                        />
                      ),
                      desc: (
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="shrink-0 opacity-70"
                          size={16}
                        />
                      ),
                    }[header.column.getIsSorted() as string] ?? null}
                  </div>
                ) : (
                  flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )
                )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row: Row<Course>) => (
            <TableRow
              className="transition-colors hover:bg-muted/20"
              key={row.id}
            >
              {row.getVisibleCells().map((cell: Cell<Course, unknown>) => (
                <TableCell className="py-3 last:py-0" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              className="h-24 text-center font-medium text-muted-foreground/80"
              colSpan={columns.length}
            >
              Nenhum curso encontrado.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </div>
);

export const MyCoursesTable = ({
  data,
  actions = [],
  isLoading = false,
  searchPlaceholder = "Filtrar por título ou descrição...",
}: MyCoursesTableProps) => {
  const id = useId();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [sorting, setSorting] = useState<SortingState>([
    { id: "title", desc: false },
  ]);

  const columns = useMemo(() => createColumns(actions), [actions]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: { sorting, columnFilters, columnVisibility },
  });

  const uniqueStatusValues = useMemo(() => {
    const statusColumn = table.getColumn("status");
    if (!statusColumn) return [];
    return Array.from(statusColumn.getFacetedUniqueValues().keys()).sort();
  }, [table.getColumn("status")?.getFacetedUniqueValues()]);

  const statusCounts = useMemo(() => {
    const statusColumn = table.getColumn("status");
    return statusColumn?.getFacetedUniqueValues() ?? new Map();
  }, [table.getColumn("status")?.getFacetedUniqueValues()]);

  const selectedStatuses = useMemo(() => {
    const filterValue = table.getColumn("status")?.getFilterValue() as string[];
    return filterValue ?? [];
  }, [table.getColumn("status")?.getFilterValue()]);

  const handleStatusChange = (checked: boolean, value: string) => {
    const currentFilter = table
      .getColumn("status")
      ?.getFilterValue() as string[];
    const newFilter = currentFilter ? [...currentFilter] : [];

    if (checked) {
      newFilter.push(value);
    } else {
      const index = newFilter.indexOf(value);
      if (index > -1) newFilter.splice(index, 1);
    }

    table
      .getColumn("status")
      ?.setFilterValue(newFilter.length ? newFilter : undefined);
  };

  if (isLoading) {
    return <LoadingSkeleton actions={actions} />;
  }

  return (
    <div className="space-y-4">
      <TableFilters
        handleStatusChange={handleStatusChange}
        id={id}
        searchPlaceholder={searchPlaceholder}
        selectedStatuses={selectedStatuses}
        statusCounts={statusCounts}
        table={table}
        uniqueStatusValues={uniqueStatusValues}
      />
      <DataTable columns={columns} table={table} />
    </div>
  );
};
