import React, { FC } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid"
import clsx from "clsx";

export type NumericInputProps = {
    value?: number
    onChange: (value: number) => void
    min?: number
    max?: number
    className?: string
}

export const NumericInput: FC<NumericInputProps> = ({value, onChange, min, max, className}) => {

    function decrementValue() {
        handleValueChange(value - 1)
    }

    function incrementValue() {
        handleValueChange(value + 1)
    }

    function onValueChange(event: any) {
        handleValueChange(+event.target.value)
    }

    function handleValueChange(value) {
        if (Number.isNaN(value)) {return}
        if (min!== undefined && value < min) {
            onChange(min);
            return;
        }
        if (max !== undefined && value > max) {
            onChange(max);
            return;
        }
        onChange(value)
    }

    return (
        <div className={clsx(className, "inline-block")}>
            <div className="inline-flex border">
                <input className="border-r min-w-[50px] w-full pl-2" value={value} onChange={onValueChange}/>
                <div>
                    <ChevronUpIcon className="h-4 w-4 border-b" aria-hidden="true" onClick={incrementValue}/>
                    <ChevronDownIcon className="h-4 w-4" aria-hidden="true" onClick={decrementValue}/>
                </div>
            </div>
        </div>
    )
};
