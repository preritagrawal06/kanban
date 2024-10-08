import { useState, DragEvent } from "react";
import Card from "./Card";
import AddCard from "./AddCard";
import DropIndicator from "./DropIndicator";
import { getIndicators } from "../lib/utils/getIndicators";
import { getNearestIndicator } from "../lib/utils/getNearestIndicator";
import { clearHighlight } from "../lib/utils/clearHighlight";
import { highlightIndicator } from "../lib/utils/highlightIndicator";
import { useTodoStore } from "@/lib/stores/todoStore";

type CardProp = {
    description: string,
    id: string,
    column: string
}

type ColumnProp = {
    title: string,
    headingColor: string,
    column: string,
}

const Column = ({ title, headingColor, column }: ColumnProp) => {
    const [active, setActive] = useState(false)
    const cards = useTodoStore((state: any) => state.todos)
    const transferTodo = useTodoStore((state: any) => state.transferTodo)
    const updateTodo = useTodoStore((state: any) => state.updateTodo)
    const filteredCards = cards.filter((c: CardProp) => c.column === column)


    const handleDragStart = (e: DragEvent<HTMLDivElement>, card: CardProp) => {
        e.dataTransfer.setData("cardId", card.id)
    }

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        highlightIndicator(e, column)
        setActive(true)
    }

    const handleDragLeave = () => {
        clearHighlight(null, column)
        setActive(false)
    }

    const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
        clearHighlight(null, column)
        setActive(false)
        const cardId = e.dataTransfer.getData("cardId")
        const indicators = getIndicators(column)
        const { element } = getNearestIndicator(e, indicators)
        const before = element.dataset.before || "-1"

        if (before !== cardId) {
            let copy = [...cards];
            let cardToTransfer = copy.find((c: CardProp) => c.id == cardId) // comparision of int and string
            
            if (!cardToTransfer) return;

            if(cardToTransfer.column !== column){
                updateTodo(column, cardToTransfer.id)
                cardToTransfer = { ...cardToTransfer, column }
            }

            copy = copy.filter((c: CardProp) => c.id != cardId)

            const moveToBack = before || "-1"

            if (moveToBack === "-1") {
                copy.push(cardToTransfer)
            } else {
                const insertAtIndex = copy.findIndex((el: CardProp) => el.id === before)

                if (insertAtIndex === undefined) return;
                copy.splice(insertAtIndex, 0, cardToTransfer)
            }
            transferTodo(copy)
        }
    }

    return (
        <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDragEnd} className="w-56 shrink-0">
            <div className="mb-3 flex items-center justify-between">
                <h3 className={`font-medium ${headingColor}`}>
                    {title}
                </h3>
                <span className="rounded text-sm text-neutral-400">
                    {filteredCards.length}
                </span>
            </div>
            <div className={`h-full w-full ${active ? 'bg-neutral-800/50' : 'bg-neutral-800/0'}`}>
                {
                    filteredCards.map((c: CardProp) => {
                        return (
                            <Card key={c.id} {...c} handleDragStart={handleDragStart} />
                        )
                    })
                }
                <DropIndicator beforeId="-1" column={column} />
                <AddCard column={column} />
            </div>
        </div>
    );
}

export default Column;