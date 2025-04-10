import mongoose from "mongoose";

const Lerner_userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Provide name"],
    },
    email: {
        type: String,
        required: [true, "Provide email"],
        unique: true,
    },
    role: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    subjects: {
        type: [String],
        required: true,
    },
    needExpert: {
        type: String,
    },
    needCoach: {
        type: String,
    },
    bio: {
        type: String,
        required: true,
    },
    terms1: {
        type: Boolean,
        required: true,
    },
    terms2: {
        type: Boolean,
        required: true,
    },
    terms3: {
        type: Boolean,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    otp: {
        type: Number,
        default : 0
    },
    suspended: {
        type: String,
        enum: ['YES', 'NO'],
        default: 'NO',
    }
}, {
    timestamps: true
});

export const LearnerUserModel = mongoose.model("User-learners", Lerner_userSchema);



const Educator_userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Provide name"],
  },
  email: {
    type: String,
    required: [true, "Provide email"],
    unique: true,
  },
  role: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  subjects: {
    type: [String], // array of subjects like ['Math', 'Art']
    required: true,
  },
  serviceType: {
    type: String,
    required: true,
  },
  payoutMethod: {
    type: String,
    required: true,
  },
  upiId: {
    type: String,
    required: function () {
      return this.payoutMethod === 'upi';
    },
  },
  bankAccount: {
    type: String,
    required: function () {
      return this.payoutMethod === 'bank';
    },
  },
  ifscCode: {
    type: String,
    required: function () {
      return this.payoutMethod === 'bank';
    },
  },
  paypalEmail: {
    type: String,
    required: function () {
      return this.payoutMethod === 'paypal';
    },
  },
  documents: {
    type: [String], 
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  terms1: {
    type: Boolean,
    required: true,
  },
  terms2: {
    type: Boolean,
    required: true,
  },
  terms3: {
    type: Boolean,
    required: true,
  },
  terms4: {
    type: Boolean,
    required: true,
  },
  terms5: {
    type: Boolean,
    required: true,
  },
//   otp: {
//     type: Number,
//   },
//   suspended: {
//     type: String,
//     enum: ['YES', 'NO'],
//     default: 'NO',
//   },
}, {
  timestamps: true,
});

export const EducatorUserModel = mongoose.model("User-educators", Educator_userSchema);


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