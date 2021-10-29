const S3 = require('aws-sdk/clients/s3');
const path = require('path');
// const uuid = require('uuid').v1;
const { nanoId } = require('nanoid');


const {
    AWS_S3_NAME,
    AWS_SE_REGION,
    AWS_S3_ACCESS_KEY,
    AWS_S3_SECRET_KEY
} = require('../configs/config');


const bucket = new S3({
    region: AWS_SE_REGION,
    accesKeyId: AWS_S3_ACCESS_KEY,
    secretAcesKey: AWS_S3_SECRET_KEY
});

module.exports = {
    uploadImage: (file = {}, itemType, itemId) => {
        console.log('_____________');
        console.log(file);
        console.log('_____________');

        const { name, data, mimetype } = file;

        const uploadPath = _fileNameBuilder(name, itemType, itemId);

        return bucket
            .upload({
                Bucket: AWS_S3_NAME,
                Body: data,
                Key: uploadPath,
                ContentType: mimetype
            })
            .promise();
    }
};

function _fileNameBuilder(filename, itemType, itemId) {
    // const fileExtension = fileName.split('.').pop(); //jpg
    const fileExtension = fileName.extname(fileName); // .jpg

    // return path.join(itemType, itemId, `${uuid()}${fileExtension}`);
    return path.join(itemType, itemId, `${nanoId()}${fileExtension}`);
}


// https://havecamerawilltravel.com/how-allow-public-access-amazon-bucket/?__cf_chl_jschl_tk__=pmd_U4B_UFB.Oza4sebJp_O3jMg.jkbyBX_K7FKEMc1hbms-1635350313-0-gqNtZGzNAjujcnBszQg9


// 1) Create new S3 bucket
// 2) Copy bucket name, bucket region into .env file
// 3) Ми рут юзер і має доступ до вього. Але юзера який буде логінитися на АВС під ключами
//    треба допускати лише до певного бакета з певними можливостями
// 4) Go to IAM menu
// 5) Create new policy
//    a) In services search S3
//    b) Access level
//       * WRITE
//          - delete
//          - put
//       * READ
//          - get object
//    c) Recourses
//       Add name of S3
//       Object name select Any
// 6) Go to Users menu
//    Create user with some name
//    ! Access Type -> Programatic access
//    // Next
//    Attacj existing policies
//    Search policy and select it
//
// 7) AWS gives access key and secret key
