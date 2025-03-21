import mongoose from "mongoose";

const Lerner_userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,"Provide name"],
        required : true
    },
    email : {
        type : String,
        required : [true,"Provide name"],
        required : true
    },
    role : {
        type : String,
        enum : ['ADMIN',"LEARNER","EDUCATOR"],
        required : true
        // default : "USER"
    },
    country : {
        type : String,
        required : true

    },
    nativeLanguage : {
        type : String,
        required : true

    },
    topic : {
        type : String,
        required : true

    },
    expert : {
        type : String,
        enum: ['YES','NO'],
        default : 'NO',

    },
    coach : {
        type : String,
        required : true

    },
    about : {
        type : String,
        required : true

    },
    password : {
        type : String,
        required : true
    },
    otp : {
        type : Number,
    },
    suspended : {
        type : String,
        enum : ['YES' , 'NO'],
        default : 'NO'
    }

},{
    timestamps : true
})

export const LearnerUserModel = mongoose.model("User-learners",Lerner_userSchema)

const Educator_userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,"Provide name"],
        required : true
    },
    email : {
        type : String,
        required : [true,"Provide name"],
        required : true
    },
    role : {
        type : String,
        enum : ['ADMIN',"LEARNER","EDUCATOR"],
        required : true
    },
    country : {
        type : String,
        required : true

    },
    nativeLanguage : {
        type : String,
        required : true

    },
    expert_area : {
        type : Array,
        required : true
    },
    services : {
        type : String,
        required : true

    },
    payment_details : {
        type : Array,
        required : true

    },
    documents : {
        type : Array,
        required : true
    },

    password : {
        type : String,
        required : true
    },
    otp : {
        type : Number,
    },
    suspended : {
        type : String,
        enum : ['YES' , 'NO'],
        default : 'NO'
    }

},{
    timestamps : true,
})

export const EducatorUserModel = mongoose.model("User-educators", Educator_userSchema)

const Admin = new mongoose.Schema({
    name : {
        type : String,
        required : [true,"Provide name"],
        required : true
    },
    email : {
        type : String,
        required : [true,"Provide name"],
        required : true
    },
    role : {
        type : String,
        enum : ['ADMIN',"LEARNER","EDUCATOR"],
        required : true
        // default : "USER"
    },
    password : {
        type : String,
        required : true
    },
})

export const AdminModel = mongoose.model("Admins", Admin)