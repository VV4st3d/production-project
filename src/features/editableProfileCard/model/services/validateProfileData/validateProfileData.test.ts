import { validateProfileData } from './validateProfileData';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

import { ValidateProfileError } from '../../consts/consts';

const data = {
    first: 'Антон1231',
    lastname: 'Майоров123',
    age: 20,
    currency: Currency.EUR,
    country: Country.Russia,
    city: 'Likino123',
    username: 'admin',
    avatar: 'https://t3.ftcdn.net/jpg/04/94/77/88/360_F_494778843_LX41b5WqqZ3aTDxccu2UuYBqCWrQa2Ej.jpg',
};

describe('validateProfileData.test', () => {
    test('success', async () => {
        const result = validateProfileData(data);

        expect(result).toEqual([]);
    });
    test('without first and lastname', async () => {
        const result = validateProfileData({
            ...data,
            first: '',
            lastname: '',
        });

        expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
    });
    test('incorrect age', async () => {
        const result = validateProfileData({ ...data, age: undefined });

        expect(result).toEqual([ValidateProfileError.INCORRECT_AGE]);
    });
    test('incorrect country', async () => {
        const result = validateProfileData({ ...data, country: undefined });

        expect(result).toEqual([ValidateProfileError.INCORRECT_COUNTRY]);
    });
    test('incorrect all', async () => {
        const result = validateProfileData({});

        expect(result).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
            ValidateProfileError.INCORRECT_AGE,
            ValidateProfileError.INCORRECT_COUNTRY,
        ]);
    });
});
