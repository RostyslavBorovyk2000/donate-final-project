import { render,screen } from  '@testing-library/react';
import AllCategoriesCardList from './AllCategoriesCardList';


jest.mock("axios", () => ({
    post: jest.fn(),
}));

describe('should render AllCategoriesCardList', ()=>{

    it("should expect component whith data-testid='allCategoriesCardList-test'", ()=>{
        render(<AllCategoriesCardList />);

        const view = screen.getByTestId('allCategoriesCardList-test');
        expect(view.getAttribute('data-testid')).toBe('allCategoriesCardList-test')
    })
});