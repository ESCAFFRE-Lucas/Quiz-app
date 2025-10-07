"use client"

import {use} from "react";

export default function QuizPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = use(params);



    return <h1>Quiz Category: {category}</h1>;
}