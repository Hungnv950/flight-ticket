const Bank = require('../../models/bank.model');

const User = require('../../models/user.model');

exports.index =  async function(req, res) {
    const user = await User.findById(req.user._id).populate('banks');

    res.status(200).send(user.banks);
};

exports.create = async function(req, res) {
    try {
        const user = await User.findById(req.user._id);

        const bank = new Bank(req.body);

        await bank.save();

        user.banks.push(bank);
  
        await user.save();

        res.status(201).send(bank);
    } catch (error) {
        res.status(400).send(error)
    }
};

exports.update =  async function(req, res) {
    try {
        const user = await User.findById(req.user._id);

        await updateOne({_id: req.params.id}, {$set: req.body});

        const bank = await Bank.findById(req.params.id);

        user.banks.push(bank);

        await user.save();

        res.status(200).send(bank);
    } catch (error) {
        res.status(400).send(error)
    }
};