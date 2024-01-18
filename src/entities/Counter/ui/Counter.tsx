import {Button} from "@/shared/ui/Button";
import {useCounterActions} from "../model/slice/counterSlice";
import {useCounterValue} from "../model/selectors/getCounterValue/getCounterValue";

interface CounterProps {
    className?: string,
}

export const Counter = ({className}:CounterProps) => {
    const counterValue = useCounterValue()
    const {decrement, add, increment} = useCounterActions()
    const handleInc = ()=>{
        increment()
    }
    const handleDec = ()=>{
        decrement()
    }
    const handleAddFive = ()=>{
        add(5)
    }
    return (
        <div>
            <h1 data-testid={'value-title'}>
                value = {counterValue}
            </h1>
            <Button onClick={handleInc} data-testid={'increment-btn'}>
                increment
            </Button>
            <Button onClick={handleDec} data-testid={'decrement-btn'}>
                decrement
            </Button>
            <Button onClick={handleAddFive} data-testid={'decrement-btn'}>
                add5
            </Button>
        </div>
    );
};
