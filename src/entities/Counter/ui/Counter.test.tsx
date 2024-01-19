import {screen} from "@testing-library/react";
import {ComponentRender} from "@/shared/lib/Tests/componentRender/componentRender";
import {Counter} from "./Counter";
import userEvent from "@testing-library/user-event";

describe('Counter', function () {
    test('',()=>{
        ComponentRender(
            <Counter/>,{
                initialState: {counter:{value:10}}
        }
        )
        expect(screen.getByTestId('value-title')).toHaveTextContent('10')
    })
    test('increment',()=>{
        ComponentRender(
            <Counter/>,{
                initialState: {counter:{value:10}}
            }
        )
        const incrementButton = screen.getByTestId('increment-btn')
        userEvent.click(incrementButton)
        expect(screen.getByTestId('value-title')).toHaveTextContent('11')
    })
    test('decrement',()=>{
        ComponentRender(
            <Counter/>,{
                initialState: {counter:{value:10}}
            }
        )
        userEvent.click(screen.getByTestId('decrement-btn'))
        expect(screen.getByTestId('value-title')).toHaveTextContent('9')
    })
});
