const {Schema, model} = require('mongoose');
const userRoles = require("../configs/user-roles.enum");
const {passwordService} = require("../servise");


const userSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        select: false
    },
    role: {
        type: String,
        default: userRoles.USER,
        enum: Object.values(userRoles)
    }
}, {timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true }});

userSchema.virtual('fullname').get(function() {

    console.log('THIS!!!!!');
    return `${this.name} ${this.role} HA-HA`;
});

// userSchema.methods = { // just for single record
//     randomMethod() {
//         console.log('*************************');
//         console.log(this);
//         console.log('*************************');
//     },
//     comparePassword(password) {
//         return passwordService.compare(password, this.password);
//     }
// },

userSchema.statics = {
    testStatic(msg) {
        console.log('****************');
        console.log('TEST STATIC', msg);
        console.log('TEST STATIC', msg);
        console.log('****************');
    },
    async createUserWithHashPassword(userObject) {
        const hashedPPassword = await passwordService.hash(userObject.password);
        return this.create({...userObject, password: hashedPPassword});
    }
};

module.exports = model('user', userSchema);
