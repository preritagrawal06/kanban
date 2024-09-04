import { motion } from "framer-motion";
import DropIndicator from "./DropIndicator";

type CardProp = {
    description: string,
    id: string,
    column: string,
    handleDragStart: any
}

const Card = ({description, id, column, handleDragStart}: CardProp) => {
    return ( 
        <>
            <DropIndicator beforeId={id} column={column}/>
            <motion.div layout layoutId={id} draggable="true" onDragStart={(e)=>{handleDragStart(e, {description, id, column})}} key={id} className="cursor-grab active:cursor-grabbing rounded border border-neutral-700 bg-neutral-800 p-3">
                <p className="text-sm text-neutral-100">{description}</p>
            </motion.div>
        </>
    );
}
 
export default Card;