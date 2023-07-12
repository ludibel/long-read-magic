import React, { FC } from "react";
import Select, { Options } from "react-select";

export type SelectProps = {
    options: Options<{ label: string, value: any }>;
    onChange: (event: any) => void;
    value?: { label: string, value: any };
    id: string;
    placeholder?: string;
}

export const Dropdown: FC<SelectProps> = ({options, onChange, value, id,placeholder}) => {
    return (
        <Select options={options}
                onChange={onChange}
                unstyled={true}
                value={value}
                inputId="ww"
                placeholder={placeholder}
                classNames={{
                    control: (state) =>
                        "bg-white border border-gray-300 p-2 rounded focus:outline-none flex w-[200px]",
                    option: (state) => "p-2 bg-white hover:bg-gray-100",
                    menu: (state) => "border"
                }}/>
    )
};
