class ViaCepController {
    /**
     * Retrieves address information for a given CEP (Brazilian postal code) using the ViaCEP API.
     *
     * @async
     * @function
     * @param {Object} req - Express request object.
     * @param {Object} req.params - Request parameters.
     * @param {string} req.params.cep - The CEP to search for.
     * @param {Object} res - Express response object.
     * @returns {Promise<void>} Returns a JSON response with address data, 404 if not found, or 500 on error.
     */
    async getAddressByCep(req, res) {
        const cep = req.params.cep;
        const axios = require('axios');

        // Verifica se o CEP contém apenas números
        if (/[^0-9]/.test(cep)) {
            return res.status(400).json({ message: 'O CEP deve conter apenas números, até que o governo mude.' });
        }
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            if (response.data.erro) {
            return res.status(404).json({ message: 'CEP not found' });
            }
            return res.json(response.data);
        } catch (error) {
            return res.status(500).json({ message: 'Error fetching data from Via CEP', error: error.message });
        }
    }
}

module.exports = new ViaCepController();