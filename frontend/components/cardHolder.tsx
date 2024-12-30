"use client";
import React from "react";

const CardHolder = (props: {children: React.ReactNode }) => {
    const num: number = props.children ? React.Children.count(props.children) : 0;
    return (
        <div className={`grid grid-cols-${Math.ceil(num/3)} md:grid-cols-3 gap-4`}>
            {props.children}
        </div>
    );
}

export default CardHolder;