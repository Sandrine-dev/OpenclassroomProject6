const Sauces = require('../models/sauces');
const fs = require('fs');

exports.create = (req, res, next) => {
    const sauceObjet = JSON.parse(req.body.sauce);
    delete req.body._id;
    sauceObjet.likes = 0;
    sauceObjet.dislikes = 0;
    sauceObjet.usersLiked = [];
    sauceObjet.usersDisliked =[];
    const sauce = new Sauces ({
        ...sauceObjet,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistré !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.modify = (req, res, next) => {
    const sauceModifie = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    Sauces.updateOne ({ _id: req.params.id }, {...sauceModifie, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifié !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.delete = (req, res, next) => {
    Sauces.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauces.deleteOne ({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce supprimé !'}))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json ({error}));
};

exports.getOne = (req, res, next) => {
    Sauces.findOne ({ _id: req.params.id })
        .then((sauce) => res.status(200).json(sauce))
        .catch(error => res.status(400).json({ error }));
};

exports.getAll = (req, res, next) => {
    Sauces.find()
        .then((sauces) => res.status(200).json(sauces))
        .catch(error => res.status(500).json({ error }));
};

exports.like = (req, res , next) => {
    const sauceLike = req.body.like;
    const user = req.body.userId;

    Sauces.findOne ({ _id: req.params.id })
    .then(sauce => {
        nombreLike = sauce.likes;
        nombreDislike = sauce.dislikes;
        tableLike = sauce.usersLiked;
        tableDislike = sauce.usersDisliked;

        if (sauceLike === 0) {
            if( tableLike.filter(userId => userId === user)[0] === user ){
                nombreLike -= 1;
                tableLike = tableLike.filter(userId => userId != user);

            } else if (tableDislike.filter(userId => userId === user)[0] === user) {
                nombreDislike -=1;
                tableDislike = tableDislike.filter(userId => userId != user);
            }
        } else if (sauceLike === 1) {
            nombreLike += 1;
            tableLike.push(user);

        } else if (sauceLike === -1) {
            nombreDislike += 1;
            tableDislike.push(user);
        }
    Sauces.updateOne ({ _id: req.params.id}, {likes: nombreLike, usersLiked: tableLike, dislikes: nombreDislike, usersDisliked: tableDislike})
        .then(() =>res.status(200).json({ message: 'Votre avis à été pris en compte!'}))
        .catch(error => res.status(400).json({ error }))
    })
    .catch(error => res.status(400).json({ error }));
};