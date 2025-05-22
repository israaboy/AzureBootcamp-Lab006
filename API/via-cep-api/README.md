# Via CEP API

This project is a simple Node.js API that fetches address data from the Via CEP service based on a provided CEP (Postal Code) and returns it in JSON format.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/via-cep-api.git
   ```

2. Navigate to the project directory:
   ```
   cd via-cep-api
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To start the server, run the following command:
```
npm start
```

The server will start on `http://localhost:3000`.

## API Endpoints

### Get Address by CEP

- **Endpoint:** `/cep/:cep`
- **Method:** `GET`
- **Description:** Fetches address information based on the provided CEP.
- **Parameters:**
  - `cep`: The postal code for which to fetch the address.

#### Example Request
```
GET http://localhost:3000/cep/01001-000
```

#### Example Response
```json
{
  "cep": "01001-000",
  "logradouro": "Praça da Sé",
  "complemento": "lado ímpar",
  "bairro": "Sé",
  "localidade": "São Paulo",
  "uf": "SP",
  "ibge": "3550308",
  "gia": "1004",
  "ddd": "11",
  "siafi": "7087"
}
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.