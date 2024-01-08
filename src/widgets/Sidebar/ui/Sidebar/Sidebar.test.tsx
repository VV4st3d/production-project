import {fireEvent, screen} from "@testing-library/react";
import {Sidebar} from "@/widgets/Sidebar";
import {ComponentRender} from "@/shared/config/Tests/componentRender/componentRender";

describe('Sidebar', function () {
    test('test sidebar',()=>{
        ComponentRender(
            <Sidebar/>
        )
        expect(screen.getByTestId('sidebar')).toBeInTheDocument()
    })
    test('test toggle',()=>{
        ComponentRender(
            <Sidebar/>
        )
        const toggle = screen.getByTestId('sidebar-toggle')
        screen.debug()
        expect(screen.getByTestId('sidebar')).toBeInTheDocument()
        fireEvent.click(toggle)
        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed')
    })
});
