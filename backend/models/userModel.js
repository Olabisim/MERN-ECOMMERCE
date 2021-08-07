import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    // ceated at and updated at is created automatica
    // lly with timestamps
    timestamps: true
})


// use bcrypt to compare the enteredpassword to the database password that is hashed 
// we call the match password on that specific user

userSchema.methods.matchPassword = async function(enteredPassword){

    // a compare method that compares the passwords
    // you can use this keyword to access the properties of the current user
    // e.g. this.name, this.password
    return await bcrypt.compare(enteredPassword, this.password)

}

// before we actually save we want to bcrypt the password
userSchema.pre('save', async function (next){

    // we only want to do this if the password field is sent or modified
    // when we have the update profile functionality and we update our
    //  email or password we don't want this i.e. the salt to run
    // avoid creating a new hash so we will not be able to login because it has tampered with the old login details
    if(!this.isModified('password')) {
        next()
    }

    // if it is modified the whole this down here will run
    const salt = await bcrypt.genSalt(10);
    // the this.password text we are resetting it to be the bcrypt password
    this.password = await bcrypt.hash(this.password, salt);

})

const User = mongoose.model('User', userSchema)

export default User