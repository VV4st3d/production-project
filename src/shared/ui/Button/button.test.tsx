import {render, screen} from "@testing-library/react";
import {Button, ThemeButton} from "shared/ui/Button/Button";

describe('Button', function () {
    test('test button',()=>{
        render(
            <Button>Test</Button>
        )
        expect(screen.getByText('Test')).toBeInTheDocument()
    })
    test('test style button',()=>{
        render(
            <Button theme={ThemeButton.CLEAR}>Test</Button>
        )
        expect(screen.getByText('Test')).toHaveClass('clear')
    })
});
