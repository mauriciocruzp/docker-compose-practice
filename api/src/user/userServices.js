const UserModel = require('./userModel');
const key = 'somekey234567884456753456';
const encryptor = require('simple-encryptor')(key);

module.exports.create = (userDetails) => {
    return new Promise(function (resolve, reject) {
        let user = new UserModel()

        user.name = userDetails.name;
        user.email = userDetails.email;
        user.password = encryptor.encrypt(userDetails.password);

        user.save(function resultHandle(errorvalue, result) {
            if (errorvalue) {
                if (11000 === errorvalue.code || 11001 === errorvalue.code)
                    reject({status: false, msg: "Email con usuario existente"});
                else
                    reject({status: false, msg: errorvalue});
            } else
                resolve({status: true, msg: "Usuario creado con éxito"});
        });
    });
}

module.exports.login = (userDetails) => {
    return new Promise(function (resolve, reject) {
        UserModel.findOne({email: userDetails.email}, function getresult(errorvalue, result) {
            if (errorvalue)
                reject({status: false, msg: "Datos Invalidos"});
            else {
                if (result !== undefined) {
                    const decrypted = encryptor.decrypt(result.password);
                    if (decrypted === userDetails.password)
                        resolve({status: true, msg: "Usuario Validado"});
                    else
                        resolve({status: false, msg: "Falla en validacion de usuario"});
                } else
                    resolve({status: false, msg: "Detalles de usuario invalido"});
            }
        });
    });
}

module.exports.search = (userDetails) => {
    return new Promise(function (resolve, reject) {
        UserModel.findOne({email: userDetails.email}, function getresult(errorvalue, result) {
            if (errorvalue)
                reject({status: false, msg: errorvalue});
            else if (result === null)
                reject({status: false, msg: "Usuario no encontrado"});
            resolve({status: true, msg: result});
        });
    });
}

module.exports.getAll = () => {
    return new Promise(function (resolve, reject){
        UserModel.find(function getresult(errorvalue, result) {
            if (errorvalue)
                reject({status: false, msg: errorvalue});
            else if (result.length === 0)
                reject({status: false, msg: "No existen usuarios en la db"});
            else
                resolve({status: true, msg: result});
        });
    });
}

module.exports.update = (userDetails) => {
    return new Promise(function (resolve, reject) {
        UserModel.findOne({email: userDetails.email}, function getresult(errorvalue, result) {
            if (errorvalue)
                reject({status: false, msg: errorvalue});
            else if (result === null)
                reject({status: false, msg: "Usuario no encontrado"});
            else {
                let user = result;

                user.name = userDetails.name;
                user.password = encryptor.encrypt(userDetails.password);

                user.save(function resultHandle(error, result) {
                    if (error)
                        reject(false);
                    else
                        resolve(true);
                });
                resolve({status: true, msg: "Usuario actualizado"})
            }
        });
    });
}

module.exports.remove = (userDetails) => {
    return new Promise(function (resolve, reject) {
        UserModel.findOneAndRemove({email: userDetails.email}, function getresult(errorvalue, result) {
            if (errorvalue)
                reject({status: false, msg: errorvalue});
            else if (result === null)
                reject({status: false, msg: "Usuario no encontrado"});
            resolve({status: true, msg: "Usuario eliminado"});
        });
    });
}
