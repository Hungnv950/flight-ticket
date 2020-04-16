const User = require('../../models/user.model');

exports.login = async function(req, res) {
    try {
        const { username, password } = req.body;

        const user = await User.authenticate(username, password);

        if (!user) {
            return res.status(401).send({error: 'Incorrect username or password'})
        }

        const token = await user.generateAuthToken();

        res.status(200).send({ user, token });
    } catch (error) {
        res.status(400).send(error)
    }
};