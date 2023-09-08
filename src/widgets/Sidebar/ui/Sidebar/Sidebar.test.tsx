import {fireEvent, screen} from "@testing-library/react";
import {Sidebar} from "widgets/Sidebar";
import {withTranslation} from "react-i18next";
import {renderWithTranslation} from "shared/lib/tests/renderWithTranslation/renderWithTranslation";

describe('Sidebar', function () {
    test('test sidebar',()=>{
        renderWithTranslation(
            <Sidebar/>
        )
        expect(screen.getByTestId('sidebar')).toBeInTheDocument()
    })
    test('test toggle',()=>{
        renderWithTranslation(
            <Sidebar/>
        )
        const toggle = screen.getByTestId('sidebar-toggle')
        screen.debug()
        expect(screen.getByTestId('sidebar')).toBeInTheDocument()
        fireEvent.click(toggle)
        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed')
    })
});
