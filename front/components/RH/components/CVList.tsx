"use client";
import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { CheckIcon, Mail } from "lucide-react";
import React from "react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import {
    ColumnDef,
    SortingState,
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    ColumnFiltersState, flexRender,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const data = [
    { email: "john.doe@example.com", job: "Developer", cvScore: "90%", letterScore: "85%", total: 175 },
    { email: "jane.smith@example.com", job: "Designer", cvScore: "88%", letterScore: "92%", total: 180 },
    { email: "alice.wonderland@example.com", job: "Product Manager", cvScore: "75%", letterScore: "80%", total: 155 },
    { email: "bob.builder@example.com", job: "Data Scientist", cvScore: "95%", letterScore: "90%", total: 185 },
    { email: "charlie.chaplin@example.com", job: "DevOps Engineer", cvScore: "85%", letterScore: "87%", total: 172 },
];

const columns: ColumnDef<typeof data[0]>[] = [
    {
        accessorKey: "email",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Email
                <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="flex items-center space-x-2">
                <span className="lowercase">{row.getValue("email")}</span>
            </div>
        ),
    },
    {
        accessorKey: "job",
        header: "Job",
        cell: ({ row }) => <div className="capitalize">{row.getValue("job")}</div>,
    },
    {
        accessorKey: "cvScore",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="text-right"
            >
                CV Score
                <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="text-center font-medium">{row.getValue("cvScore")}</div>,
    },
    {
        accessorKey: "letterScore",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="text-right"
            >
                Lettre de Motivation Score
                <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="text-center font-medium">{row.getValue("letterScore")}</div>,
    },
    {
        accessorKey: "total",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="text-right"
            >
                Total
                <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="text-center font-medium">{row.getValue("total")}</div>,
    },
    {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => (
            <Button
                variant="outline"
                size="sm"
                onClick={() => sendEmail(row.getValue("email"))}
            >
                <Mail className="h-4 w-4" />
            </Button>
        ),
    },
];

const sendEmail = async (email: string) => {
    const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            to: email,
            subject: "Votre candidature a été sélectionnée",
            html: "<p>Votre candidature a été sélectionnée. Nous vous recontacterons dans les plus brefs délais.</p>",
        }),
    });

    if (response.ok) {
        alert("Email envoyé avec succès !");
    } else {
        alert("Erreur lors de l'envoi de l'email.");
    }
};

export const CVList = () => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [rowSelection, setRowSelection] = React.useState({});

    const filteredJobs = Array.from(new Set(data.map(item => item.job)));

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnFilters,
            rowSelection,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    return (
        <div className="h-full w-full max-w-5xl mt-32 mx-auto">
            <div className="flex items-center justify-between">
                <AnimatedGradientText>
                    <h1 className="animate-gradient bg-gradient-to-r from-[#6157ff] via-[#EE49FD] to-[#6157ff] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent text-3xl text-center pb-2">
                        LISTE CV SCORE
                    </h1>
                </AnimatedGradientText>
                <div className="flex space-x-5">
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-[200px] justify-between"
                            >
                                {value || "Choisi un job..."}
                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandInput placeholder="Rechercher Job..." className="h-9" />
                                <CommandList>
                                    <CommandEmpty>No job found.</CommandEmpty>
                                    <CommandGroup>
                                        {filteredJobs.map((job) => (
                                            <CommandItem
                                                key={job}
                                                value={job}
                                                onSelect={(currentValue) => {
                                                    setValue(currentValue === value ? "" : currentValue);
                                                    setColumnFilters([{ id: "job", value: currentValue }]);
                                                    setOpen(false);
                                                }}
                                            >
                                                {job}
                                                <CheckIcon
                                                    className={cn(
                                                        "ml-auto h-4 w-4",
                                                        value === job ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <div>
                        <Input
                            className="rounded"
                            placeholder="🔎   Rechercher"
                            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn("email")?.setFilterValue(event.target.value)
                            }
                        />
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <div className="rounded-md border overflow-auto max-h-96">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">No results.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Previous</Button>
                    <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</Button>
                </div>
            </div>
        </div>
    );
}
