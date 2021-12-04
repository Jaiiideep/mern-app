const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const db = require('../models');
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).json('No Token');
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).json('Unauthorized');
        }
        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            return res.status(500).json('Error: ' + err);
        }
        Role.find(
            {
                _id: { $in: user.roles }
            },
            (err, roles) => {
                if (err) {
                    return res.status(500).json('Error: ' + err);
                }

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === 'admin') {
                        next();
                        return;
                    }
                }
                res.status(403).json('Required Admin Role');
                return;
            }
        );
    });
};

isModerator = (req, res, next) => {
    User.findById(req.userId)
        .exec((err, user) => {
            if (err) {
                res.status(500).json('Error: ' + err);
                return;
            }

            Role.find(
                {
                    _id: { $in: user.roles }
                },
                (err, roles) => {
                    if (err) {
                        res.status(500).json('Error: ' + err);
                        return;
                    }
                    for (let i = 0; i < roles.length; i++) {
                        if (roles[i].name === 'moderator') {
                            next();
                            return;
                        }
                    }
                    res.status.json('Require Moderator Role');
                    return;
                }
            );
        });
};

const authJwt = {
    verifyToken,
    isAdmin,
    isModerator
};

module.exports = authJwt;