const axios = require('axios');
const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');

async function getPublicKey(jwksUrl, kid) {
    const response = await axios.get(jwksUrl);
    const jwks = response.data;
    const key = jwks.keys.find(k => k.kid === kid);
    if (!key) {
        throw new Error('Public key not found.');
    }
    return jwkToPem(key);
}

exports.verifyToken = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Assuming the token is sent in the Authorization header as 'Bearer {token}'
        const decodedToken = jwt.decode(token, { complete: true });
        const publicKey = await getPublicKey(process.env.JWKS_URL, decodedToken.header.kid);

        const options = { algorithms: ['RS256'], ignoreNotBefore: false };
        const validatedToken = jwt.verify(token, publicKey, options);

        res.status(200).json({
            status: 'success',
            message: 'Token is valid',
            data: validatedToken
        });
    } catch (err) {
        res.status(403).json({
            status: 'fail',
            message: err.message
        });
    }
};
