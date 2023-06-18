import React, { FC } from "react";
import clsx from "clsx";

export type CellProps = {
    cells: Cell[],
    className?: string
}

export type Cell = {
    label: string
    value: string | number,
    importance: "low" | "high"
}

export const Cells: FC<CellProps> = ({cells, className}) => {
    return (
        <>
            <div className={clsx("flex flex-wrap gap-8 overflow-hidden", className)}>
                {cells.map((cell) =>
                    <div key={cell.label} className="flex flex-col p-4  border-l basis-[16%] min-w-[150px] ml-[-1px] justify-between">
                        <p className="font-bold">{cell.label}</p>
                        <p>{cell.value}</p>
                    </div>
                )}
            </div>
        </>
    )
};
