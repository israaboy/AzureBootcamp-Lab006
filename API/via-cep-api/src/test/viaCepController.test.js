const viaCepController = require('../controllers/viaCepController');
const axios = require('axios');

jest.mock('axios');

describe('ViaCepController.getAddressByCep', () => {
    let req, res;

    beforeEach(() => {
        req = { params: { cep: '01001000' } };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        jest.clearAllMocks();
    });

    it('should return address data for a valid CEP', async () => {
        const mockData = { cep: '01001-000', logradouro: 'Praça da Sé', erro: undefined };
        axios.get.mockResolvedValue({ data: mockData });

        await viaCepController.getAddressByCep(req, res);

        expect(axios.get).toHaveBeenCalledWith('https://viacep.com.br/ws/01001000/json/');
        expect(res.json).toHaveBeenCalledWith(mockData);
        expect(res.status).not.toHaveBeenCalledWith(404);
    });

    it('should return 404 if CEP is not found', async () => {
        axios.get.mockResolvedValue({ data: { erro: true } });

        await viaCepController.getAddressByCep(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'CEP not found' });
    });

    it('should return 500 if axios throws an error', async () => {
        axios.get.mockRejectedValue(new Error('Network error'));

        await viaCepController.getAddressByCep(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Error fetching data from Via CEP',
            error: 'Network error'
        });
    });
});

// We recommend installing an extension to run jest tests.