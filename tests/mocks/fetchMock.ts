const fetchMock = jest.fn(() =>
	Promise.resolve({
		ok: true,
		json: () => Promise.resolve({ data: "test" }),
		statusText: "OK",
	})
) as jest.Mock

export default fetchMock
