import axios from 'axios';
import mockAxios from 'jest-mock-axios';

const mockedAxios = mockAxios(axios);

jest.mock('axios', () => mockedAxios);