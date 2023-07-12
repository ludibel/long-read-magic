import React, { forwardRef } from "react"
import Image from "next/image";
import clsx from "clsx"

const OuterContainerr = (props, ref) => {
    return (
        <div ref={ref} className={clsx("sm:px-8", props.className)} {...props}>
            {props.bgClassName && <div className={clsx("absolute -z-20 top-0", props.bgClassName)}></div>}
            <div className="mx-auto max-w-7xl lg:px-8">{props.children}</div>
        </div>
    )
};

const InnerContainerr = (props, ref) => {
    return (
        <div
            ref={ref}
            className={clsx("relative px-4 sm:px-8 lg:px-12", props.className)}
            {...props}
        >
            <div className="mx-auto max-w-2xl lg:max-w-5xl">{props.children}</div>
        </div>
    )
};

const Containerr =  (props, ref) => {
    return (
        <OuterContainer ref={ref} {...props}>
                <InnerContainer {...props.inner}>{props.children}</InnerContainer>
        </OuterContainer>
    )
};

const OuterContainer = forwardRef(OuterContainerr);
const InnerContainer = forwardRef(InnerContainerr);
export const Container = forwardRef(Containerr);


// @ts-ignore
Container.Outer = OuterContainer
// @ts-ignore
Container.Inner = InnerContainer
