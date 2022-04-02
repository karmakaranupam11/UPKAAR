const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
// this is an inbuilt node module
const crypto = require('crypto');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please enter a name"],
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: [true, "Email already exists"],
    },
    avatar: {
        public_id: String,
        url: String,
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        // minlength: [8, "Password must be at least 8 characters long"],
        // select false is done for security so that we canot acces it 
        select: false,
    },

    resetPasswordToken: String,
    resetPasswordValid: Date,

    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "posts"
        },
    ],

});

// always before saving userSchema a function will run
userSchema.pre("save", async function (next) {

    // so bcrypt has a hash function we are using it for encrypting
    // we are using this.password this refers to the current user

    // now if we update the name and email but not password in that case we 
    // dont want that the encrypted password again gets encrypted so to avoid that
    // we check is the password has been modified or not
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }

    next();
})

// defining a function fof the schema
userSchema.methods.matchPassword = async function (password) {
    // compare both the passwords 
    console.log(this.password);
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateToken = function () {
    console.log(this._id);
    return jwt.sign({ _id: this._id }, "secret");

}

userSchema.methods.getResetPasswordToken = function () {
   
   // this generates a token which we will send in email
   const resetToken = crypto.randomBytes(20).toString("hex");
    
   // we are accessing the current users resetPasswordtoken and here we are
   // using an algorithm sha256 for hashing the generated token for storing 
   this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex"); 
   this.resetPasswordValid = Date.now() + 10*60*1000;
 
   return resetToken;
}

const User = mongoose.model("User", userSchema);
module.exports = User;