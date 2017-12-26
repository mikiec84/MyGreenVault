const Product = require('../../models/Product');
const ObjectId = require('mongodb').ObjectID;

let add = exports.add = (product) => {
    const newProduct = new Product(product);

    return new Promise((resolve, reject) => {
        newProduct.save((err, results) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        });
    });
}

let removeProduct = exports.removeProduct = (product) => {
    return new Promise((resolve, reject) => {
        Product.find({
            _id: ObjectId(product._id),
            userId: product.userId
        }).remove().exec((err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
}

let getPagedProducts = exports.getPagedProducts = (userId, skip, take, query = null) => {
    return new Promise((resolve, reject) => {
        let queryObj = {
            userId: ObjectId(userId)
        }

        if (query) {
            queryObj.name = {'$regex': query, '$options' : 'i'};
        }

        Product.find(queryObj)
        .limit(take + 1)
        .skip(skip)
        .exec((err, results) => {
            if (err) {
                reject(err);
            }

            if (!!results && !!results.length) {
                const resObj = {
                    skip: skip,
                    take: take,
                    more: (results.length === take + 1),
                    data: (results.length > take) ? results.slice(0, -1) : results
                }
                resolve(resObj);
            } else {
                resolve([]);
            }
            
        });
    });
}

let updateProduct = exports.updateProduct = (updatedProduct) => {
    return new Promise((resolve, reject) => {
        Product.findOneAndUpdate({
            _id: ObjectId(updatedProduct._id),
            userId: ObjectId(updatedProduct.userId)
        }, updatedProduct).exec(err => {
            if (err) {
                reject(err);
            }
            resolve('successfully updated weed');
        })
    });
}