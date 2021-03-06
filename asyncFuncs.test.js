const fetch = require('node-fetch');
const swapi = require('./asyncFuncs');


it('Test SWAPI to get people', () => {

	expect.assertions(2)
	return swapi.getPeople(fetch).then(data => {
		expect(data.count).toEqual(87);
		expect(data.results.length).toBeGreaterThan(5);
	});
})

it('Test SWAPI ( async await ) to get people', () => {


	expect.assertions(1);
	return swapi.getPeopleAsyncAwait(fetch).then(data => {
		expect(data.count).toEqual(87);
	});
})

it('Mock getPeople API call', () => {

	const mockFetch = jest.fn()
		.mockReturnValue(Promise.resolve({
			json: () => Promise.resolve({
				count: 87,
				results : [0,1,2,3,4,5]
			})
		}));

	expect.assertions(4);
	return swapi.getPeople(mockFetch).then(data => {

		expect(mockFetch.mock.calls.length).toBe(1);
		expect(mockFetch).toBeCalledWith('https://swapi.co/api/people');
		expect(data.count).toEqual(87);
		expect(data.results.length).toBeGreaterThan(5);
	})
})