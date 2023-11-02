import { render,screen} from  '@testing-library/react';
import CategoriesList from './CategoriesList';
import { BrowserRouter } from 'react-router-dom';


jest.mock("axios", () => ({
    post: jest.fn(),
}));

describe('should render CategoriesList', ()=>{

    it("should expect component whith data-testid='CategoriesList'", ()=>{
        render(
            <BrowserRouter>
                <CategoriesList />
            </BrowserRouter>);

        const view = screen.getByTestId('categoriesList');
        expect(view.getAttribute('data-testid')).toBe('categoriesList')

        const donate = screen.getByTestId('donate-svg-test');
        expect(donate.getAttribute('data-testid')).toBe('donate-svg-test');
    });
    it("should expect render element 'donate-svg-test'", ()=>{
        render(
            <BrowserRouter>
                <CategoriesList />
            </BrowserRouter>);

        const donate = screen.getByTestId('donate-svg-test');
        expect(donate.getAttribute('data-testid')).toBe('donate-svg-test');
    });
    it("should expect render element 'buy-svg-test'", ()=>{
        render(
            <BrowserRouter>
                <CategoriesList />
            </BrowserRouter>);

        const buy = screen.getByTestId('buy-svg-test');
        expect(buy.getAttribute('data-testid')).toBe('buy-svg-test');
    });
    it("should expect render element 'auction-svg-test'", ()=>{
        render(
            <BrowserRouter>
                <CategoriesList />
            </BrowserRouter>);

        const auction = screen.getByTestId('auction-svg-test');
        expect(auction.getAttribute('data-testid')).toBe('auction-svg-test');
    });
    it('should have the component "button"', () => {
        render(
          <BrowserRouter>
            <CategoriesList />
          </BrowserRouter>
        );
    
        const button = screen.getByTestId('button');
        expect(button.getAttribute('data-testid')).toBe('button');
    });
});