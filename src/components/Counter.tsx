import React, {useState} from 'react';
import cls from './counter.module.scss'

export const Counter = () => {
    const [increment, setIncrement] = useState<number>(0)
    function Increment() {
        setIncrement(increment+1)
    }
    return (
        <div onClick={Increment}>
            <h1 className={cls.h1}>
                {increment}
            </h1>
        </div>
    );
};
