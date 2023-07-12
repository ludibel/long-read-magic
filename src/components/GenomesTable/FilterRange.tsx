import React, { FC } from 'react';
import { NumericInput } from "@/components/NumericInput";

export type FilterRangeProps = {
    label: string
    min: number
    max: number
    minBoundary?: number
    maxBoundary?: number
    onMinChange: (value: number) => void
    onMaxChange: (value: number) => void
}

export const FilterRange: FC<FilterRangeProps> = ({label, min, max, minBoundary, maxBoundary, onMinChange, onMaxChange}) => {
    return (
        <div>
            <p className="font-bold mb-2">{label}</p>
            <NumericInput value={min} className="w-[120px]" min={minBoundary} max={maxBoundary}
                          onChange={onMinChange}/>
            <span> - </span>
            <NumericInput value={max} className="w-[120px]" min={minBoundary} max={maxBoundary}
                          onChange={onMaxChange}/>
        </div>
    )
};
